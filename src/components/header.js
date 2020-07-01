import React from 'react'
import TodoListFilters from './todoListFilter';

const getDateInfo = () => {
  const Today = new Date();


  return {
    day: Today.toLocaleString('default', { day: 'numeric' }),
    weekday: Today.toLocaleString('default', { weekday: 'long' }),
    month: Today.toLocaleString('default', { month: 'long' }),
    year: Today.getFullYear()
  };
}

const Header = () => {
  const currentDate = getDateInfo();

  return (
    <header className="header">
      <div className="date">
        <span className="day">{currentDate.day}</span>
        <span className="month">{currentDate.month}</span>
        <span className="year">{currentDate.year}</span>
      </div>
      <TodoListFilters />
    </header>
  )
}

export default Header;

