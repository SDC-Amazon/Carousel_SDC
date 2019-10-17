import React from 'react';

const Item = (props) => {
  let ratings = [];

  for (let i = 0; i < 5; i++) {
    if (i <= props.item.rating) {
      ratings.push(<span className="fa fa-star checked"></span>);
    } else {
      ratings.push(<span className="fa fa-star-o checked"></span>);
    }
  }

  if (!props.item.prime) {
    return (
      <div className="item">
        <img className="imgs" src={props.item.image}></img>
        <div className="nameContainer">
          <p className="names">{props.item.name}</p>
        </div>
        <p className="rating">{ratings}</p>
        <div className="priceContainer">
          <p className="price">${props.item.price}</p>
            <img className="primeLogo"
              src="https://amishon.s3.us-east-2.amazonaws.com/PicturesForFEC/Amazon-Prime-Logo.png">
            </img>
        </div>
      </div>
    )
  } else {
    return (
      <div className="item">
        <img className="imgs" src={props.item.image}></img>
        <p className="names">{props.item.name}</p>
        <p className="rating">{ratings}</p>
        <div className="priceContainer">
          <p className="price">${props.item.price}</p>
        </div>
      </div>
    )
  }
}

export default Item;