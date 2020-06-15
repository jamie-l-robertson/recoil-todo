import React from 'react';
import { RecoilRoot } from "recoil";
import recoilPersist from 'recoil-persist';
import { TodoList } from './components/todoList';

function App() {

  const { RecoilPersist, updateState } = recoilPersist(
    ['todoListState'],
    {
      key: 'recoil-persist',
      storage: localStorage
    });

  return (
    <RecoilRoot initializeState={updateState}>
      <RecoilPersist />
      <div className="app">
        <h1>Todo list</h1>
        <TodoList />
      </div>
    </RecoilRoot>
  );
}

export default App;
