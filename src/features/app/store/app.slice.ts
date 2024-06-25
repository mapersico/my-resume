import { createSlice } from "@reduxjs/toolkit";
import { ILanguage } from "./app.model";
import { RootState } from "../../store";
import { QueryStatus } from "@reduxjs/toolkit/query";

interface InitialState {
  content: ILanguage | null;
  key: string;
  navOpened: boolean;
}

const initialState: InitialState = {
  content: null,
  key: localStorage.getItem("language") || "EN",
  navOpened: true,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload.data;
      state.key = action.payload.key;
    },
    toggleNav: (state) => {
      state.navOpened = !state.navOpened;
    },
    setContentKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

export const { setContent, toggleNav, setContentKey } = appSlice.actions;

export const selectHeaderContent = (state: RootState) =>
  state.appReducer.content?.header;
export const selectFooterContent = (state: RootState) =>
  state.appReducer.content?.footer;
export const selectNavigationContent = (state: RootState) =>
  state.appReducer.content?.navbar;
export const selectContactFormContent = (state: RootState) =>
  state.appReducer.content?.contactForm;
export const selectSkillsContent = (state: RootState) =>
  state.appReducer.content?.skills;
export const selectApplicationContent = (state: RootState) =>
  state.appReducer.content?.application;
export const selectFullviewContent = (state: RootState) =>
  state.appReducer.content?.fullview;

export const selectContentKey = (state: RootState) => state.appReducer.key;
export const selectNavState = (state: RootState) => state.appReducer.navOpened;

export const selectGlobalLoading = (state: RootState) => {
  const isLoading =
    Object.values(state.api.queries).some(
      (query) => query?.status === QueryStatus.pending
    ) ||
    Object.values(state.api.mutations).some(
      (mutation) => mutation?.status === QueryStatus.pending
    );
  return isLoading;
};

export default appSlice.reducer;
