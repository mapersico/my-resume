import { FetchArgs } from "@reduxjs/toolkit/query";
import { baseApi } from "../../store";
import { Application, Job, Profile, Skill } from "./main.model";

export const mainApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSkills: build.query<Skill[], void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: "skills/get-all",
      }),
    }),
    getJobByCode: build.query<Job, string>({
      query: (code) => {
        return code
          ? {
              credentials: "include",
              method: "GET",
              url: `jobs/get-by-code/${code}?lang=${localStorage.getItem(
                "language"
              )}`,
            }
          : ({ data: null, refetch: () => {} } as unknown as
              | string
              | FetchArgs);
      },
    }),
    getAllJobs: build.query<Job[], void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: `jobs/get-all?lang=${localStorage.getItem("language")}`,
      }),
    }),
    getAppByCode: build.query<Application, string>({
      query: (code) => {
        return code
          ? {
              credentials: "include",
              method: "GET",
              url: `applications/get-by-code/${code}?lang=${localStorage.getItem(
                "language"
              )}`,
            }
          : ({ data: null, refetch: () => {} } as unknown as
              | string
              | FetchArgs);
      },
    }),
    getAllApps: build.query<Application[], void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: `applications/get-all?lang=${localStorage.getItem("language")}`,
      }),
    }),
    getProfile: build.query<Profile, void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: `profile/get-profile/${localStorage.getItem("language") || "EN"}`,
      }),
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetJobByCodeQuery,
  useGetProfileQuery,
  useGetAppByCodeQuery,
  useGetAllAppsQuery,
  useGetAllJobsQuery,
} = mainApi;
