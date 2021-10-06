import React from "react";

export default function DayListItem(props) {
  const { name, spots, selected } = props

  return (
    <li selected={props.selected} setDay={props.onClick}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots} spots remaining</h3>
    </li>
  )
}