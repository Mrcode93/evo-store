import  { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
const UpdateProfileForm = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onUpdate(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit} className="space-y-4" dir='rtl'>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">الاسم</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md shadow-sm p-2"
          required
        />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">البريد الالكتروني</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md shadow-sm p-2"
                required
                />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md shadow-sm p-2"
                required
                />
              {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
          </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">العنوان</label>
                <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md shadow-sm p-2"
                required
              />
          </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">المدينة</label>
                <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md shadow-sm p-2"
                required
              />
          </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">المحافظة</label>
                <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full border bg-gray-200 border-gray-300 rounded-md shadow-sm p-2"
                required
              />
          </div>
                
      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-accent text-white py-2 rounded-md hover:bg-dark-primary transition-colors duration-200"
        >
          تحديث الملف الشخصي
        </button>
      </div>
    </form>
  );
};

UpdateProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateProfileForm;