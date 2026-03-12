import axios from "axios";
import React, { useEffect, useState } from "react";
import getBaseUrl from "../../utils/baseURL";
import Loading from "../../components/Loading";
import { MdIncompleteCircle, MdOutlineShoppingCart, MdOutlineInventory2, MdOutlinePeopleAlt, MdOutlineTrendingUp } from "react-icons/md";
import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard 
          icon={<MdOutlineInventory2 className="size-6 text-purple-600" />} 
          label="Total Books" 
          value={data?.totalBooks} 
          bgColor="bg-purple-100" 
        />
        <StatCard 
          icon={<MdOutlineTrendingUp className="size-6 text-green-600" />} 
          label="Total Sales" 
          value={`$${data?.totalSales?.toLocaleString()}`} 
          bgColor="bg-green-100" 
        />
        <StatCard 
          icon={<MdOutlineShoppingCart className="size-6 text-blue-600" />} 
          label="Total Orders" 
          value={data?.totalOrders} 
          bgColor="bg-blue-100" 
        />
        <StatCard 
          icon={<MdOutlinePeopleAlt className="size-6 text-orange-600" />} 
          label="Customers" 
          value={data?.totalCustomers} 
          bgColor="bg-orange-100" 
        />
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="md:col-span-2 bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
          <RevenueChart monthlySales={data?.monthlySales} />
        </div>

        {/* Top Selling Books */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Top Selling Books</h3>
          <ul className="space-y-4">
            {data?.topSellingBooks?.map((item, index) => (
              <li key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded overflow-hidden">
                   <img src={item.bookDetails.coverImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.bookDetails.title}</p>
                  <p className="text-xs text-gray-500">{item.count} sales</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="md:col-span-2 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {data?.recentOrders?.map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 font-medium text-gray-900">{order.name}</td>
                    <td className="px-6 py-4">${order.totalPrice}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center">
            <MdOutlineInventory2 className="mr-2" /> Low Stock Alerts
          </h3>
          <ul className="space-y-4">
            {data?.lowStockBooks?.length > 0 ? (
              data.lowStockBooks.map((book, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-md">
                   <span className="text-sm font-medium text-gray-800 truncate pr-2">{book.title}</span>
                   <span className="text-xs font-bold text-red-600">{book.quantity} left</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">All books are well stocked!</p>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, label, value, bgColor }) => (
  <div className="flex items-center p-6 bg-white shadow rounded-lg">
    <div className={`inline-flex items-center justify-center h-12 w-12 rounded-full mr-4 ${bgColor}`}>
      {icon}
    </div>
    <div>
      <span className="block text-2xl font-bold text-gray-800">{value}</span>
      <span className="block text-sm text-gray-500 font-medium">{label}</span>
    </div>
  </div>
);

export default Dashboard;
