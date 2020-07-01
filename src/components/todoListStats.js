import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoListStatsState } from './todoList';

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <>
      <h2>Stats</h2>
      <ul className="stats">
        <li>Total Chores: {totalNum}</li>
        <li>Chores completed: {totalCompletedNum}</li>
        <li>Chores not completed: {totalUncompletedNum}</li>
        <li>Percent completed: {formattedPercentCompleted}%</li>
      </ul>
    </>
  );
}

export default TodoListStats;