import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../Config/api";

export const awardsApi = createApi({
  reducerPath: "awardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAwardsHome: builder.query({
      query: () => ({
        url: "HomeApi/awards_home",
        method: "POST",
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
      transformResponse: (response) => {
        if (response.status === 200) {
          return {
            awards: response.data_awards || [],
            recognitions: response.data_recognitions || [],
          };
        }
        throw new Error(response.message || "Failed to fetch data");
      },
    }),
  }),
});

export const { useGetAwardsHomeQuery } = awardsApi;
