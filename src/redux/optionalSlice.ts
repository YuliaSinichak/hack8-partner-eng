import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { iOptional } from "@/types";

const options: iOptional[] = [
  {
    name: "Sending out job vacancies via a Telegram bot",
    active: false,
    price: 80,
  },
  {
    name: "Placement of the company banner during the Hackathon",
    active: false,
    price: 60,
  },
  {
    name: "Access to the CV database of participants",
    active: false,
    price: 60,
  },
  {
    name: "Nomination from the company",
    active: false,
    price: 80,
  },
  {
    name: "Participation in the creative mystery `Define solution`(3 left)",
    active: false,
    price: 150,
  },
];

const initialState = options;

const optionalPacketsSlice = createSlice({
  name: "optional",
  initialState,
  reducers: {
    toggleOptionActive: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      const option = state.find((sp) => sp.name === name);
      if (option) {
        option.active = !option.active;
      }
    },
  },
});

export const { toggleOptionActive } = optionalPacketsSlice.actions;

export default optionalPacketsSlice.reducer;
