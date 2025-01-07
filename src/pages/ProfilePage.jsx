import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, updateUserPassword, fetchUserInfo,logoutUser } from "../redux/userAuthSlice";
import Modal from "../components/common/Modal";
import UpdateProfileForm from "../components/common/UpdateProfileForm";
import ChangePasswordForm from "../components/common/ChangePasswordForm";
import NotificationSettingsForm from "../components/common/NotificationSettingsForm";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { Settings } from "lucide-react";  // Importing settings icon from lucide-react
import { motion } from 'framer-motion';
import AvatarImage from '../assets/images/avatar.png'
import BackBtn from '../components/common/BackBtn';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isNotificationSettingsModalOpen, setIsNotificationSettingsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility

  const { user  } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
 
  };

  const closeModal = () => {
    setIsUpdateProfileModalOpen(false);
    setIsChangePasswordModalOpen(false);
    setIsNotificationSettingsModalOpen(false);
  };

  const handleUpdateProfile = async (updatedUser) => {
    try {
      setIsLoading(true);
      await dispatch(updateUserInfo(updatedUser)).unwrap();
      setIsUpdateProfileModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (passwordData) => {
    try {
      setIsLoading(true);
      await dispatch(updateUserPassword(passwordData)).unwrap();
      setIsChangePasswordModalOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-200 w-full  relative  min-h-screen mx-auto  p-8  " style={{ direction: "rtl" }}>
      {/* Profile Settings Icon */}
      <BackBtn />
      <div className="flex justify-between relative items-center   mt-6">
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">الملف الشخصي</h1>
        <div className="">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-xl text-gray-800 hover:text-gray-600"
          >
            <Settings />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            
              className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
            >
              <button
                onClick={() => setIsUpdateProfileModalOpen(true)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                تحديث معلومات الحساب
              </button>
              <button
                onClick={() => setIsChangePasswordModalOpen(true)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                تغيير كلمة المرور
              </button>
              <button
                onClick={() => setIsNotificationSettingsModalOpen(true)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                إعدادات الإشعارات
              </button>
               {/* logout  btn*/}
      <button
        onClick={handleLogout}
        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
        تسجيل الخروج
      </button>
            </motion.div>
          )}
        </div>
      </div>


      {user ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8">
          <div className="flex justify-center items-center">
            {user?.image ? (
              <img
                src={AvatarImage}
                alt="Profile"
                className="w-40 h-40 rounded-full object-contain shadow-md"
              />
            ) : (
              <img
                src={AvatarImage}
                alt="Profile"
                className="w-40 h-40 rounded-full object-contain shadow-md"
              />
            )}
          </div>

          <div className="col-span-1 sm:col-span-2">
            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-600">اسم المستخدم</dt>
                <dd className="text-lg font-semibold text-gray-800">{user.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">رقم الهاتف او البريد الالكتروني</dt>
                <dd className="text-lg font-semibold text-gray-800">{user.mobile || user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">العنوان</dt>
                <dd className="text-lg font-semibold text-gray-800">{user.address || "غير محدد"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">المدينة</dt>
                <dd className="text-lg font-semibold text-gray-800">{user.city || "غير محدد"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">المحافظة</dt>
                <dd className="text-lg font-semibold text-gray-800">{user.state || "غير محدد"}</dd>
              </div>
            </div>
          </div>
          {/* orders btn */}
          <Link
            to="/orders"
            className="w-full text-center  bg-accent  text-white py-2 rounded-md hover:bg-dark-primary hover:text-white transition-colors duration-200"
          >
            عرض الطلبات
          </Link>
        </div>
      ) : (
        <p className="text-sm text-gray-500">لا توجد معلومات مستخدم متاحة.</p>
      )}

      <Modal isOpen={isUpdateProfileModalOpen} onClose={() => setIsUpdateProfileModalOpen(false)}>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">تحديث معلومات الحساب</h2>
        <UpdateProfileForm
          user={user}
          onClose={closeModal}
          onUpdate={(updatedData) => handleUpdateProfile({ ...user, ...updatedData })}
        />
        {isLoading && <Loader />}
      </Modal>

      <Modal
       isOpen={isChangePasswordModalOpen} onClose={() => setIsChangePasswordModalOpen(false)}>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">تغيير كلمة المرور</h2>
        <ChangePasswordForm onClose={closeModal} onChangePassword={handleChangePassword} />
        {isLoading && <Loader />}
      </Modal>

      <Modal isOpen={isNotificationSettingsModalOpen} onClose={() => setIsNotificationSettingsModalOpen(false)}>
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">إعدادات الإشعارات</h2>
        <NotificationSettingsForm onClose={closeModal} />
        {isLoading && <Loader />}
      </Modal>
     
    </div>
  );
};

export default ProfilePage;
