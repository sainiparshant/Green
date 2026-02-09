import { useState } from "react";

const AdminProductTable = ({ products }) => {
  const [openProduct, setOpenProduct] = useState(null);

  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-gray-600 font-medium">
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Available</th>
            <th className="px-4 py-3">Featured</th>
            <th className="px-4 py-3">Variants</th>
            <th className="px-4 py-3">Total Stock</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => {
            const totalStock = product.variantsDetail.reduce(
              (sum, v) => sum + v.stock,
              0
            );

            return (
              <>
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    setOpenProduct(
                      openProduct === product._id ? null : product._id
                    )
                  }
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="px-4 py-3">
                    {product.productType}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.available
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.available ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {product.isFeatured ? "Yes" : "No"}
                  </td>

                  <td className="px-4 py-3">
                    {product.variantsDetail.length}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {totalStock}
                  </td>

                  <td className="px-4 py-3 text-emerald-600 text-sm">
                    {openProduct === product._id ? "Hide" : "View"}
                  </td>
                </tr>

                {openProduct === product._id && (
                  <tr>
                    <td colSpan="7" className="bg-gray-50 px-4 py-4">
                      <table className="w-full text-sm border rounded-lg bg-white">
                        <thead className="bg-gray-100 border-b">
                          <tr className="text-gray-600">
                            <th className="px-3 py-2">Size</th>
                            <th className="px-3 py-2">Color</th>
                            <th className="px-3 py-2">Price</th>
                            <th className="px-3 py-2">Stock</th>
                            <th className="px-3 py-2">Status</th>
                            <th className="px-3 py-2">Actions</th>
                          </tr>
                        </thead>

                        <tbody>
                          {product.variantsDetail.map((variant) => (
                            <tr
                              key={variant._id}
                              className="border-t hover:bg-gray-50"
                            >
                              <td className="px-3 py-2">
                                {variant.size || "-"}
                              </td>

                              <td className="px-3 py-2">
                                {variant.color || "-"}
                              </td>

                              <td className="px-3 py-2 font-medium">
                                ₹{variant.price}
                              </td>

                              <td
                                className={`px-3 py-2 font-medium ${
                                  variant.stock < 5
                                    ? "text-red-600"
                                    : "text-gray-900"
                                }`}
                              >
                                {variant.stock}
                              </td>

                              <td className="px-3 py-2">
                                {variant.stock > 0
                                  ? "In Stock"
                                  : "Out of Stock"}
                              </td>

                              <td className="px-3 py-2">
                                <button className="text-sm text-blue-600 hover:underline mr-3">
                                  Edit
                                </button>
                                <button className="text-sm text-red-600 hover:underline">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductTable;
