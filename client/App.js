import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Item from './Components/Item';

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      currentPage: 6,
      currentProduct: 26
    }
    this.get = this.get.bind(this);
    this.pageRight = this.pageRight.bind(this);
    this.pageLeft = this.pageLeft.bind(this);
    this.productSelect = this.productSelect.bind(this);
  }

  componentDidMount() {
    this.get()
  }

  get () {
    let data = {
      params: {
        id: this.state.currentProduct
      }
    }
    axios.get('/carousel', data)
      .then((res) => {
        console.log(res.data)
        this.setState({
          data: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  pageRight() {
    if(this.state.currentPage + 6 < this.state.data.length + 6) {
      this.setState({
        currentPage: this.state.currentPage+6
      })
    }
  }

  pageLeft() {
    if (this.state.currentPage > 6) {
      this.setState({
        currentPage: this.state.currentPage-6
      })
    }
  }

  productSelect(event) {
    let id = Number(event.target.title)
    document.productID = id
    this.setState({
      currentProduct: id
    })
  }

  render() {
    return (
      <div className="parentContainer">
        <div className="btnContainer">
          <button onClick={this.pageLeft} className="nav-btn left"> <i className="fa fa-angle-left" aria-hidden="true"></i> </button>
        </div>
        <div className="itemContainer">
          {this.state.data.map((product, i) => {
            if (i < this.state.currentPage && i >= this.state.currentPage - 6) {
              return (
                <Item key={product.id} id={product.id} select={this.productSelect} item={product} />
              )
            }
          })}
        </div>
        <div className="btnContainer">
          <button onClick={this.pageRight} className="nav-btn right"> <i className="fa fa-angle-right" aria-hidden="true"></i> </button>
        </div>
        <hr></hr>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('Carousel'));