import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../../Config/api";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getEventById: builder.query({
      query: (eventId) => ({
        url: "HomeApi/eventby_Id",
        method: "POST",
        body: {
          token: "MeendumManjappai",
          eventId,
        },
      }),
    }),
    getEventList: builder.query({
      query: (categoryId) => ({
        url: "HomeApi/event_all",
        method: "POST",
        body: {
          token: "MeendumManjappai",
          categoryId,
        },
      }),
    }),
  }),
});

export const { useGetEventByIdQuery, useGetEventListQuery } = eventsApi;
