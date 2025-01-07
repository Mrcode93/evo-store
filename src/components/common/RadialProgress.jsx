import React from "react";
import PropTypes from "prop-types";

const RadialProgress = ({ progress, isVisible, message = "Loading..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm z-50">
      <div className="text-center">
        <div
          className={`radial-progress text-[30px] tracking-wider transition-all duration-500 ease-out ${progress==10 || progress==20 || progress==30 || progress==40 ? 'text-red-600' : progress==50 || progress==60 || progress==70 || progress==80 ? 'text-yellow-600' : progress==90 || progress==100 ? 'text-green-600' : 'text-blue-600'}`}
          style={{
            "--value": progress,
            "--size": "10rem",
            "--thickness": "1.5rem",
          }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
        <p className="mt-4 text-white text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};
RadialProgress.propTypes = {
  progress: PropTypes.number.isRequired,
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default RadialProgress;
