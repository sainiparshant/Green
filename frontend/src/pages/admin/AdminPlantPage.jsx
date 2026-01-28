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
    <div className=" min-h-screen w-full p-2 md:p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  
  
  <div>
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
      Products
    </h1>
    <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md">
      Manage your products and inventory here.
    </p>
  </div>

  <div className="flex sm:justify-end">
    <Link
      to="/admin/plants/add-plant"
      className="
        inline-flex items-center justify-center
        bg-emerald-700 text-white
        px-4 py-2
        rounded-md
        text-sm font-semibold
        hover:bg-emerald-600
        transition
        w-full sm:w-auto
      "
    >
      + Add Product
    </Link>
  </div>

</div>
    <div className="grid grid-col-1 lg:grid-cols-3 items-end gap-10">
      <div className="w-full lg:col-span-2 bg-white rounded-xl flex  gap-2 py-1 px-3 mt-6 border border-gray-300 ">
        <Search size={16}/>
        <input
          type="text"
          placeholder="Search here"
          className=" outline-none  text-sm"
        />
      </div>
      <div class="lg:col-span-1">
        
  <select class="w-full bg-white border border-gray-300 text-gray-700 py-1 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 appearance-none">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </select>
 
</div>

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
