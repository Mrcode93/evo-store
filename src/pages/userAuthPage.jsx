import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/userAuthSlice';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import Logo from '../assets/images/mylogo.png'

const ApiUrl = import.meta.env.VITE_API_URL;

const UserAuthPage = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await dispatch(loginUser(formData)).unwrap();
        toast.success('Logged in successfully');
      } catch (error) {
        toast.error(error.message || 'Login failed');
      }
    } else {
      try {
        await dispatch(registerUser(formData)).unwrap().then(() => {
          window.location.href = '/';
        });
      } catch (error) {
        toast.error(error.message || 'Registration failed');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
        window.location.href = `${ApiUrl}/auth/google`;
        const res = await fetch(`${ApiUrl}/auth/google`);
        const data = await res.json();
        localStorage.setItem('user-auth-token', data.token);
        // Continue handling the user state and redirect after successful login
    } catch (error) {
        toast.error("Failed to authenticate with Google");
    }
};

  return (
    <div className="flex items-center px-4 justify-center min-h-screen bg-gray-100" dir='rtl'>
      <div className="w-full max-w-md h-fit bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="w-fit h-12 px-2 mx-auto mb-4 rounded-md flex items-center justify-center">
           <img src={Logo}  className='w-20 h-20' alt="" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {isLogin ? 'تسجيل الدخول' : 'انشاء حساب جديد'}
          </h1>
        </div>
        <div className="flex justify-center gap-4 mt-2 mb-2">
          <button
            className="flex items-center justify-center w-full h-8 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={handleGoogleLogin}
          >
            <FcGoogle size={30} />
          </button>
        </div>
        <div className="text-center text-gray-500 ">او</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">الاسم</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block bg-gray-100  w-full border border-gray-300 rounded-md shadow-sm p-2"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">الهاتف</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block  bg-gray-100  w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block bg-gray-100  w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full mt-4 bg-accent text-white py-2 rounded-md hover:bg-dark-primary transition-colors duration-200"
            >
              {isLogin ? 'تسجيل الدخول' : 'انشاء حساب جديد'}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-accent text-[14px] hover:underline"
          >
            {isLogin ? 'لا تمتلك حساب من قبل ؟ تسجيل' : 'هل تمتلك حساب بالفعل ؟ تسجيل الدخول'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthPage;