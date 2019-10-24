import React from 'react';

const Item = (props) => {
  let ratings = [];

  for (let i = 0; i < 5; i++) {
    if (i < props.item.rating) {
      if (props.item.rating - i === 0.5) {
        ratings.push(<i className="fa fa-star-half-o" aria-hidden="true"></i>);
      } else {
        ratings.push(<span className="fa fa-star checked"></span>);
      }
    } else {
      ratings.push(<span className="fa fa-star-o checked"></span>);
    }
  }

    return (
      <div className="item">
        <div onClick={props.select} className="imgContainer">
          <img title={props.id} className="imgs" src={props.item.image[0]}></img>
        </div>
        <div onClick={props.select} className="nameContainer">
          <p title={props.id} className="names">{props.item.name}</p>
        </div>
        <p className="rating">{ratings}</p>
        <div className="priceContainer">
          <p className="price">${props.item.price}</p>
            { props.item.prime &&
            <img className="primeLogo"
              src="https://amishon.s3.us-east-2.amazonaws.com/PicturesForFEC/Amazon-Prime-Logo.png">
            </img>
            }
        </div>
      </div>
    )
}

export default Item;