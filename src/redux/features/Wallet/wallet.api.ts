import { baseApi } from "@/redux/baseApi";
import type { IWallet } from "@/types/wallet";

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get-my-wallet
    myWallet: builder.query<{ myWallet: IWallet }, void>({
      query: () => ({
        url: "/wallet/my-wallet",
        method: "GET",
      }),
      transformResponse: (response: {
        statusCode: number;
        success: boolean;
        message: string;
        data: { myWallet: IWallet };
      }) => response.data, // <-- unwrap 'data' here
      providesTags: ["WALLET", "TRANSACTION"],
    }),

    //block/unblock

    //
  }),
});

export const { useMyWalletQuery } = walletApi;
