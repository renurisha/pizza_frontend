import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", "Bearer " + token);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "loginApiTag",
    "userCreateTag",
    "paymentCreateTag",
    "getAllUsersTag",
    "getUserOrdersTag",
    "getAllOrdersTag",
    "getUserByIdTag",
    "getOrderGetByIdTag",
    "getAllCategoryTag",
    "orderCreateTag",
    "orderItemCreateTag",
    "getAllProductsTag",
    "userUpdateTag",
    "orderUpdateTag",
  ],
  endpoints: (builder) => ({
    userCreate: builder.mutation({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllUsersTag"],
    }),

    userUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: "http://127.0.0.1:8000/api/auth/user/" + id,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getAllUsersTag"],
    }),

    getAllUsers: builder.query({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/auth/allUsers",
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllUsersTag"],
    }),
    getUserById: builder.query({
      query: ({ data, id }) => ({
        url: "http://127.0.0.1:8000/api/auth/user" + id,
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllUsersTag"],
    }),

    getUserOrders: builder.query({
      query: ({ data, id }) => ({
        url: "http://localhost:8000/api/order/allOrders?user_id=" + id,
        params: data,
        method: "GET",
      }),
      providesTags: ["getUserOrdersTag"],
    }),
    getAllOrders: builder.query({
      query: (data) => ({
        url: "http://localhost:8000/api/order/allOrders",
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllOrdersTag"],
    }),
    orderGetById: builder.query({
      query: ({ data, id }) => ({
        url: "http://127.0.0.1:8000/api/order/" + id,
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllOrdersTag"],
    }),

    orderUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: "http://127.0.0.1:8000/api/order/update/" + id,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["getAllOrdersTag"],
    }),
    paymentCreate: builder.mutation({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getAllUsersTag"],
    }),
    getAllCategory: builder.query({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/category/allCategory",
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllCategoryTag"],
    }),
    orderCreate: builder.mutation({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/order/create",
        method: "POST",
        body: data,
      }),
    }),
    orderItemCreate: builder.mutation({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/order/orderItems",
        method: "POST",
        body: data,
      }),
    }),
    getAllProducts: builder.query({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/product/allProduct",
        params: Object.fromEntries(
          Object.entries(data).filter(
            ([_, v]) => ![null, undefined, ""].includes(v)
          )
        ),
        method: "GET",
      }),
      providesTags: ["getAllProductsTag"],
    }),
    loginApi: builder.mutation({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginApiMutation,
  useUserCreateMutation,
  usePaymentCreateMutation,
  useGetAllUsersQuery,
  useGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useGetUserByIdQuery,
  useOrderGetByIdQuery,
  useGetAllCategoryQuery,
  useOrderCreateMutation,
  useOrderItemCreateMutation,
  useGetAllProductsQuery,
  useUserUpdateMutation,
  useOrderUpdateMutation,
} = apiSlice;
