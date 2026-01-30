import { Search, X } from "lucide-react";
import ProductTable from "../../components/ProductTable";
import { useState } from "react";
import API from "../../api/axios";
import { useEffect } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search:"",
    productType:"",
    available:"",
    featured:""
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const allProducts = async () => {
    try {
      const {data} = await API.get(
        `/admin/products`,{
          params:{
            ...filters,
            page
          }
        }
      );
      setProducts(data.data.docs);
      setTotalPages(data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allProducts();
  }, [filters,page]);

  return (
    <div className="min-h-screen w-full p-3 md:p-6 bg-gray-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage your products and inventory here.
          </p>
        </div>

        <button className="bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-emerald-600 transition w-full sm:w-auto">
          + Add Product
        </button>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row gap-4">
        <div className="relative w-full lg:w-2/3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            onChange={(e) => setFilters({...filters, search: e.target.value})}
            placeholder="Search products..."
            className="
              w-full
              pl-9 pr-3 py-2
              text-sm
              rounded-lg
              border border-gray-300
              focus:outline-none
              focus:ring-2 focus:ring-emerald-500
              bg-white
            "
          />
        </div>

        <select
        value={filters.productType}
         onChange={(e) => setFilters({...filters, productType: e.target.value})}
          className="
            w-full lg:w-1/3
            py-2 px-3
            text-sm
            rounded-lg
            border border-gray-300
            bg-white
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500
          "
        >
          <option value="">All Products</option>
          <option value="Plant">Plant</option>
          <option value="Pot">Pot</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <ProductTable products={products} />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-3 ">
        <div className="text-sm text-gray-600">
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </div>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-3 py-1 text-sm rounded-md border
        ${
          page === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 text-sm rounded-md border
          ${
            page === i + 1
              ? "bg-emerald-600 text-white border-emerald-600"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-3 py-1 text-sm rounded-md border
        ${
          page === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
