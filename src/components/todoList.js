import React, { useState } from 'react';
import { atom, useRecoilValue, selector, useSetRecoilState } from 'recoil';
import TodoListFilters from './todoListFilter';
import TodoListStats from './todoListStats';
import TodoItem from './todoItem.js'

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
      <TodoListFilters />
      <TodoItemCreator />

      <h2>Items</h2>
      {todoList.length > 0 ? todoList.map(todoItem => (
        <TodoItem key={todoItem.id} item={todoItem} />
      )) : <p>no items :(</p>}

      <TodoListStats />
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
      <h2>Add item</h2>
      <div className="add-item">
        <input type="text" value={inputValue} onChange={onChange} />
        <button onClick={addItem}>+</button>
      </div>
    </>
  );
}

function getId() {
  return `${Math.floor(Date.now() + Math.random())}}`;
}

export { TodoList, todoListState, todoListFilterState, todoListStatsState };
