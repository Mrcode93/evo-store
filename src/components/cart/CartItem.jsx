import React from 'react';
import PropTypes from 'prop-types';
import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => (
  <tr key={item._id} className="hover:bg-gray-100">
    <td className="px-4 py-4 flex items-center space-x-4">
      <img src={item.image} alt="product" className="w-16 h-16 rounded object-cover" />
      <span className="text-gray-700 font-medium">{item.name}</span>
    </td>
    <td className="px-4 py-4 text-gray-900">{item.price} د.ع</td>
    <td className="px-4 py-4 text-center">
      <div className="inline-flex items-center border border-gray-300 rounded">
        <button
          onClick={() => onDecrease(item.productId, item.quantity)}
          className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="number"
          value={item.quantity}
          readOnly
          className="w-12 text-center bg-gray-100 border-0"
        />
        <button
          onClick={() => onIncrease(item.productId, item.quantity)}
          className="px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </td>
    <td className="px-4 py-4 text-right font-medium text-gray-900">
      {item.price * item.quantity} د.ع
    </td>
    <td className="px-4 py-4 text-right">
      <button
        onClick={() => onRemove(item._id)}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
