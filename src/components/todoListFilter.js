import React from 'react';
import { useRecoilState } from 'recoil';
import { todoListFilterState } from './todoList';

import { ReactComponent as FilterIcon } from '../icons/funnel.svg';

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <div className="filter">
      <select value={filter} onChange={updateFilter} aria-label="Filter tasks by completion state">
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
      <FilterIcon />
    </div>
  );
}

export default TodoListFilters;