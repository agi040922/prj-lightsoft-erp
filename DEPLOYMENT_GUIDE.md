# Typographic Studio - Cloud Run 배포 가이드

## 프로젝트 소개

이 프로젝트는 Next.js 기반의 타이포그래피 중심 포트폴리오 웹사이트입니다. Google Cloud Run을 통해 서버리스로 배포할 수 있습니다.

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: CSS (Custom CSS with CSS Variables)
- **Deployment**: Google Cloud Run
- **Container**: Docker

---

## 목차

1. [로컬 개발 환경 설정](#로컬-개발-환경-설정)
2. [Cloud Run 배포 (수동)](#cloud-run-배포-수동)
3. [GitHub Actions를 통한 자동 배포](#github-actions를-통한-자동-배포)
4. [환경 변수 설정](#환경-변수-설정)
5. [트러블슈팅](#트러블슈팅)

---

## 로컬 개발 환경 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인할 수 있습니다.

### 3. 프로덕션 빌드 테스트

```bash
npm run build
npm start
```

### 4. Docker 로컬 테스트

```bash
# Docker 이미지 빌드
docker build -t typographic-studio .

# 컨테이너 실행
docker run -p 3000:3000 typographic-studio
```

---

## Cloud Run 배포 (수동)

### 사전 요구사항

1. **Google Cloud Platform 계정**
2. **Google Cloud SDK (gcloud) 설치**
   - [설치 가이드](https://cloud.google.com/sdk/docs/install)
3. **Docker 설치**
4. **프로젝트 준비**
   - Google Cloud 프로젝트 생성
   - 결제 계정 연결
   - Cloud Run API 활성화
   - Artifact Registry API 활성화

### 1. Google Cloud SDK 초기화

```bash
# gcloud 로그인
gcloud auth login

# 프로젝트 설정 (your-project-id를 실제 프로젝트 ID로 변경)
gcloud config set project your-project-id

# 리전 설정 (예: asia-northeast3 = 서울)
gcloud config set run/region asia-northeast3
```

### 2. Artifact Registry 설정

```bash
# Artifact Registry 저장소 생성
gcloud artifacts repositories create typographic-studio \
  --repository-format=docker \
  --location=asia-northeast3 \
  --description="Typographic Studio Docker images"

# Docker 인증 설정
gcloud auth configure-docker asia-northeast3-docker.pkg.dev
```

### 3. Docker 이미지 빌드 및 푸시

```bash
# 프로젝트 ID 변수 설정
export PROJECT_ID=$(gcloud config get-value project)
export REGION=asia-northeast3
export IMAGE_NAME=typographic-studio

# Docker 이미지 빌드
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio/${IMAGE_NAME}:latest .

# Docker 이미지 푸시
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio/${IMAGE_NAME}:latest
```

### 4. Cloud Run 배포

```bash
gcloud run deploy typographic-studio \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio/${IMAGE_NAME}:latest \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --port=3000 \
  --memory=512Mi \
  --cpu=1 \
  --min-instances=0 \
  --max-instances=10
```

배포가 완료되면 서비스 URL이 표시됩니다 (예: `https://typographic-studio-xxx-an.a.run.app`).

### 5. 배포 확인

```bash
# 서비스 상태 확인
gcloud run services describe typographic-studio --region=${REGION}

# 서비스 URL 확인
gcloud run services describe typographic-studio --region=${REGION} --format='value(status.url)'
```

---

## GitHub Actions를 통한 자동 배포

GitHub에 코드를 푸시할 때마다 자동으로 Cloud Run에 배포되도록 설정할 수 있습니다.

### 1. Google Cloud 서비스 계정 생성

```bash
# 서비스 계정 생성
gcloud iam service-accounts create github-actions \
  --display-name="GitHub Actions Deployment"

# 필요한 권한 부여
gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.writer"

gcloud projects add-iam-policy-binding ${PROJECT_ID} \
  --member="serviceAccount:github-actions@${PROJECT_ID}.iam.gserviceaccount.com" \
  --role="roles/iam.serviceAccountUser"

# 서비스 계정 키 생성 (JSON 파일 다운로드)
gcloud iam service-accounts keys create key.json \
  --iam-account=github-actions@${PROJECT_ID}.iam.gserviceaccount.com
```

### 2. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 secrets를 추가:

- `GCP_PROJECT_ID`: Google Cloud 프로젝트 ID
- `GCP_SA_KEY`: 위에서 생성한 `key.json` 파일의 내용 전체를 복사하여 붙여넣기
- `GCP_REGION`: 배포 리전 (예: `asia-northeast3`)

### 3. GitHub Actions 워크플로우 파일 생성

프로젝트 루트에 `.github/workflows/deploy.yml` 파일을 생성:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: ${{ secrets.GCP_REGION }}
  SERVICE_NAME: typographic-studio
  REPOSITORY: typographic-studio

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
          export_default_credentials: true

      - name: Configure Docker for Artifact Registry
        run: |
          gcloud auth configure-docker ${{ env.REGION }}-docker.pkg.dev

      - name: Build Docker image
        run: |
          docker build -t ${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPOSITORY }}/${{ env.SERVICE_NAME }}:${{ github.sha }} .
          docker tag ${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPOSITORY }}/${{ env.SERVICE_NAME }}:${{ github.sha }} \
                     ${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPOSITORY }}/${{ env.SERVICE_NAME }}:latest

      - name: Push Docker image
        run: |
          docker push ${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPOSITORY }}/${{ env.SERVICE_NAME }}:${{ github.sha }}
          docker push ${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPOSITORY }}/${{ env.SERVICE_NAME }}:latest

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${{ env.SERVICE_NAME }} \
            --image=${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPOSITORY }}/${{ env.SERVICE_NAME }}:${{ github.sha }} \
            --platform=managed \
            --region=${{ env.REGION }} \
            --allow-unauthenticated \
            --port=3000 \
            --memory=512Mi \
            --cpu=1 \
            --min-instances=0 \
            --max-instances=10

      - name: Get Service URL
        run: |
          SERVICE_URL=$(gcloud run services describe ${{ env.SERVICE_NAME }} \
            --region=${{ env.REGION }} \
            --format='value(status.url)')
          echo "Service deployed to: $SERVICE_URL"
