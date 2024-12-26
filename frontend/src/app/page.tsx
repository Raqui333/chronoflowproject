'use client';

import { Provider } from 'react-redux';
import store from './redux/store';

export default function Home() {
  return (
    <Provider store={store}>
      <div className="dark:bg-background h-screen flex items-center justify-center">
        <h1 className="text-4xl">Hello World</h1>
      </div>
    </Provider>
  );
}
