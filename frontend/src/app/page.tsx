'use client';

import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';
import TestComponent from './components/testComponent';

const store = makeStore();

export default function Home() {
  return (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
}
