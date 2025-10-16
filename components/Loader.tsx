interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  return (
    <div className={`loader ${loading ? '' : 'hidden'}`} id="loader">
      <div className="loader-text">LOADING</div>
    </div>
  );
}
