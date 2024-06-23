import { baseApi } from "../../store";
import { IGetLangByKeyQuery } from "./app.model";
import { setContent } from "./app.slice";

export const appApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLangByKey: build.mutation<IGetLangByKeyQuery, string>({
      query: (key) => ({
        credentials: "include",
        method: "GET",
        url: `content/get-static-content?lang=${key}`,
      }),
      onQueryStarted: async (_args, api) => {
        const languageContent = await api.queryFulfilled;
        api.dispatch(
          setContent({
            data: languageContent.data.data,
            key: languageContent.data.key,
          })
        );
        localStorage.setItem("language", languageContent.data.key);
      },
    }),
    getCvByLang: build.mutation<ArrayBuffer, void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: `applications/get-cv?lang=${localStorage.getItem("language")}`,
        responseHandler: async (response) => {
          return response.blob();
        },
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        const { data } = await queryFulfilled;
        const url = window.URL.createObjectURL(data as never);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Marco Pérsico CV ${localStorage.getItem("language")}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      },
    }),
  }),
});

export const { useGetLangByKeyMutation, useGetCvByLangMutation } = appApi;
