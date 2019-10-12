import React from 'react';
import axios from 'axios';
import Item from './Components/Item';
import Style from './App.css';

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      data: [],
      title: []
    }
    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get()
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

  render() {
    return (
      <div>
        {this.state.data.map(product => {
          return (
            <Item key={product.id} item={product} />
          )
        })}
      </div>
    )
  }
}

export default App;