import { baseApi } from "../../store";
import { IContactBody, IGetLangByKeyQuery } from "./app.model";
import { setContent } from "./app.slice";

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

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
    getResumeByLang: build.mutation<ArrayBuffer, void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: `file/resume?lang=${localStorage.getItem("language")}`,
        responseHandler: async (response) => {
          return response.blob();
        },
      }),
      onQueryStarted: async (_arg, { queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          const filename = `Marco Pérsico CV ${localStorage.getItem(
            "language"
          )}.pdf`;
          downloadBlob(data as unknown as Blob, filename);
        } catch (error) {
          console.error("Error downloading the file", error);
        }
      },
    }),
    sendContact: build.mutation<void, IContactBody>({
      query: (body) => ({
        credentials: "include",
        method: "POST",
        url: "contact/send-email",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetLangByKeyMutation,
  useGetResumeByLangMutation,
  useSendContactMutation,
} = appApi;
