
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <div className="empty-state">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>

        <Link to="/" className="btn-primary">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
