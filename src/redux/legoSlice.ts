import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { iLego } from "@/types";

const legoPoints: iLego[] = [
  {
    name: "World cafe",
    active: false,
    id: 1,
  },
  {
    name: "«Treasure hunt» game",
    active: false,
    id:2
  },
  {
    name: "The possibility of involving a mentor and/or a judge.",
    active: false,
    id:3,
  },
  {
    name: "Post about the company on Instagram.",
    active: false,
    id:4,
  },
  {
    name: "Sending out job vacancies via a Telegram bot",
    active: false,
    id: 5,
  },
  {
    name: "Placement of the company banner during the Hackathon",
    active: false,
    id: 6,
  },
  {
    name: "Access to the CV database of participants",
    active: false,
    id: 7,
  },
  {
    name: "Nomination from the company",
    active: false,
    id: 8,
  },
  {
    name: "Participation in the creative mystery `Define solution`",
    active: false,
    id: 8,
  },
  
];

const initialState = legoPoints;

const legoPointsSlice = createSlice({
  name: "lego",
  initialState,
  reducers: {
    togglePointActive: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      const point = state.find((sp) => sp.name === name);
      if (point) {
        point.active = !point.active;
      }
    },
  },
});

export const { togglePointActive } = legoPointsSlice.actions;

export default legoPointsSlice.reducer;
