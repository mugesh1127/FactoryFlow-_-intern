
import "./StatusBadge.css";

function StatusBadge({ status }) {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "status-completed";
      case "in progress":
        return "status-progress";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status || "Unknown"}
    </span>
  );
}

export default StatusBadge;
