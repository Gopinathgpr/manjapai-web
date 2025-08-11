import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const vendingMachineApi = createApi({
  reducerPath: 'vendingMachineApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getHomepageSectionTwo: builder.mutation({
      query: () => ({
        url: 'HomeApi/homepagesection',
        method: 'POST',
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
      
    }),
  }),
});

export const { useGetHomepageSectionTwoMutation } = vendingMachineApi;
