// src/features/menu/menuApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMenu: builder.query({
      query: () => ({
        url: 'HomeApi/menu',
        method: 'POST',
         body: JSON.stringify({
          token: 'MeendumManjappai',
        }),
      }),
      transformResponse: (response) => {
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error(response?.message || 'Failed to fetch menu');
      },
    }),
  }),
});

export const { useGetMenuQuery } = menuApi;
