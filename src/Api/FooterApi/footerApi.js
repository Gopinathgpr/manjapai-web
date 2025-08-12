import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const footerApi = createApi({
  reducerPath: 'footerApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // Newsletter subscription
    subscribeNewsletter: builder.mutation({
      query: (emailId) => ({
        url: 'HomeApi/newsletter_form',
        method: 'POST',
        body: JSON.stringify({
          token: 'MeendumManjappai',
          emailId,
        }),
      }),
    }),

    // Visitor log count
    getVisitorLog: builder.query({
      query: () => ({
        url: 'HomeApi/visitor_log',
        method: 'POST',
        body: JSON.stringify({ token: 'MeendumManjappai' }),
      }),
    }),

    // Visitor increment
    incrementVisitor: builder.mutation({
      query: () => ({
        url: 'HomeApi/visitor_count',
        method: 'POST',
        body: JSON.stringify({ token: 'MeendumManjappai' }),
      }),
    }),
  }),
});

export const {
  useSubscribeNewsletterMutation,
  useGetVisitorLogQuery,
  useIncrementVisitorMutation,
} = footerApi;
