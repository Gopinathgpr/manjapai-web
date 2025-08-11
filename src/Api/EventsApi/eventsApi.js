// src/Api/EventsApi/eventsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../Config/api";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getHomeEvents: builder.query({
      query: () => ({
        url: "HomeApi/event_home",
        method: "POST",
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
      transformResponse: (response) => response?.data || [],
    }),
  }),
});

export const { useGetHomeEventsQuery } = eventsApi;
