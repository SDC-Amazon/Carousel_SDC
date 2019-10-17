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
    }
    this.get = this.get.bind(this);
    this.pageRight = this.pageRight.bind(this);
    this.pageLeft = this.pageLeft.bind(this);
  }

  componentDidMount() {
    this.get()
    document.currentProduct = 1;
  }

  get () {
    axios.get('/carousel')
      .then((res) => {
        this.setState({
          data: res.data
        })
        console.log(res.data)
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
                <Item key={product.id} item={product} />
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