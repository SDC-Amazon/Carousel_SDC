import React from 'react';
import axios from 'axios';

class ImageViewer extends React.Component {
  constructor () {
    super()
    this.state = {
      currentProduct: 1
    }
  }

  componentDidMount () {
    axios.get('/images')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

export default ImageViewer;