
function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="error-message" role="alert">
      {message}
    </div>
  );
}

export default ErrorMessage;
