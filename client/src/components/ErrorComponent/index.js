function ErrorComponent({ error }) {
  return <>{error && <div className="text-danger position-fixed">{`${error.name}: ${error.message}`}</div>}</>;
}

export default ErrorComponent;
