import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../redux/cartSlice";

const CartCard = ({
  image,
  name,
  title,
  price,
  quantity,
  size,
  productId,
  variantId,
}) => {
  const dispatch = useDispatch();

  const decrease = async () => {
    if (quantity <= 1) return;
    await dispatch(
      updateQuantity({ productId, quantity: quantity - 1, variantId }),
    );
  };

  const increase = async () => {
    await dispatch(
      updateQuantity({ productId, quantity: quantity + 1, variantId }),
    );
  };

  const handleRemove = async () => {
    await dispatch(removeItem({ variantId }));
  };

  return (
    <div className="flex gap-4 py-4 px-2 md:px-4 border-b border-gray-200">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover bg-gray-100"
      />

      <div className="flex flex-1 justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium text-gray-900 line-clamp-1">
            {name}
          </h2>

          <p className="text-xs text-gray-500 line-clamp-1">{title}</p>

          {size && (
            <span className="mt-1 inline-block text-xs text-gray-500">
              Size: {size}
            </span>
          )}

          <p className="mt-2 text-sm font-semibold text-gray-900">₹{price}</p>
        </div>

        <div className="flex flex-col items-end justify-between">
          <button
            onClick={handleRemove}
            className="text-xs md:text-sm font-medium text-gray-500 cursor-pointer
             hover:text-red-600 transition underline-offset-4 hover:underline"
          >
            Remove
          </button>

          <div className="flex items-center gap-3 border border-gray-300 px-2 py-1">
            <button
              onClick={decrease}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              −
            </button>

            <span className="min-w-[20px] text-center text-sm font-medium">
              {quantity}
            </span>

            <button
              onClick={increase}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
