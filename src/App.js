import React, {Component} from 'react'
import Product from './components/Product';
import data from "./data.json"

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.product,
      size: "",
      sort: ""
    }
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href = "./">
          Blinkz Fashion
          </a>
        </header>
        <main>
         <div className="content">
           <div className= "main">
             <Product products={this.state.products} />
           </div>
           <div className="sidebar">Cart Items</div>
         </div>
        </main>
        <footer>
          All rights is reserved
        </footer>
      </div>
    )
  }
 
}

export default App
