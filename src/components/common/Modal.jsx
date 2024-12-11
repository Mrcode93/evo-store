import ReactDOM from 'react-dom';
import {motion} from 'framer-motion';
import PropTypes from 'prop-types';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
      initial={{ opacity: 0,  y: -150}}
      animate={{ opacity: 1 , y: 0}}
      exit={{ opacity: 0 , scale: 0.9, y: -150}} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>,
    document.getElementById('modal-root')
  );
};
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;