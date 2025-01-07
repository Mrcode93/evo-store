import { useEffect, useState } from "react";
import { CheckCircle, MinusCircle, CircleOff } from "lucide-react";
import { fetchUserOrders, rejectOrder } from "../redux/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";
import BackBtn from "../components/common/BackBtn";
import { fetchUserInfo } from "../redux/userAuthSlice";
const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.userAuth);
  const [showForm, setShowForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {

    dispatch(fetchUserInfo())
    dispatch(fetchUserOrders(user?._id));
   
   
  }, [dispatch]);


  const getTotalPrice = (orderItems) => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRejectClick = (order) => {
    setCurrentOrder(order);
    setShowForm(true);
  };

  const handleRejectOrder = () => {
    if (currentOrder) {
      if (rejectReason.trim().length === 0) {
        toast.error("يرجى تقديم سبب للرفض.");
        return;
      }

      const sanitizedReason = DOMPurify.sanitize(rejectReason);

      dispatch(
        rejectOrder({
          orderId: currentOrder._id,
          reject_reason: sanitizedReason,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchUserOrders());
          setShowForm(false);
          setRejectReason("");
          setCurrentOrder(null);
        })
        .catch((error) => {
          console.error("خطأ في رفض الأمر:", error);
          setShowForm(false);
        });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen p-6 animate-fade-left">
        <div className="text-2xl font-bold text-white sm:text-3xl mt-4 bg-blue-500 p-2 rounded-lg">
          جاري تحميل الطلبات
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center w-full bg-gray-50 min-h-screen p-6 animate-fade-left">
        <div className="text-2xl font-bold text-white sm:text-3xl mt-4 bg-red-500 p-2 rounded-lg">
          لا توجد طلبات
        </div>
      </div>
    );
  }

  const ordersArray = Array.isArray(orders) ? orders : [orders];
  
  // Separate orders into in-progress and delivered
  const inProgressOrders = ordersArray.filter(order => !order.is_delevered);
  const deliveredOrders = ordersArray.filter(order => order.is_delevered);

  return (
    <div
      className="flex flex-col relative items-center min-w-full bg-gray-50 min-h-screen p-6 animate-fade-left"
      dir="rtl"
    >
      <BackBtn />
      
      {/* In Progress Orders Section */}
      {
        inProgressOrders.length > 0 ? (
          <h2 className="text-xl font-bold mb-4 mt-6 w-full max-w-3xl">الطلبات قيد التنفيذ</h2>
        ) : (
            null
          )
     }
      {inProgressOrders.length > 0 ? (
        
       
        inProgressOrders.map((order) => (
          <>
           
          <div
            key={order._id}
            className="relative w-full max-w-3xl text-right bg-white p-4 mb-2 rounded-lg shadow-md"
          >
            {/* ...existing order rendering for non-delivered orders... */}
            {order.is_rejected && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg z-10">
                <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg flex flex-col items-center space-y-2 max-w-sm mx-auto">
                  <CircleOff className="h-8 w-8" />
                  <p className="text-lg font-semibold">
                    لقد قمت بالغاء الطلب مسبقا
                  </p>
                  <p className="text-sm">السبب: {order.reject_reason}</p>
                </div>
              </div>
            )}
            <div className="text-right space-y-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center ">
                  {order.accepted ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <MinusCircle className="h-6 w-6 text-gray-500" />
                  )}
                  <span
                    className={`${order.accepted ? "text-green-500" : ""}`}
                  >
                    مقبول
                  </span>
                </div>

                <div className="flex items-center mx-2">
                  {order.on_day_delivery ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <MinusCircle className="h-6 w-6 text-gray-500" />
                  )}
                  <span
                    className={`${
                      order.on_day_delivery ? "text-green-500" : ""
                    }`}
                  >
                    تم الشحن
                  </span>
                </div>

                <div className="flex items-center">
                  {order.is_delevered ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : (
                    <MinusCircle className="h-6 w-6 text-gray-500" />
                  )}
                  <span
                    className={`${
                      order.is_delevered ? "text-green-500" : ""
                    }`}
                  >
                    تم التسليم
                  </span>
                </div>
              </div>

              <p className="text-gray-700">
                <strong>رقم الطلب:</strong> {order.order_number}
              </p>
              <p className="text-gray-700">
                <strong>الاسم:</strong> {order.name}
              </p>
              <p className="text-gray-700">
                <strong>رقم الهاتف:</strong> {order.phone}
              </p>
              <p className="text-gray-700">
                <strong>العنوان:</strong> {order.address}
              </p>
              <p className="text-gray-700">
                <strong>تاريخ الطلب:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

              <h3 className="text-lg font-semibold">العناصر:</h3>
              <ul className="space-y-1">
                {order.order_items.map((item, index) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-2 rounded-md shadow-sm border border-gray-200"
                  >
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">الكمية: {item.quantity}</p>
                    <p className="text-gray-600">
                      السعر: {item.price} دينار
                    </p>
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mt-2 py-2 border-t border-gray-500">
                المجموع الكلي: {getTotalPrice(order.order_items)} دينار
              </h3>

              {!order.on_day_delivery && (
                <div className="mt-2">
                  <p className="text-gray-700">
                    يمكنك الغاء الطلب قبل الشحن
                  </p>
                  <button
                    onClick={() => handleRejectClick(order)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                  >
                    إلغاء الطلب
                  </button>
                  {showForm &&
                    currentOrder &&
                    currentOrder._id === order._id && (
                      <div className="mt-2">
                        <p>هل تريد إلغاء هذا الطلب؟</p>
                        <input
                          type="text"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                          placeholder="سبب الإلغاء"
                          className="w-full border border-gray-300 p-2 mt-2 rounded bg-white"
                        />
                        <button
                          onClick={handleRejectOrder}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-2 transition-colors duration-200"
                        >
                          تأكيد الإلغاء
                        </button>
                      </div>
                    )}
                </div>
              )}
            </div>
            </div>
            </>
          ))
        
      ) : (
       null
      )}

      {/* Delivered Orders Section */}
      <h2 className="text-xl font-bold mb-4 mt-8 w-full max-w-3xl">الطلبات المكتملة</h2>
      {deliveredOrders.length > 0 ? (
        deliveredOrders.map((order) => (
          <div
            key={order._id}
            className="relative w-full max-w-3xl text-right bg-white p-4 mb-2 rounded-lg shadow-md"
          >
            <div className="p-4 text-right space-y-2 border border-gray-300">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <p className="text-lg font-semibold text-green-500 mr-2">
                  تم التسليم
                </p>
              </div>
              <p className="text-gray-700">
                <strong>رقم الطلب:</strong> {order.order_number}
              </p>
              <p className="text-gray-700">
                <strong>تاريخ الطلب:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>المجموع الكلي:</strong>{" "}
                {getTotalPrice(order.order_items)} دينار
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-600 w-full max-w-3xl">لا توجد طلبات مكتملة</div>
      )}
    </div>
  );
};

export default OrdersPage;