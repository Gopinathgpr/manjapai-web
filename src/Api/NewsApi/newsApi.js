import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../Config/api";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getInternationalNews: builder.mutation({
      query: () => ({
        url: "HomeApi/internationalnews",
        method: "POST",
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
        // redirect: "follow",
      }),
    }),
    getNationalNews: builder.mutation({
      query: () => ({
        url: "HomeApi/nationalnews",
        method: "POST",
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
    getStateNews: builder.mutation({
      query: () => ({
        url: "HomeApi/statenews",
        method: "POST",
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
  }),
});

export const {
  useGetInternationalNewsMutation,
  useGetNationalNewsMutation,
  useGetStateNewsMutation,
} = newsApi;
