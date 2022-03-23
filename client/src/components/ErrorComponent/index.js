function ErrorComponent({ error }) {
  return <>{error && <div className="text-danger">{`${error.name}: ${error.message}`}</div>}</>;
}

export default ErrorComponent;
