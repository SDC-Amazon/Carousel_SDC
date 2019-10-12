import React from 'react';
import Style from '../App.css';

const Item = (props) => {
  return (
    <div className={Style.itemContainer}>
      <img src={props.item.image}></img>
      <p>{props.item.name}</p>
      <p className={Style.test}>Rating: {props.item.rating}</p>
      <p>${props.item.price}</p>
    </div>
  )
}

export default Item;