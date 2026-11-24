

import "./EmptyState.css";

function EmptyState({
  title = "No Data Found",
  message = "There are no records available at the moment."
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;
