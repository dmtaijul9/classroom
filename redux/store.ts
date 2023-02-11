import { configureStore } from "@reduxjs/toolkit";
import answerSlice from "./resolvers/answerSlice";
import quizeSlice from "./resolvers/quizeSlice";

const store = configureStore({
  reducer: {
    quiz: quizeSlice,
    questionAsnwer: answerSlice,
  },
});

export default store;
