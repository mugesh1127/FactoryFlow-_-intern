
import { useState } from "react";
import { Save, Factory, Bell, Shield, User } from "lucide-react";

function Settings() {
  const [settings, setSettings] = useState({
    factoryName: "FactoryFlow Manufacturing",
    email: "admin@factoryflow.com",
    notifications: true,
    lowStockAlert: true
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("factoryflow-settings", JSON.stringify(settings));
    setMessage("Settings saved successfully!");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your factory system preferences.</p>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSave}>
        <div className="settings-section">
          <h2><Factory size={20} /> Factory Information</h2>

          <label>Factory Name</label>
          <input
            type="text"
            name="factoryName"
            value={settings.factoryName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="settings-section">
          <h2><User size={20} /> Administrator</h2>

          <label>Administrator Email</label>
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="settings-section">
          <h2><Bell size={20} /> Notifications</h2>

          <label className="setting-toggle">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable system notifications
          </label>

          <label className="setting-toggle">
            <input
              type="checkbox"
              name="lowStockAlert"
              checked={settings.lowStockAlert}
              onChange={handleChange}
            />
            Enable low-stock alerts
          </label>
        </div>

        <div className="settings-section">
          <h2><Shield size={20} /> Security</h2>
          <p>Administrator access is currently enabled.</p>
        </div>

        <button type="submit" className="primary-button">
          <Save size={17} />
          Save Settings
        </button>

        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}

export default Settings;
