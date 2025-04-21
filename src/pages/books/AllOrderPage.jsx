// import React from "react";
// import { useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";
// // import { useAuth } from "../../context/AuthContext";

// const AllOrderPage = () => {

//   //   const { currentUser } = useAuth();
//   const { data: allOrders = [], isLoading, isError } = useGetAllOrdersQuery();
//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error Getting Order Data</div>;
//   console.log("All Orders: ", allOrders);
//   return (
//     <div className="container mx-auto p-6">
//       <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
//       {allOrders.length === 0 ? (
//         <div>No Orders Found!</div>
//       ) : (
//         <div className="overflow-x-auto rounded-lg shadow-md">
//           <table className="min-w-full table-auto border border-gray-200 bg-white">
//             <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
//               <tr>
//                 <th className="p-3 border">#</th>
//                 {/* <th className="p-3 border">Order ID</th> */}
//                 <th className="p-3 border">Name</th>
//                 <th className="p-3 border">Email</th>
//                 <th className="p-3 border">Phone</th>
//                 <th className="p-3 border">Total Price</th>
//                 <th className="p-3 border">Address</th>
//                 <th className="p-3 border">Products</th>
//                 <th className="p-3 border text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="text-sm text-gray-700">
//               {allOrders.map((order, index) => (
//                 <tr
//                   key={order._id}
//                   className="even:bg-gray-50 hover:bg-gray-100 transition"
//                 >
//                   <td className="p-3 border text-center">{index + 1}</td>
//                   {/* <td className="p-3 border">{order._id}</td> */}
//                   <td className="p-3 border">{order.name}</td>
//                   <td className="p-3 border">{order.email}</td>
//                   <td className="p-3 border">{order.phone}</td>
//                   <td className="p-3 border font-semibold text-green-600">
//                     ${order.totalPrice}
//                   </td>
//                   <td className="p-3 border whitespace-pre-line">
//                     {order.address.city}, {order.address.state},{" "}
//                     {order.address.country}, {order.address.zipcode}
//                   </td>
//                   <td className="p-3 border">
//                     <ul className="list-disc list-inside space-y-1">
//                       {order.productIds.map((book) => (
//                         <li key={book._id}>{book.title}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="p-3 border text-right">
//                     <button
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm shadow-sm transition"
//                       onClick={() => console.log("View order", order._id)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllOrderPage;

import React from "react";
import { useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";
import { useNavigate } from "react-router-dom";

const AllOrderPage = () => {
  const navigate = useNavigate();
  const { data: allOrders = [], isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error Getting Order Data</div>;

  const handleView = (order) => {
    navigate("/view-order", { state: { order } });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      {allOrders.length === 0 ? (
        <div>No Orders Found!</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full table-auto border border-gray-200 bg-white">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Total Price</th>
                <th className="p-3 border">Address</th>
                <th className="p-3 border">Products</th>
                <th className="p-3 border text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {allOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">{order.name}</td>
                  <td className="p-3 border">{order.email}</td>
                  <td className="p-3 border">{order.phone}</td>
                  <td className="p-3 border font-semibold text-green-600">
                    ${order.totalPrice}
                  </td>
                  <td className="p-3 border whitespace-pre-line">
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.country}, {order.address.zipcode}
                  </td>
                  <td className="p-3 border">
                    <ul className="list-disc list-inside space-y-1">
                      {order.productIds.map((book) => (
                        <li key={book._id}>{book.title}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 border text-right">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm shadow-sm transition"
                      onClick={() =>
                        navigate(`/dashboard/view-order/${order._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllOrderPage;
