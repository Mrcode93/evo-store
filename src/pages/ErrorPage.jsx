import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-l from-[#11151c] to-[#212d40]">
      <div className="text-center p-8 transform transition duration-300" dir="rtl">
        <div className="flex justify-center items-center mb-6">
          <AlertTriangle className="text-red-600 w-40 h-40 animate-pulse" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-100 mb-4">
          عذرًا! حدث خطأ ما
        </h1>
        <p className="text-gray-200 mb-6 leading-relaxed">
          واجهنا خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بالدعم إذا استمرت المشكلة.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
        >
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
