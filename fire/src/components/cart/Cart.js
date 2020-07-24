import React, { Fragment, useState } from "react";
import Interrogation from "../../images/interro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Cart.css";

const Cart = ({ cartItem, setCartItem, totalPrice, setTotalPrice }) => {
  const [toggle, setToggle] = useState("");

  const removeFromCart = (itemToRemove) => {
    if (itemToRemove.qtdd === 1) {
      const newCart = cartItem.filter((each) => each.id !== itemToRemove.id);
      setCartItem(newCart);
    } else {
      setCartItem(
        cartItem.map((each) => {
          if (each.id === itemToRemove.id) {
            let newQtdd = each.qtdd - 1;
            let updatedItem = {
              id: itemToRemove.id,
              qtdd: newQtdd,
              name: itemToRemove.name,
              price: itemToRemove.price,
              pic: itemToRemove.pic,
            };
            return { ...updatedItem };
          } else {
            return each;
          }
        })
      );
    }
    setTotalPrice(totalPrice - itemToRemove.price);
  };

  const closeModal = () => {
    setCartItem([]);
    setTotalPrice(0);
    setToggle("");
  };

  const onClick = () => {
    if (cartItem.length > 0) {
      setToggle("-active");
      localStorage.setItem("compras", JSON.stringify(cartItem));
    } else {
      alert("Voce precisar ter pelo menos um item adicionado ao carrinho");
    }
  };

  return (
    <section className="cart-section">
      <h1 className="title">Carrinho</h1>
      <div className="flex-wrapper">
        {cartItem.length > 0 ? (
          <Fragment>
            {cartItem.map((each) => (
              <div key={each.name} className="cart-items">
                <img
                  style={{
                    margin: "auto 0px auto 5px",
                  }}
                  alt={each.name}
                  src={each.pic ? each.pic : Interrogation}
                  height="55px"
                  width="55px"
                ></img>
                <h3
                  className="names"
                  style={{
                    margin: "auto 0px auto 5px",
                  }}
                >
                  {each.name}
                </h3>

                <h3 id="price">R$ {each.price}</h3>
                <h3 id="qtdd">Qtd: {each.qtdd}</h3>

                <p
                  onClick={() => removeFromCart(each)}
                  style={{
                    margin: "auto 10px auto 0",
                    cursor: "pointer",
                  }}
                >
                  {each.qtdd === 1 ? (
                    <FontAwesomeIcon icon="trash-alt" color="red" />
                  ) : (
                    <FontAwesomeIcon icon="chevron-down" />
                  )}
                </p>
              </div>
            ))}
          </Fragment>
        ) : (
          <h3 style={{ textAlign: "center" }}>Carrinho vazio</h3>
        )}
      </div>

      <div className="bottom-fixed">
        <div className="total-price">
          <h3 style={{ margin: "0px 0px 0px 10px" }}>Total:</h3>
          <h3 style={{ margin: "0px 15px 0px 0px" }}>R$ {totalPrice}</h3>
        </div>
        <button onClick={() => onClick()} className="buy-button">
          Finalizar
        </button>
      </div>
      <div className="modal-container" id={`greeting-modal${toggle}`}>
        <div className="modal" style={{ backgroundColor: "red" }}>
          <div
            style={{
              backgroundColor: "white",
              margin: "20px",
              padding: "50px",
            }}
          >
            <h3>Obrigado!!</h3>
            <p>
              Você receberá R$ {Number(totalPrice * 0.1).toFixed(2)} de
              cashback!
            </p>
          </div>
        </div>

        <span onClick={() => closeModal()} className="modal-bg"></span>
      </div>
    </section>
  );
};

export default Cart;
