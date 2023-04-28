import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: (token) => ({
        url: "/contact",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation({
      query: ({ contact, token }) => ({
        url: "contact",
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: contact,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        body: id,
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
} = contactApi;
