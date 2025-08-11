import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const bannerApi = createApi({
  reducerPath: 'homeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getBanners: builder.mutation({
      query: () => ({
        url: 'HomeApi/banner',
        method: 'POST',
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
    getMarquees: builder.mutation({
      query: () => ({
        url: 'HomeApi/marquee',
        method: 'POST',
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
  }),
});

export const { useGetBannersMutation, useGetMarqueesMutation } = bannerApi;
