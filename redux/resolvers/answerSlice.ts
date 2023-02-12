import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questionAnswerPair: [],
};

const answerSlice = createSlice({
  initialState,
  name: "questionAnswer",
  reducers: {
    addAnswer: (state, action) => {
      state.questionAnswerPair.push(action.payload);
    },
  },
});

export const { addAnswer } = answerSlice.actions;
export default answerSlice.reducer;
