import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../Config/api";

export const counterApi = createApi({
  reducerPath: "counterApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getCounter: builder.mutation({
      query: () => ({
        url: "HomeApi/counter",
        method: "POST",
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
  }),
});

export const { useGetCounterMutation } = counterApi;
