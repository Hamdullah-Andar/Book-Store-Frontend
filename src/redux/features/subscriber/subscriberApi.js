// features/subscribers/subscriberApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

// ✅ Custom baseQuery with token and credentials support
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/subscriber`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ✅ createApi for subscribers
const subscriberApi = createApi({
  reducerPath: "subscriberApi",
  baseQuery,
  tagTypes: ["Subscribers"],
  endpoints: (builder) => ({
    createSubscriber: builder.mutation({
      query: (emailData) => ({
        url: "/create-subscriber",
        method: "POST",
        body: emailData,
      }),
      invalidatesTags: ["Subscribers"],
    }),
    getAllSubscribers: builder.query({
      query: () => "/",
      providesTags: ["Subscribers"],
    }),
  }),
});

// ✅ Export hooks
export const {
  useCreateSubscriberMutation,
  useGetAllSubscribersQuery,
} = subscriberApi;

export default subscriberApi;
