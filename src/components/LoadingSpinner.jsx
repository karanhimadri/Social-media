function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary spinner" role="status" style={{width: "4rem", height: "4rem"}}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
export default LoadingSpinner;
