import {
  Package,
  ShoppingCart,
  TrendingUp,
  User,
  UserCircle,
  Users,
} from "lucide-react";
import React from "react";
import Card from "../../components/Card";
import RevenueBarChart from "../../components/RevenueBarChart";
import RecentOrderCard from "../../components/RecentOrderCard";
import API from '../../api/axios'
import { useEffect } from "react";
import { useState } from "react";

const AdminDashboard = () => {

  const [data, setData] = useState({});
  const [orders, setOrders] = useState([]);
  const [revenueData, setRevenueData] = useState([]);


  const monthlyRevenue = async() =>{
    try {
      const res = await API.get("/admin/monthly-rev");
      console.log(res.data?.data);
      setRevenueData(res.data.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const dashboardStats = async() =>{
    try {
      const res = await API.get("/admin/recent-orders");
      console.log(res.data.data);
      setData(res.data.data);
      setOrders(res.data.data.recentOrders);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    dashboardStats();
    monthlyRevenue();
  }, [])

  const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = revenueData.map(item => ({
  ...item,
  monthName: monthNames[item.month - 1]
  }));

  return (
    <div className="w-full min-h-screen">
      <div className="p-2 md:p-4">
        <h1 className="text-xl md:text-2xl font-semibold ">Dashboard</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 md:p-4">
        <Card
          title="Total Products"
          quantity={data.totalProduct}
          icon={<Package size={22} />}
        />
        <Card
          title="Total Orders"
          quantity={data.stat?.count}
          icon={<ShoppingCart size={22} />}
        />
        <Card
          title="Total Customers"
          quantity={data.totalCustomer}
          icon={<Users size={22} />}
        />
        <Card
          title="Total Revenue"
          quantity={data.stat?.total}
          icon={<TrendingUp size={22} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 p-2 md:p-4 gap-5 pb-24">
        <div className="border border-gray-300 p-2 md:p-6 rounded-lg lg:col-span-2 bg-white">
          <RevenueBarChart data={chartData} />
        </div>

        <div className="border border-gray-300 bg-white p-4 rounded-lg lg:col-span-1 overflow-y-scroll h-[23rem]">
          <h1 className="font-semibold">Recent Orders</h1>
          {orders.map((order) =>(
            <RecentOrderCard  key={order._id} order={order}/>
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
