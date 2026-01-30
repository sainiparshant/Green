import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const ProductTable = ({ products }) => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-gray-100 text-gray-600">
        <tr>
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">ProductType</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Stock</th>
          <th className="px-4 py-3">Size</th>
          <th className="px-4 py-3 text-center">Available</th>
          <th className="px-4 py-3 text-center">Featured</th>
          <th className="px-4 py-3 text-center">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y">
        {products.map((product) => (
          <tr key={product._id} className="hover:bg-gray-50">
           
            <td className="px-4 py-3 font-medium text-gray-900">
              {product.name}
            </td>

            
            <td className="px-4 py-3 text-gray-600">
              {product.productType}
            </td>

            
            <td className="px-4 py-3">₹{product.price}</td>

           
            <td className="px-4 py-3">
              {product.stock > 0 ? product.stock : "Out of stock"}
            </td>

            <td className="px-4 py-3">{product.size}</td>

            
            <td className="px-4 py-3 text-center">
              <Toggle checked={product.available} />
            </td>

            
            <td className="px-4 py-3 text-center">
              <Toggle checked={product.featured} />
            </td>

            
            <td className="px-4 py-3 text-center relative">
              <button
                onClick={() =>
                  setOpenMenu(openMenu === product._id ? null : product._id)
                  
                }
                className="p-1 rounded hover:bg-gray-200"
              >
                <MoreVertical size={16} />
              </button>

              {openMenu === product._id && (
                <div className="absolute right-4 top-10 w-28 bg-white border rounded-md shadow-md z-10">
                  <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100">
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="flex items-center gap-2 w-full px-3 py-2 text-red-600 hover:bg-gray-100">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Toggle = ({ checked }) => {
  return (
    <div
      className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer ${
        checked ? "bg-emerald-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </div>
  );
};


export default ProductTable;
