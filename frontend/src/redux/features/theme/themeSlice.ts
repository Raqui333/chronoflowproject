import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  value: 'dark' | 'light';
};

const initialState: ThemeState = { value: 'light' };

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.value = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
