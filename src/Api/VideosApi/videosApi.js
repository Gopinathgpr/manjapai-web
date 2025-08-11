import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const videosApi = createApi({
  reducerPath: 'videosApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => ({
        url: 'HomeApi/video_home',
        method: 'POST',
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
  }),
});

export const { useGetVideosQuery } = videosApi;
