import { Loader } from 'lucide-react';

const CustomLoader = () => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <Loader size={40} className="animate-spin" />
  </div>
);

export default CustomLoader;