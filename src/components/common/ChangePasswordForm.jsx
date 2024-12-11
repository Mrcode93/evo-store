import React, { useState } from 'react';
import { X } from 'lucide-react';
const ChangePasswordForm = ({ onChangePassword,onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    onChangePassword(formData);
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-4" dir='rtl'>
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
        <label className="block text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور الجديدة</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full bg-gray-200 border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded-md hover:bg-dark-primary transition-colors duration-200"
        >
          تغيير كلمة المرور
        </button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;