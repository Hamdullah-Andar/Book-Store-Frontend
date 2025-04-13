// import React from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

// const UserDashboard = () => {
//     const { currentUser } = useAuth();
//     const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error getting orders data</div>;

//     return (
//         <div className=" bg-gray-100 py-16">
//             <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//                 <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
//                 <p className="text-gray-700 mb-6">Welcome, {currentUser?.name || 'User'}! Here are your recent orders:</p>

//                 <div className="mt-6">
//                     <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
//                     {orders.length > 0 ? (
//                         <ul className="space-y-4">
//                             {orders.map((order) => (
//                                 <li key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1">
//                                     <p className="font-medium">Order ID: {order._id}</p>
//                                     <p>Date: {new Date(order?.createdAt).toLocaleDateString()}</p>
//                                     <p >Total: ${order.totalPrice}</p>
//                                     {order.productIds.map((productId) => (
//                                         <p key={productId} className='ml-1'>{productId}</p>
//                                     ))}
//                                 </li>


//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-600">You have no recent orders.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;





// import React from 'react';
// import { useAuth } from '../../../context/AuthContext';
// import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

// const getDateCategory = (dateStr) => {
//     const now = new Date();
//     const orderDate = new Date(dateStr);
//     const diffTime = now - orderDate;
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) return 'Today';
//     if (diffDays === 1) return 'Yesterday';
//     if (diffDays <= 7) return 'Last Week';
//     if (diffDays <= 30) return 'Last Month';
//     if (diffDays <= 365) return 'Last Year';
//     return 'Older';
// };

// const groupOrdersByDate = (orders) => {
//     const grouped = {};
//     orders.forEach((order) => {
//         const category = getDateCategory(order.createdAt);
//         if (!grouped[category]) {
//             grouped[category] = [];
//         }
//         grouped[category].push(order);
//     });

//     return grouped;
// };

// const OrderItem = ({ order }) => (
//     <li className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-1">
//         <p className="font-medium">Order ID: {order._id}</p>
//         <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//         <p>Total: ${order.totalPrice}</p>
//         {order.productIds.map((productId) => (
//             <p key={productId} className="ml-1 text-sm text-gray-600">
//                 • {productId}
//             </p>
//         ))}
//     </li>
// );

// const UserDashboard = () => {
//     const { currentUser } = useAuth();
//     const {
//         data: orders = [],
//         isLoading,
//         isError,
//     } = useGetOrderByEmailQuery(currentUser?.email);

//     if (isLoading) return <div className="text-center mt-10">Loading...</div>;
//     if (isError) return <div className="text-center mt-10 text-red-600">Error getting orders data</div>;

//     const groupedOrders = groupOrdersByDate(orders);
//     const dateSections = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Last Year', 'Older'];

//     return (
//         <div className="bg-gray-100 py-16">
//             <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//                 <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
//                 <p className="text-gray-700 mb-6">
//                     Welcome, {currentUser?.name || 'User'}! Here are your recent orders:
//                 </p>

//                 <div className="mt-6">
//                     {orders.length > 0 ? (
//                         dateSections.map(
//                             (section) =>
//                                 groupedOrders[section] && (
//                                     <div key={section} className="mb-8">
//                                         <h2 className="text-xl font-semibold mb-2">{section}</h2>
//                                         <ul className="space-y-4">
//                                             {groupedOrders[section].map((order) => (
//                                                 <OrderItem key={order._id} order={order} />
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )
//                         )
//                     ) : (
//                         <p className="text-gray-600">You have no recent orders.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDashboard;




import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const getDateCategory = (dateStr) => {
    const now = new Date();
    const orderDate = new Date(dateStr);
    const diffTime = now - orderDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return 'Last Week';
    if (diffDays <= 30) return 'Last Month';
    if (diffDays <= 365) return 'Last Year';
    return 'Older';
};

const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders.forEach((order) => {
        const category = getDateCategory(order.createdAt);
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push(order);
    });
    return grouped;
};

const OrderItem = ({ order }) => (
    <li className="bg-white border border-gray-200 shadow-md rounded-xl p-4 w-fit min-w-[280px] max-w-xs hover:shadow-lg transition duration-300 ease-in-out">
        <p className="font-semibold text-indigo-600 mb-1">Order ID: {order._id}</p>
        <p className="text-sm text-gray-500 mb-1">
            Date: {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="text-base font-medium text-gray-800 mb-2">
            Total: <span className="text-green-600 font-semibold">${order.totalPrice}</span>
        </p>
        <div className="border-t pt-2 mt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">Products:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                {order.productIds.map((book) => (
                    <li key={book._id}>{book.title}</li>
                ))}
            </ul>
        </div>
    </li>
);

const UserDashboard = () => {
    const { currentUser } = useAuth();
    const {
        data: orders = [],
        isLoading,
        isError,
    } = useGetOrderByEmailQuery(currentUser?.email);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-600">Error getting orders data</div>;

    const groupedOrders = groupOrdersByDate(orders);
    const dateSections = ['Today', 'Yesterday', 'Last Week', 'Last Month', 'Last Year', 'Older'];

    console.log("Orders:", orders);
    return (
        <div className="bg-gray-100 py-16">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold mb-4 text-indigo-700">User Dashboard</h1>
                <p className="text-gray-700 mb-6">
                    Welcome, <span className="font-medium">{currentUser?.name || 'User'}</span>! Here are your recent orders:
                </p>

                <div className="mt-6 space-y-10">
                    {orders.length > 0 ? (
                        dateSections.map(
                            (section) =>
                                groupedOrders[section] && (
                                    <div key={section}>
                                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section}</h2>
                                        <ul className="flex flex-wrap gap-6">
                                            {groupedOrders[section].map((order) => (
                                                <OrderItem key={order._id} order={order} />
                                            ))}
                                        </ul>
                                    </div>
                                )
                        )
                    ) : (
                        <p className="text-gray-600 text-center">You have no recent orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
