import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_BASE_API}`,
  prepareHeaders: (headers, { getState }) => {
    const currentLanguage = (getState() as RootState).appReducer.key;
    headers.set("Language", currentLanguage);

    return headers;
  },
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
