import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import axios from 'axios';
import { showToast } from '../../utils/Toast';

const NotificationSettingsForm = ({ onClose }) => {
  const [settings, setSettings] = useState({
    emailNotifications: false,
    smsNotifications: false,
  });
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith('user-auth-token='))
      ?.split('=')[1];
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = getToken();
        if (!token) throw new Error('No token found');

        const response = await axios.get('http://localhost:8090/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSettings({
          emailNotifications: response.data.emailNotifications,
          smsNotifications: response.data.textMessageNotifications,
        });
        setLoading(false);
      } catch (error) {
        showToast(error.response?.data || 'حدث خطأ ما', 'error');
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      await axios.put(
        'http://localhost:8090/notifications',
        {
          emailNotifications: settings.emailNotifications,
          textMessageNotifications: settings.smsNotifications,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast('تم حفظ الإعدادات', 'success');
      onClose();
    } catch (error) {
      showToast(error.response?.data || 'حدث خطأ ما', 'error');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
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
        <label className="block text-sm font-medium text-gray-700">
          اشعارات البريد الالكتروني
        </label>
        <input
          type="checkbox"
          name="emailNotifications"
          checked={settings.emailNotifications}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          اشعارات الرسائل النصية
        </label>
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