import { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
const NotificationSettingsForm = ({onClose}) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement notification settings update logic here
    alert('Notification settings updated');
  };

  return (
      <form  onSubmit={handleSubmit} className="space-y-4" dir='rtl'>
             
          <div className="flex justify-end">
                <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                >
                <X size={24} />
                  </button>
          </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">اشعارات البريد الالكتروني</label>
        <input
          type="checkbox"
          name="emailNotifications"
          checked={settings.emailNotifications}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">اشعارات الرسائل النصية</label>
        <input
          type="checkbox"
          name="smsNotifications"
          checked={settings.smsNotifications}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded-md hover:bg-dark-primary transition-colors duration-200"
        >
          حفظ
        </button>
      </div>
    </form>
  );
};
NotificationSettingsForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationSettingsForm;