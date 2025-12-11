import {Search } from "lucide-react";
import ProductTable from "../../components/ProductTable";
import { Link } from "react-router-dom";

const AdminPlantPage = () => {
  const filteredProducts = [
    {
      id: 1,
      name: "Fiddle Leaf Fig",
      category: "Indoor Plant",
      price: 45.99,
      stock: 20,
      available: true,
      featured: true,
    },
    {
      id: 2,
      name: "Snake Plant",
      category: "Indoor Plant",
      price: 30.0,
      stock: 5,
      available: true,
      featured: false,
    },
    {
      id: 3,
      name: "Monstera Deliciosa",
      category: "Indoor Plant",
      price: 55.5,
      stock: 0,
      available: false,
      featured: true,
    },
    {
      id: 4,
      name: "Peace Lily",
      category: "Indoor Plant",
      price: 25.75,
      stock: 12,
      available: true,
      featured: false,
    },
    {
      id: 5,
      name: "ZZ Plant",
      category: "Indoor Plant",
      price: 40.0,
      stock: 18,
      available: true,
      featured: true,
    },
    {
      id: 6,
      name: "Spider Plant",
      category: "Indoor Plant",
      price: 20.0,
      stock: 8,
      available: true,
      featured: false,
    },
    {
      id: 7,
      name: "Aloe Vera",
      category: "Succulent",
      price: 15.0,
      stock: 25,
      available: true,
      featured: true,
    },
    {
      id: 8,
      name: "Jade Plant",
      category: "Succulent",
      price: 22.5,
      stock: 0,
      available: false,
      featured: false,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen w-full p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Plants</h1>
          <p className="text-sm text-gray-500 mt-2 font-medium">
          Manage your plant and inventory here.
          </p>
        </div>
        <div>
          <Link
          to={"/admin/plants/add-plant"}
          className="mt-4 bg-emerald-800 text-white
          rounded-lg px-4 py-3 text-sm outline-none cursor-pointer text-center w-30 md:w-40 font-semibold hover:bg-emerald-600 transition"
        >
          Add Plant
        </Link>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl flex gap-2 p-3 mt-6 border border-gray-300 ">
        <Search />
        <input
          type="text"
          placeholder="Search here"
          className="w-full h-full outline-none  text-md"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="mt-4 bg-white border border-gray-300 
          rounded-lg px-4 py-2 text-sm outline-none cursor-pointer text-center w-40"
        >
          Featured
        </button>
        <button
          type="button"
          className="mt-4 bg-white border border-gray-300 
          rounded-lg px-4 py-2 text-sm outline-none cursor-pointer text-center w-40"
        >
          Available
        </button>
      </div>

      <div className="bg-card rounded-lg border border-border border-gray-300 overflow-hidden mt-6 bg-white">
        <div className="overflow-x-auto">
          <ProductTable products={filteredProducts}/>
        </div>
      </div>
    </div>
  );
};

export default AdminPlantPage;
