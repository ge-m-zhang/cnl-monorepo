import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',  
    credentials: 'include',  
  }),
  endpoints: (builder) => ({
    pingBackend: builder.query<{ message: string }, void>({
      query: () => '/ping',  // Test
    }),
  }),
});

export const { usePingBackendQuery } = apiSlice;