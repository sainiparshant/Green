import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { getCart, removeItem, updateQuantity } from "../redux/cartSlice";

const CartCard = ({ image, name, title, price, quantity, size, productId}) => {
  const dispatch = useDispatch();


  const decrease = async() =>{
    if(quantity <= 1) return;
    await dispatch(updateQuantity({productId, quantity: quantity - 1}));
  }

   const increase = async() =>{
    await dispatch(updateQuantity({productId, quantity: quantity + 1}));
  }


  const handleRemove = async() =>{
   await dispatch(removeItem({productId}));
  } 

  return (
    <div className="bg-white flex md:mb-2 p-4 md:p-6 border-b border-gray-300 rounded-lg">

      <div className="flex gap-4 flex-1">
        <img
          src={image}
          alt={name}
          className="w-22 h-25  sm:w-30 sm:h-30 object-cover rounded-lg"
        />

        <div className="flex flex-col gap-2">
          
            <h2 className="font-semibold text-sm sm:text-lg text-gray-900 line-clamp-1">
              {name}
            </h2>
            <p className="italic text-xs sm:text-sm text-gray-500 line-clamp-1">
              {title}
            </p>

           <div className="flex">
            <span className="bg-gray-200 text-xs rounded px-3 py-1 ">{size}</span>
           </div>
          

          <p className="font-semibold text-sm sm:text-base text-emerald-700">
            ₹{price}
          </p>
        </div>

      </div>

      <div className="flex flex-col items-end  justify-between gap-3 sm:gap-2">

        <button 
        onClick={handleRemove} className="text-gray-400 hover:text-red-500 cursor-pointer">
          <Trash2 size={18} />
        </button>

        <div className="flex items-center border rounded-lg px-2 py-1">
          <button 
          onClick={decrease}
          className="px-2 text-sm cursor-pointer">−</button>
          <span className="px-2 text-sm font-medium">{quantity}</span>
          <button
          onClick={increase}
          className="px-2 text-sm cursor-pointer">+</button>
        </div>

      </div>

      
    </div>
  );
};

export default CartCard;
