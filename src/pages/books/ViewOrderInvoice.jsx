import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../redux/features/orders/ordersApi"; // 👈 RTK Query hook

const ViewOrderInvoice = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !order) return <div>Order not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <div
        id="invoice-section"
        className="max-w-2xl mx-auto p-6 bg-white shadow rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Invoice</h2>
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Name:</strong> {order.name}
        </p>
        <p>
          <strong>Email:</strong> {order.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.phone}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.totalPrice}
        </p>
        <p>
          <strong>Address:</strong> {order.address?.city},{" "}
          {order.address?.state}, {order.address?.country},{" "}
          {order.address?.zipcode}
        </p>

        <h3 className="font-semibold mt-4">Products:</h3>
        <ul className="list-disc list-inside">
          {order.productIds?.map((book) => (
            <li key={book._id}>{book.title}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => window.print()}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default ViewOrderInvoice;
