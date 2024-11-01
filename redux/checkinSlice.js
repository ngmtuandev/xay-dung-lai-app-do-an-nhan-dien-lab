import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCheckin: false,
};

const checkinSlice = createSlice({
  name: 'checkin',
  initialState,
  reducers: {
    setCheckin: (state, action) => {
      console.log("🚀 ~ action:", action)
      state.isCheckin = action.payload;
    }
  },
});

export const { setCheckin } = checkinSlice.actions;

export default checkinSlice.reducer;
