// src/pages/TermsConditions.js

import  { useEffect } from "react";
import BackBtn from '../components/common/BackBtn'

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 relative animate-fade-left" style={{ direction: "rtl" }}>
       <BackBtn/>
      <h1 className="text-3xl font-bold mb-4">الشروط والأحكام</h1>
      <p className="mb-4">
        مرحباً بك في <strong className="text-accent">EVO-Store</strong>، الموقع
        المتخصص في بيع الهواتف والإلكترونيات. باستخدامك لموقعنا، فإنك توافق على
        الشروط والأحكام التالية. يرجى قراءة هذه الشروط بعناية قبل استخدام
        الموقع.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. قبول الشروط</h2>
      <p className="mb-4">
        من خلال الوصول إلى واستخدام موقعنا، فإنك توافق على الالتزام بهذه الشروط
        والأحكام. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام
        الموقع.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. التعديلات على الشروط
      </h2>
      <p className="mb-4">
        نحتفظ بالحق في تعديل أو تحديث هذه الشروط والأحكام في أي وقت. ستصبح
        التعديلات سارية المفعول فور نشرها على الموقع. يجب عليك مراجعة الشروط
        بانتظام للتأكد من أنك على علم بأي تغييرات.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. استخدام الموقع</h2>
      <p className="mb-4">
        يجب عليك استخدام الموقع فقط للأغراض القانونية والامتثال لجميع القوانين
        والتشريعات المعمول بها. يُحظر استخدام الموقع بأي شكل من الأشكال التي قد
        تكون ضارة أو غير قانونية أو تتسبب في إلحاق الضرر بالآخرين.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. حسابات المستخدمين</h2>
      <p className="mb-4">
        يجب على المستخدمين تقديم معلومات دقيقة وصحيحة عند التسجيل وإنشاء حساب.
        أنت مسؤول عن الحفاظ على سرية معلومات حسابك والتزامك بكافة الأنشطة التي
        تحدث تحت حسابك.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. المنتجات والخدمات</h2>
      <p className="mb-4">
        نقدم معلومات دقيقة قدر الإمكان حول المنتجات والخدمات المعروضة على
        الموقع. ومع ذلك، فإننا لا نضمن خلو المعلومات من الأخطاء أو أن المنتجات
        متاحة دائمًا.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. الدفع والشراء</h2>
      <p className="mb-4">
        يجب على المستخدمين الالتزام بعمليات الدفع الآمنة والمعتمدة المتاحة على
        الموقع. نحن غير مسؤولين عن أي مشاكل تتعلق بالمدفوعات التي تحدث خارج نطاق
        الموقع.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. حقوق الملكية الفكرية
      </h2>
      <p className="mb-4">
        جميع حقوق الملكية الفكرية المتعلقة بالموقع، بما في ذلك النصوص والصور
        والشعارات، هي ملك لـ <strong className="text-accent">EVO-Store</strong> أو الجهات المرخصة لنا.
        لا يجوز لك استخدام أي من هذه الحقوق بدون إذن مسبق.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. الإنهاء</h2>
      <p className="mb-4">
        نحتفظ بالحق في إنهاء أو تعليق وصولك إلى الموقع في أي وقت ودون إشعار مسبق
        إذا ارتكبت انتهاكًا لهذه الشروط أو لأي سبب آخر.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. تحديد المسؤولية</h2>
      <p className="mb-4">
        نحن غير مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية قد
        تنشأ عن استخدام الموقع أو عدم القدرة على استخدامه.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        10. القوانين المعمول بها
      </h2>
      <p className="mb-4">
        تخضع هذه الشروط والأحكام للقوانين المحلية في [بلدك]. أي نزاع ينشأ عن أو
        يتعلق باستخدام الموقع سيتم حله أمام المحاكم المحلية.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">11. الاتصال بنا</h2>
      <p className="mb-4">
        إذا كان لديك أي أسئلة أو استفسارات بشأن الشروط والأحكام، يرجى الاتصال
        بنا عبر [البريد الإلكتروني أو تفاصيل الاتصال الأخرى].
      </p>
    </div>
  );
};

export default TermsConditions;