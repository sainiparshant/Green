import { useState } from "react";
import { User, Lock, Bell, Save } from "lucide-react";

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "9876543210",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: "light",
  });

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Settings updated");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

       
        <Card title="Profile" icon={<User size={18} />}>
          <Input
            label="Name"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
          />
          <Input
            label="Email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
          <Input
            label="Phone"
            value={profile.phone}
            onChange={(e) =>
              setProfile({ ...profile, phone: e.target.value })
            }
          />
        </Card>

        
        <Card title="Change Password" icon={<Lock size={18} />}>
          <Input
            type="password"
            label="Current Password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
          />
          <Input
            type="password"
            label="New Password"
            value={password.new}
            onChange={(e) =>
              setPassword({ ...password, new: e.target.value })
            }
          />
          <Input
            type="password"
            label="Confirm Password"
            value={password.confirm}
            onChange={(e) =>
              setPassword({ ...password, confirm: e.target.value })
            }
          />
        </Card>

        
        <Card title="Preferences" icon={<Bell size={18} />}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notifications</p>
              <p className="text-sm text-gray-500">
                Receive system notifications
              </p>
            </div>
            <Toggle
              checked={preferences.notifications}
              onChange={() =>
                setPreferences({
                  ...preferences,
                  notifications: !preferences.notifications,
                })
              }
            />
          </div>
        </Card>

        {/* Save */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition
              ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, children }) => (
  <div className="bg-white border rounded-xl p-6 space-y-4">
    <div className="flex items-center gap-2 text-gray-900 font-semibold">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const Input = ({ label, type = "text", value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);

const Toggle = ({ checked, onChange }) => (
  <button
    onClick={onChange}
    className={`w-10 h-5 flex items-center rounded-full p-1 transition
      ${checked ? "bg-emerald-600" : "bg-gray-300"}`}
  >
    <span
      className={`bg-white w-4 h-4 rounded-full transform transition
        ${checked ? "translate-x-5" : "translate-x-0"}`}
    />
  </button>
);

export default AdminSettings;
