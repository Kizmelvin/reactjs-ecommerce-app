import React, { Component } from 'react'
import formatCurrency from "../util"

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            address: "",
            showCheckout: false
        }
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name ] : e.target.value
    })
    }
    createOder = (e) =>{
        e.preventDefault();
        const order = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            cartItem : this.props.cartItem
        }
        this.props.createOder(order);
    }
    render() {
        const {cartItem} = this.props;
        return (
            <div>
                {cartItem.length === 0? <div className="cart cart-header">Cart is empty </div>
                : <div className="cart cart-header">You have {cartItem.length} item in the Cart{""}</div>
                    }

                    <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItem.map(item =>(
                                <li key={item.id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}
                                            <button className="remove-btn" 
                                            onClick={ ()=> this.props.removeCartItem(item)}>
                                            Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItem.length !== 0 && (
                        <div> 
                        <div className="cart-footer">
                        <div className="cart-total">
                           <h2>
                           Total:{" "}
                               
                            {formatCurrency(cartItem.reduce((a,c) =>a + c.price* c.count, 0)
                            )}</h2> 
                        </div>
                        <div></div>
                        <div className="footer-btn">
                            <button className="button-primary" onClick={this.props.clearCart}>Clear Cart</button>
                            <button className="button-primary" onClick={() => this.setState({
                                showCheckout: true
                            })}>Proceed</button>
                        </div>
                        </div>
                        {this.state.showCheckout && (
                            <div className="cart">
                            <form onSubmit={this.createOder}>
                            <ul className="form-container">
                            <li>
                                <label>Name</label>
                                <input type="text" 
                                name="name"
                                required 
                                onChange={this.handleInput} />
                            </li>
                            <li>
                                <label>Email</label>
                                <input type="email" 
                                name="email"
                                required 
                                onChange={this.handleInput} />
                            </li>
                            <li>
                                <label>Address</label>
                                <input typeof="text" 
                                name = "address"
                                required 
                                onChange={this.handleInput} />
                            </li>
                            <li>
                                <button type="submit" className="button-primary">
                                    Checkout
                                </button>
                            </li>
                            </ul>
                            </form>
                            </div>
                        )}
                        </div>
                    )}
                    
                    </div>
            </div>

        )
    }
}
