import React from 'react';
import 'components/DayListItem.scss';

import className from 'classnames';

export default function DayListItem(props) {
  function formatSpots() {
    return props.spots === 0
      ? 'no spots remaining'
      : `${props.spots} ${props.spots === 1 ? 'spot' : 'spots'} remaining`;
  }
  let dayListItemClass = className('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });
  return (
    <li className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}