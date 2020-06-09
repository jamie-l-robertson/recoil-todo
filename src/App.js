import React from 'react';
import { RecoilRoot } from "recoil";

import { TodoList } from './components/todoList';

function App() {
  return (
    <RecoilRoot>
      <div className="app">
        <h1>Todo list</h1>
        <TodoList />

      </div>
    </RecoilRoot>
  );
}

export default App;
