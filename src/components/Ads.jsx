import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdsComponent = ({ ads }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time left until the end date
  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // If the offer has ended
    }
  };

  // Update countdown every second
  useEffect(() => {
    if (ads?.endDate) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(ads.endDate));
      }, 1000);

      return () => clearInterval(timer); // Clear interval on component unmount
    }
  }, [ads]);

  // Don't show the banner if the time has run out
  if (
    !ads ||
    (timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0)
  ) {
    return null; // Hide the component if offer has expired or not available
  }


   return (
    // <div className="min-w-full flex items-center justify-center p-4">
    //    <div
    //     //  #065A82, #0A9396
    //     className="relative w-full bg-gradient-to-l from-[#065A82] to-[#0A9396] rounded-lg text-white py-8 px-6 shadow-xl mb-8"
    //     style={{ direction: "rtl" }}
    //   >
    //     <div className="container w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
    //       {/* Offer Information */}
    //       <div className="flex flex-col justify-center items-start md:w-1/2">
    //         <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
    //           {ads?.title}
    //         </h2>
    //         <p className="text-gray-200 text-lg md:text-2xl leading-relaxed mb-2">
    //           {ads?.description}
    //         </p>
    //         <p className="text-lg bg-primary p-4 rounded-md md:text-xl font-semibold">
    //           خصم {ads?.discount || 0}%
    //         </p>
    //       </div>

    //       {/* Countdown and Image */}
    //       <div className="flex flex-col justify-center items-center md:w-1/2">
    //         <div className="bg-white text-accent rounded-lg p-4 mb-4 text-center shadow-md">
    //           <p className="text-lg font-semibold mb-2">العرض ينتهي في:</p>
    //           <div className="text-xl md:text-2xl">
    //             {timeLeft.days > 0 && `${timeLeft.days} أيام و `}
    //             {`${timeLeft.hours
    //               .toString()
    //               .padStart(2, "0")}:${timeLeft.minutes
    //               .toString()
    //               .padStart(2, "0")}:${timeLeft.seconds
    //               .toString()
    //               .padStart(2, "0")} ساعة`}
    //           </div>
    //         </div>
    //         <img
    //           src={ads?.image}
    //           alt="Offers"
    //           // className="w-full h-48 md:w-3/4 md:h-64 rounded-lg shadow-lg object-cover"
    //         />
    //       </div>
    //     </div>
    //   </div>
     // </div>
     <div className="flex items-center justify-center p-6 bg-gray-100">
  <div className="relative w-full max-w-5xl  bg-gradient-to-l from-[#065A82] to-[#0A9396] rounded-lg shadow-md overflow-hidden">
    {/* Top Section */}
    <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-12">
      {/* Left Image */}
      <div className="flex-1 hidden lg:block">
        <img
          src={ads?.image}
          alt="Left Offer"
          className="rounded-lg object-cover w-full h-64 shadow-sm"
        />
      </div>

      {/* Center Discount */}
      <div className="flex-1 text-center">
        <p className="uppercase text-white text-[1rem]  tracking-wider mb-4">
          العرض ينتهي في {timeLeft.days} يوم و {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </p>
        <h1 className="text-white text-9xl font-bold leading-none mb-4">
          {ads?.discount || 0}
          <span className="text-9xl align-top">%</span>
        </h1>
        <p className="text-3xl text-gray-200">{ads?.description || "تفاصيل العرض"}</p>
      </div>

      {/* Right Image */}
      <div className="flex-1 hidden lg:block">
        <img
          src={ads?.image}
          alt="Right Offer"
          className="rounded-lg object-cover w-full h-20 shadow-sm"
        />
      </div>
    </div>

  </div>
</div>

  
  );
};

export default AdsComponent;