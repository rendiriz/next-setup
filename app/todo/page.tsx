import { TodoInput } from '@/components/todo/TodoInput';
import { TodoList } from '@/components/todo/TodoList';

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Todo App with Legend State</h1>
      <TodoInput />
      <TodoList />
    </main>
  );
}
