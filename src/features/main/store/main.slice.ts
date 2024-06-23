import { createSlice } from "@reduxjs/toolkit";
import { Skill } from "./main.model";
import { RootState } from "../../store";

interface InitialState {
  skills: Skill[];
}

const initialState: InitialState = {
  skills: [],
};

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
  },
});

export const { setSkills } = mainSlice.actions;

export const selectSkills = (state: RootState) => state.mainReducer.skills;

export default mainSlice.reducer;