```

### 4. 배포 테스트

```bash
# GitHub에 코드 푸시
git add .
git commit -m "Initial deployment setup"
git push origin main
```

GitHub Actions 탭에서 배포 진행 상황을 확인할 수 있습니다.

---

## 환경 변수 설정

환경 변수가 필요한 경우 다음과 같이 설정할 수 있습니다.

### Cloud Run에서 환경 변수 설정

```bash
gcloud run services update typographic-studio \
  --region=${REGION} \
  --set-env-vars="NODE_ENV=production,API_KEY=your-api-key"
```

### .env 파일 (로컬 개발용)

프로젝트 루트에 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**주의**: `.env.local` 파일은 절대 Git에 커밋하지 마세요!

---

## 커스텀 도메인 연결

### 1. Cloud Run에서 도메인 매핑

```bash
# 도메인 매핑 생성
gcloud run domain-mappings create \
  --service=typographic-studio \
  --domain=www.yourdomain.com \
  --region=${REGION}
```

### 2. DNS 설정

Cloud Run에서 제공하는 DNS 레코드를 도메인 제공업체의 DNS 설정에 추가하세요.

---

## 비용 최적화

### 1. 최소 인스턴스 0으로 설정

요청이 없을 때 완전히 스케일 다운되도록 설정:

```bash
--min-instances=0
```

### 2. 메모리 및 CPU 최적화

애플리케이션에 필요한 최소한의 리소스만 할당:

```bash
--memory=512Mi
--cpu=1
```

### 3. 요청 제한 시간 설정

```bash
--timeout=300
```

---

## 트러블슈팅

### 1. Docker 빌드 실패

**문제**: Docker 이미지 빌드 중 오류 발생

**해결**:
```bash
# Docker 캐시 삭제 후 재빌드
docker system prune -a
docker build --no-cache -t typographic-studio .
```

### 2. Cloud Run 배포 실패

**문제**: 이미지를 찾을 수 없음

**해결**:
```bash
# 이미지가 올바르게 푸시되었는지 확인
gcloud artifacts docker images list \
  ${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio
```

### 3. 503 Service Unavailable

**문제**: 배포 후 503 오류 발생

**해결**:
- 애플리케이션이 포트 3000에서 리스닝하는지 확인
- 로그 확인: `gcloud run services logs read typographic-studio --region=${REGION}`

### 4. 이미지 로딩 실패

**문제**: 외부 이미지 (Midjourney CDN)가 로드되지 않음

**해결**:
- `next.config.ts`의 `remotePatterns` 설정 확인
- 브라우저 콘솔에서 CORS 오류 확인

---

## 모니터링 및 로그

### 로그 확인

```bash
# 실시간 로그 확인
gcloud run services logs tail typographic-studio --region=${REGION}

# 최근 로그 확인
gcloud run services logs read typographic-studio --region=${REGION} --limit=50
```

### Cloud Console에서 모니터링

1. [Cloud Run Console](https://console.cloud.google.com/run) 접속
2. 서비스 선택
3. "METRICS" 탭에서 트래픽, 응답 시간, 오류율 등 확인

---

## 추가 리소스

- [Cloud Run 공식 문서](https://cloud.google.com/run/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Docker 공식 문서](https://docs.docker.com/)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

---

## 지원

문제가 발생하거나 질문이 있으시면 GitHub Issues에 등록해주세요.

---

**Last Updated**: 2025-01-16
