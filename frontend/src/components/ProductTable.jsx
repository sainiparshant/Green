import { useState, useEffect } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import API from "../api/axios";
import { toast } from "react-toastify";

const ProductTable = ({ products, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(products);
  }, [products]);

  const handleToggle = async (id, field) => {
    setRows((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [field]: !item[field] } : item
      )
    );

    try {
      await API.patch(`/admin/toggle/${id}`, { field });
      toast.success("Availability updated");
    } catch (error) {
      setRows((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, [field]: !item[field] } : item
        )
      );
      toast.error("Update failed");
    }
  };

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr className="text-gray-600">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Type</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Size</th>
            <th className="px-6 py-4 font-semibold text-center">Available</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {rows.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <p className="font-medium text-gray-900">
                  {product.name}
                </p>
              </td>

              <td className="px-6 py-4 text-gray-600">
                {product.productType}
              </td>

              <td className="px-6 py-4 font-medium">
                ₹{product.price}
              </td>

              <td className="px-6 py-4">
                {product.stock > 0 ? (
                  <span className="text-gray-700">
                    {product.stock}
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Out of stock
                  </span>
                )}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {product.size}
              </td>

              <td className="px-6 py-4 text-center">
                <StatusToggle
                  active={product.available}
                  onClick={() =>
                    handleToggle(product._id, "available")
                  }
                />
              </td>

              <td className="px-6 py-4 text-right relative">
                <button
                  onClick={() =>
                    setOpenMenu(openMenu === product._id ? null : product._id)
                  }
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenu === product._id && (
                  <div className="absolute right-6 top-12 w-32 bg-white border rounded-lg shadow-lg z-10">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50">
                      <Pencil size={14} /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatusToggle = ({ active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold transition
        ${
          active
            ? "bg-emerald-100 text-emerald-700"
            : "bg-gray-200 text-gray-600"
        }`}
    >
      {active ? "Available" : "Unavailable"}
    </button>
  );
};

export default ProductTable;
