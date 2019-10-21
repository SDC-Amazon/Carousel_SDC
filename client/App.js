import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ImageViewer from './Components/ImageViewer'
import Item from './Components/Item';

const screenCheck = () => {
  const page = window.innerWidth;
  const container = page * 0.73;
  const itemsNumber = container / 160;
  return Math.ceil(itemsNumber);
}

const itemsNumber = screenCheck();


const updateProduct = (product) => {
  const event = new CustomEvent('updateProduct', {
    detail: product
  });
  window.dispatchEvent(event)
}



class Carousel extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      currentPage: itemsNumber,
      currentProduct: 26
    }
    this.get = this.get.bind(this);
    this.pageRight = this.pageRight.bind(this);
    this.pageLeft = this.pageLeft.bind(this);
    this.productSelect = this.productSelect.bind(this);
    this.screenChange = this.screenChange.bind(this);
  }

  componentDidMount() {
    this.get()
  }

  componentDidUpdate(prevProps, prevState) {

  }

  screenChange() {
    console.log('changed')
    this.setState({
      currentPage: screenCheck
    })
  }

  get () {
    let data = {
      params: {
        id: this.state.currentProduct
      }
    }
    axios.get('/carousel', data)
      .then((res) => {
        //console.log(res.data)
        this.setState({
          data: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  pageRight() {
    if(this.state.currentPage + itemsNumber < this.state.data.length + itemsNumber) {
      this.setState({
        currentPage: this.state.currentPage + itemsNumber
      })
    }
  }

  pageLeft() {
    if (this.state.currentPage > itemsNumber) {
      this.setState({
        currentPage: this.state.currentPage-itemsNumber
      })
    }
  }

  productSelect(event) {
    let id = Number(event.target.title)
    // document.productID = id
    // this.setState({
    //   currentProduct: id
    // })
    updateProduct(id);
  }

  render() {
    return (
      <div className="parentContainer">
        <div className="btnContainer">
          <button onClick={this.pageLeft} className="nav-btn left"> <i className="fa fa-angle-left" aria-hidden="true"></i> </button>
        </div>
        <div className="itemContainer">
          {this.state.data.map((product, i) => {
            if (i < this.state.currentPage && i >= this.state.currentPage - itemsNumber) {
              return (
                <Item key={product.id} id={product.id} select={this.productSelect} item={product} />
              )
            }
          })}
        </div>
        <div className="btnContainer">
          <button onClick={this.pageRight} className="nav-btn right"> <i className="fa fa-angle-right" aria-hidden="true"></i> </button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Carousel />, document.getElementById('Carousel'));
ReactDOM.render(<ImageViewer />, document.getElementById('imageGallery'));