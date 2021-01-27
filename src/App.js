import React, {Component} from 'react'
import Filter from './components/Filter';
import Product from './components/Product';
import data from "./data.json"
import Cart from "./components/Cart"

class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.product,
      size: "",
      cartItem: localStorage.getItem("cartItem") 
      ? JSON.parse(localStorage.getItem("cartItem")) 
      : [],
      sort: ""
    }
  }
  createOder = (order) => {
    alert("Need to be saved for " + order.name)
  }
  handleSort = (event) => {
    console.log(event.target.value);
    // const sort = event.target.value;
    // this.setState((state) => ({
    //   sort:sort,
    //   products:this.state.products
    //   .slice()
    //   .sort((a, b) =>
    //      sort === "lowest"
    //       ? a.price > b.price
    //       ? 1
    //       : -1
    //       : sort === "highest"
    //       ? a.price < b.price
    //       ? 1
    //       : -1
    //       : sort ==="" 
    //       ? a_id > b.id
    //       ? 1
    //       : -1
        
    //   )
      
    // }))
    
  }
  handleSize = (event) =>{
    console.log(event.target.value);
    if(event.target.value=== ""){
      this.setState({
        products:data.product,
        size: ""
      })
      }else{
        this.setState({
          size: event.target.value,
          products: data.product.filter((product) =>product.sizes.indexOf(event.target.value) >=0),
        });
    }
  }
  removeCartItem = (product) =>{
    const cartItem = this.state.cartItem.slice();
    this.setState({
      cartItem: cartItem.filter((x) =>x.id !== product.id),
    })
    localStorage.setItem("cartItem", JSON.stringify(cartItem.filter((x) =>x.id !== product.id)))
  }
  cleaCart = () =>{
    // const cartItem = this.state.cartItem.slice();
    this.setState({
      cartItem: []})
  }
  addToCart = (product) =>{
    const cartItem = this.state.cartItem.slice();
    let alreadyInCart = false;
    cartItem.forEach((item) =>{
      if(item.id === product.id){
        item.count ++;
        alreadyInCart = true
      }
    });
    if(!alreadyInCart){
      cartItem.push({...product, count: 1});
    }
    this.setState({cartItem})
    localStorage.setItem("cartItem", JSON.stringify(cartItem))
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
             <Filter count ={this.state.products.length}
             size={this.state.size} sort={this.state.sort} 
             handleSort={this.handleSort}
             handleSize={this.handleSize}/>
             <Product addToCart={this.addToCart} products={this.state.products} />
           </div>
           <div className="sidebar">
             <Cart 
             createOder ={this.createOder}
             cartItem ={this.state.cartItem}
             removeCartItem={this.removeCartItem}
             clearCart={this.cleaCart} />
           </div>
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
