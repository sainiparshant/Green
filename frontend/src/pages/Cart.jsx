import { Home, ShoppingBag } from "lucide-react";
import React from "react";
import CartCard from "../components/CartCard";

const Cart = () => {

    const name = "Aloe Vera Plant";
    const image = "/public/greenhouse.jpg";
    const title = "Succulent Plant kjhf jhs kjkjh ";
    const price = "15.00";
    const total = "15.00";
    const quantity = 1;
    const size = "Medium";
  return (
    <div className="min-h-screen">
      <div
        className="flex items-center justify-between gap-2 sm:gap-3 px-3 py-4 sm:p-5 border-b border-gray-200">
        <Home className="text-emerald-800" size={22}  />
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Shopping Cart
        </h1>
         <ShoppingBag className="text-blue-800" size={22}  />
      </div>

      <div className=" flex flex-col md:flex-row gap-5 md:gap-20 p-0 md:p-10 ">
       
        <div className="md:min-w-3xl max-w-lg flex-1">
            <CartCard name={name} image={image} title={title} price={price} total={total} quantity={quantity} size={size}/>
            


        </div>
        <div className="md:w-96  bg-white p-4 sm:p-6 lg:p-6 shadow-md md:h-fit md:rounded">
            <h1 className="font-medium">Order Summary</h1>
            <div className="flex justify-between mt-4 border-b border-gray-300 pb-4">
                <div className="flex flex-col gap-2 mt-2">
                    <p className="p">Subtotal</p>
                    <p className="p">Shipping</p>
                    <p className="p">Tax</p>
                </div>
                <div className="flex flex-col items-start gap-2 mt-2">
                    <p className="font-medium">404</p>
                    <p className="font-medium">40</p>
                    <p className="font-medium">4</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className="font-semibold md:text-lg">Total Amount</span>
                <span className="font-semibold md:text-lg">448</span>
            </div>

        <button className="w-full bg-emerald-800 p-2 rounded mt-2 md:mt-4 text-white ">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
