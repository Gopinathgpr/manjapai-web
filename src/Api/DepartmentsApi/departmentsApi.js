import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const departmentsApi = createApi({
  reducerPath: 'departmentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDepartments: builder.query({
      query: () => ({
        url: 'HomeApi/department_home',
        method: 'POST',
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
      transformResponse: (response) => {
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error(response?.message || 'Failed to fetch departments');
      },
    }),
  }),
});

export const { useGetDepartmentsQuery } = departmentsApi;
