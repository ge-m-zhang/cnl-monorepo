import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// the base URL of your backend and setup credentials for session handling
export const authSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api', 
    credentials: 'include',  
  }),
  endpoints: (builder) => ({

   
    // Endpoint for fetching user profile after login
    getProfile: builder.query<any, void>({
      query: () => '/auth/profile',  // Calls the /auth/profile endpoint
    }),
  }),
});

export const { useGetProfileQuery } = authSlice;