import React, { useState } from 'react';
import { atom, useRecoilValue, selector, useSetRecoilState } from 'recoil';
import Header from './header';
import TodoItem from './todoItem.js';
import Footer from './footer';

import { ReactComponent as CoffeeIcon } from '../icons/coffee-cup.svg';
import { ReactComponent as AddIcon } from '../icons/circle-plus.svg';

const todoListState = atom({
  key: 'todoListState',
  default: [],
  persistence_UNSTABLE: { // new method coming, keep watch
    type: 'todoListState'
  }
});

const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});

const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(filteredTodoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});


function TodoList() {
  const todoList = useRecoilValue(filteredTodoListState);

  return (
    <>
      <div className="panel">
        <Header />
        {todoList.length > 0 ? todoList.map(todoItem => (
          <TodoItem key={todoItem.id} item={todoItem} />
        )) : <p className="no-items">No tasks, time for a coffee <CoffeeIcon /></p>}
        <TodoItemCreator />
      </div>
      <Footer />
    </>
  )
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {

    // Block if input empty
    if (inputValue === '') return false;

    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      }
    ]);

    // Clear input after addition
    setInputValue('');

  }

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <>
      <div className="add-item">
        <input type="text" placeholder="Add an item" value={inputValue} onChange={onChange} />
        <button onClick={addItem}>
          <AddIcon />
        </button>
      </div>
    </>
  );
}

function getId() {
  return `${Math.floor(Date.now() + Math.random())}}`;
}

export { TodoList, todoListState, todoListFilterState, todoListStatsState };
