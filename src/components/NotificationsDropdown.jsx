// NotificationsDropdown.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../redux/socketSlice';  
import { motion } from 'framer-motion'
import {Link} from "react-router-dom"

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.socket);

  const handleClearNotifications = () => {
    dispatch(clearNotifications());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 border border-gray-200 mt-2 w-80 bg-white shadow-lg rounded-lg py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={handleClearNotifications}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Clear All
        </button>
      </div>
      <div className="max-h-60 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No notifications available.</p>
              ) : (
                      
         notifications.map((notification, index) => (
  <div key={index} className="px-4 py-2 border-b text-center hover:bg-gray-200 transition-all border-gray-200">
    <Link to={"/orders"} className="text-gray-700 hover:text-gray-800">
    
      {notification.type === 'orderStatus' && (
        <>
          الطلب سوف يصلك اليوم  . 
        </>
      )}
      {notification.type === 'orderAccepted' && (
        <>
          تم قبول الطلب. 
          سيتم تجهيز طلبك قريباً.
        </>
      )}
      {notification.type === 'orderRejected' && (
        <>
          تم رفض الطلب
          نعتذر عن الإزعاج. الرجاء التواصل معنا للمزيد من التفاصيل.
        </>
      )}
      {notification.type === 'orderDelivered' && (
        <>
          تم تسليم الطلب: رقم الطلب . </>
      )}
    </Link>
  </div>
))

        )}
      </div>
    </motion.div>
  );
};

export default NotificationsDropdown;