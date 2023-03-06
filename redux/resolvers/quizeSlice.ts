import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examName: "",
  expireTime: 0,
  questions: [],
};

const quizSlice = createSlice({
  name: "quize",
  initialState,
  reducers: {
    quizAdded: (state, action) => {
      state.questions.push(action.payload);
    },
    examNameAdded: (state, action) => {
      state.examName = action.payload;
    },
    resetQuiz: (state, action) => {
      (state.examName = ""), (state.questions = []);
    },
    setExpireTimeState: (state, action) => {
      state.expireTime = action.payload;
    },
  },
});

export const { examNameAdded, quizAdded, resetQuiz, setExpireTimeState } =
  quizSlice.actions;
export default quizSlice.reducer;
