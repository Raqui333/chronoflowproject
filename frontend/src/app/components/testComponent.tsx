import { increment } from '@/lib/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';

export default function TestComponent() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="dark:bg-background h-screen flex items-center justify-center flex-col gap-1">
      <h1 className="text-4xl">{count}</h1>
      <button
        className="px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg"
        onClick={() => dispatch(increment())}
      >
        INCREMENT
      </button>
    </div>
  );
}
