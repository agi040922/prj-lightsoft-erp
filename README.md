# Typographic Studio

A modern, typography-focused portfolio website built with Next.js and designed to showcase creative design work.

![Typographic Studio](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Cloud Run](https://img.shields.io/badge/Cloud%20Run-Deployed-4285F4?style=flat-square&logo=google-cloud)

## Features

- Modern, responsive design with emphasis on typography
- Smooth animations and transitions
- Custom cursor effects
- Interactive portfolio gallery
- Contact form
- Mobile-friendly navigation
- Server-side rendering with Next.js
- Optimized for production deployment on Cloud Run

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Custom CSS with CSS Variables
- **Deployment**: Google Cloud Run
- **Container**: Docker
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/typographic-studio.git
cd typographic-studio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
typographic-studio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Portfolio.tsx
│   ├── Services.tsx
│   ├── Gallery.tsx
│   ├── Team.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── public/                # Static assets
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── Dockerfile             # Docker configuration
├── .dockerignore          # Docker ignore file
├── next.config.ts         # Next.js configuration
└── DEPLOYMENT_GUIDE.md    # Deployment documentation
```

## Deployment

This project is configured for deployment on Google Cloud Run. See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions on:

- Local development and testing
- Manual deployment to Cloud Run
- Automated deployment with GitHub Actions
- Environment variables configuration
- Custom domain setup
- Troubleshooting

### Quick Deploy

1. Set up Google Cloud project and authenticate
2. Run the deployment script:

```bash
# Set your project ID
export PROJECT_ID=your-project-id
export REGION=asia-northeast3

# Build and push Docker image
docker build -t ${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio/typographic-studio:latest .
docker push ${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio/typographic-studio:latest

# Deploy to Cloud Run
gcloud run deploy typographic-studio \
  --image=${REGION}-docker.pkg.dev/${PROJECT_ID}/typographic-studio/typographic-studio:latest \
  --platform=managed \
  --region=${REGION} \
  --allow-unauthenticated \
  --port=3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Overview

### Sections

1. **Hero** - Eye-catching typography-focused landing section
2. **About** - Information about the studio and approach
3. **Portfolio** - Showcase of creative works
4. **Services** - List of offered services
5. **Gallery** - Visual portfolio gallery
6. **Team** - Team members showcase
7. **Contact** - Contact form and information
8. **Footer** - Social links and copyright

### Animations

- Title reveal animations
- Glitch text effects
- Scroll-triggered animations
- Custom cursor effects
- Smooth page transitions
- Hover interactions

## Customization

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
    --primary-color: #FF6B6B;
    --secondary-color: #4ECDC4;
    --accent-color: #1A1A2E;
    --text-light: #FFFFFF;
    --text-dark: #1A1A2E;
}
```

### Content

Edit components in the `components/` directory to update text, images, and structure.

### Fonts

Fonts are loaded from Google Fonts in `app/globals.css`:
- Bebas Neue
- Montserrat
- Playfair Display
- Space Grotesk

## Performance

- Optimized Docker image with multi-stage builds
- Next.js standalone output for minimal image size
- Lazy loading of images
- CSS optimization
- Server-side rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using Next.js and deployed on Google Cloud Run
