import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examName: "",
  questions: [],
};

const quizSlice = createSlice({
  name: "quize",
  initialState,
  reducers: {
    quizAdded: (state, action) => {
      console.log(action.payload);

      state.questions.push(action.payload);
    },
    examNameAdded: (state, action) => {
      state.examName = action.payload;
    },
    resetQuiz: (state, action) => {
      state = {
        examName: "",
        questions: [],
      };
    },
  },
});

export const { examNameAdded, quizAdded, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
