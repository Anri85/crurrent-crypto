import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoNewsAPIHeaders = {
  "x-bingapis-sdk": `${process.env.REACT_APP_X_BINGAPIS_SDK_API_NEWS}`,
  "x-rapidapi-host": `${process.env.REACT_APP_X_RAPIDAPI_NEWS_HOST}`,
  "x-rapidapi-key": `${process.env.REACT_APP_X_RAPIDAPI_NEWS_KEY}`,
};

const baseUrl = `${process.env.REACT_APP_X_RAPIDAPI_NEWS_URL}`;

const createRequest = (url) => ({ url, headers: cryptoNewsAPIHeaders });

export const cryptoNewsAPI = createApi({
  reducerPath: "cryptoNewsAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsAPI;
