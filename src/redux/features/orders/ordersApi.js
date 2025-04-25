import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
    }),
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ["Orders"],
    }),

    getAllOrders: builder.query({
      query: ({ page = 1, limit = 10 }) =>
        `/allOrders?page=${page}&limit=${limit}`,
    }),
    
    getOrderById: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
} = ordersApi;

export default ordersApi;
