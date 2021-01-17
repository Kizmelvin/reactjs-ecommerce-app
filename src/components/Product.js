import React, { Component } from 'react';
import formatCurrency from "../util"; 

export class Product extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product =>(
                        <li key ={product.id}>
                            <div className ="product">
                                <a href={"#" + product.id}>
                                    <img src={product.image} alt = {product.title} />
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                    <div>
                                        { formatCurrency(product.price) }
                                    </div>
                                    <button onClick={ () => this.props.addToCart(product)} className="button-primary">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Product
