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
    "userCreateTag",
    "getAllUsersTag",
    "getAllCategoryTag",
    "orderCreateTag",
    "getAllProductsTag",
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
    getAllUsers: builder.query({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/auth/allUsers",
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllUsersTag"],
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
    getAllProducts: builder.query({
      query: (data) => ({
        url: "http://127.0.0.1:8000/api/product/allProduct",
        params: data,
        method: "GET",
      }),
      providesTags: ["getAllProductsTag"],
    }),
  }),
});

export const {
  useUserCreateMutation,
  useGetAllUsersQuery,
  useGetAllCategoryQuery,
  useOrderCreateMutation,
  useGetAllProductsQuery,
} = apiSlice;
