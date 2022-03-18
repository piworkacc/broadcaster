function ErrorComponent({ message }) {
  return <>{message && <div className="text-danger position-fixed">{message}</div>}</>;
}

export default ErrorComponent;
