import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import shortid from "shortid";
// import fx from './logo/fx2.png'

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      phone: "",
      showCheckout: false,
      loading: false,
    };
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  createOder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItem: this.props.cartItem,
    };
    this.props.createOder(order);
  };

  standardPay = () => {
    this.setState({
      loading: true,
    });
    const cartItem = this.props.cartItem;
    const body = {
      tx_ref: shortid.generate(),

      amount: cartItem.reduce((a, c) => a + c.price * c.count, 0),
      currency: "NGN",
      redirect_url: "https://react-profile-page.herokuapp.com/",
      payment_options: "card",
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: this.state.email,
        phonenumber: this.state.phone,
        name: this.state.name,
      },
      customizations: {
        title: "Blinkz Fashion Payments",
        description: "It isn't free. Pay the price",
        logo: "https://assets.piedpiper.com/logo.png",
      },
    };
    fetch("https://hostedpay.glitch.me/pay", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.href = data.data.link;
        this.setState({
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { cartItem } = this.props;
    const loading = this.state.loading;
    return (
      <div>
        {cartItem.length === 0 ? (
          <div className="cart cart-header">Cart is empty </div>
        ) : (
          <div className="cart cart-header">
            {cartItem.length} item(s) in the Cart{""}
          </div>
        )}

        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItem.map((item) => (
                  <li key={item.id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}
                        <button
                          className="remove-btn"
                          onClick={() => this.props.removeCartItem(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItem.length !== 0 && (
            <div>
              <div className="cart-footer">
                <div className="cart-total">
                  <h2>
                    Total:{" "}
                    {formatCurrency(
                      cartItem.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </h2>
                </div>
                <div></div>
                <div className="footer-btn">
                  <button
                    className="button-primary"
                    onClick={this.props.clearCart}
                  >
                    Clear Cart
                  </button>
                  <button
                    className="button-primary"
                    onClick={() =>
                      this.setState({
                        showCheckout: true,
                      })
                    }
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form>
                      {loading && (
                        <div>
                          {/* <img src={fx} alt=""/> */}
                          loading...
                        </div>
                      )}

                      <ul className="form-container">
                        <li>
                          <label>Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Phone</label>
                          <input
                            type="number"
                            name="phone"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            typeof="text"
                            name="address"
                            required
                            onChange={this.handleInput}
                          />
                        </li>
                        <li>
                          <button
                            onClick={this.standardPay}
                            className="button-primary"
                            disabled={loading}
                          >
                            Pay Now
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
