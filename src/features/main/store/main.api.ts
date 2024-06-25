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
      query: (code) => ({
        credentials: "include",
        method: "GET",
        url: `jobs/get-by-code/${code}`,
      }),
    }),
    getAllJobs: build.query<Job[], void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: `jobs/get-all`,
      }),
    }),
    getAppByCode: build.query<Application, string>({
      query: (code) => ({
        credentials: "include",
        method: "GET",
        url: `applications/get-by-code/${code}`,
      }),
    }),
    getAllApps: build.query<Application[], void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: "applications/get-all",
      }),
    }),
    getProfile: build.query<Profile, void>({
      query: () => ({
        credentials: "include",
        method: "GET",
        url: "profile/get-profile",
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
