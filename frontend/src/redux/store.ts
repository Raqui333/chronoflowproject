import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/counter/counterSlice';
import themeReducer from './features/theme/themeSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      theme: themeReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
