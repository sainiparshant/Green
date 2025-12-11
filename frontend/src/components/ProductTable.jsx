import React from "react";
import { Edit2, Search, Trash2 } from "lucide-react";

const ProductTable = ({ products }) => {
  return (
    <div>
      <table className="w-full">
        <thead className="bg-emerald-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Product Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border divide-gray-300">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-100 transition cursor-pointer"
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  ${product.price}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 15
                        ? "bg-emerald-100 text-emerald-700"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-800">
                  <div className="flex items-center gap-3">
                   
                    <span
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-medium 
      border-gray-200 bg-white text-gray-700"
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          product.available ? "bg-gray-800" : "bg-gray-300"
                        }`}
                      ></span>
                      {product.available ? "Available" : "Unavailable"}
                    </span>

                    
                    <span
                      className="inline-flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-medium 
      border-gray-200 bg-white text-gray-600"
                    >
                      {product.featured ? "Featured" : "Standard"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-secondary rounded-lg transition text-emerald-600 hover:text-emerald-700">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 hover:bg-secondary rounded-lg transition text-red-600 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-8 text-center text-muted-foreground"
              >
                No products found matching your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
