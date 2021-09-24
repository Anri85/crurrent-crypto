import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoAPIHeaders = {
  "x-rapidapi-host": `${process.env.REACT_APP_X_RAPIDAPI_HOST}`,
  "x-rapidapi-key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`,
};

const baseUrl = `${process.env.REACT_APP_X_RAPIDAPI_URL}`;

const createRequest = (url) => ({ url, headers: cryptoAPIHeaders });

export const cryptoAPI = createApi({
  reducerPath: "cryptoAPI",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetail: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getCryptoExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    })
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailQuery,
  useGetCryptoHistoryQuery,
  useGetCryptoExchangesQuery
} = cryptoAPI;
