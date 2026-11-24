

import "./StatCard.css";

function StatCard({ title, value, icon, description }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3>{title}</h3>
        {icon && <span>{icon}</span>}
      </div>

      <h2>{value ?? 0}</h2>

      {description && <p>{description}</p>}
    </div>
  );
}

export default StatCard;
