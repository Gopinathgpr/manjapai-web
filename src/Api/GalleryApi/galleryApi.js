import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../../Config/api';

export const galleryApi = createApi({
  reducerPath: 'galleryApi',
  baseQuery: fetchBaseQuery({baseUrl: API_URL}),
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => ({
        url: 'HomeApi/gallery_home',
        method: 'POST',
        body: JSON.stringify({
          token: "MeendumManjappai",
        }),
      }),
    }),
  }),
});

export const { useGetGalleryQuery } = galleryApi;
