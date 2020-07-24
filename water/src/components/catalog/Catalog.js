import React, { Fragment, useState } from "react";
import Interrogation from "../../images/interro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Catalog.css";

const Catalog = ({
  cartItem,
  setCartItem,
  totalPrice,
  setTotalPrice,
  searchedPokemons,
  historico,
}) => {
  const [toggle, setToggle] = useState("");

  const handleAddToCart = (item) => {
    let exist = false;

    setCartItem(
      cartItem.map((each) => {
        if (each.id === item.id) {
          let newQtdd = each.qtdd + 1;
          let updatedItem = {
            id: item.id,
            qtdd: newQtdd,
            name: item.name,
            price: item.price,
            pic: item.pic,
          };
          exist = true;
          return { ...updatedItem };
        } else {
          return each;
        }
      })
    );
    if (!exist) {
      setCartItem([
        ...cartItem,
        {
          id: item.id,
          qtdd: 1,
          name: item.name,
          price: item.price,
          pic: item.pic,
        },
      ]);
    }
    setTotalPrice(totalPrice + item.price);
  };

  const onClick = () => {
    setToggle("-active");
  };

  return (
    <section className="catalog-section">
      <h4
        onClick={() => onClick()}
        style={{
          display: "inline-block",
          marginLeft: "66%",
          marginRight: "15px",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        Minha ultima compra
      </h4>
      <div className="flex">
        {searchedPokemons.length > 0 ? (
          <Fragment>
            {searchedPokemons.map((each) => (
              <Fragment key={each.id}>
                <div className="catalog-card">
                  <img
                    alt=""
                    src={each.pic ? each.pic : Interrogation}
                    style={{ marginTop: "20px" }}
                    height="100"
                    width="120"
                  ></img>
                  <h3 style={{ margin: "0" }}>{each.name}</h3>
                  <h3 style={{ margin: "0" }}>R$ {each.price}</h3>
                  <h3
                    onClick={() => handleAddToCart(each)}
                    className="add-button"
                  >
                    <FontAwesomeIcon
                      icon="shopping-cart"
                      color="black"
                      size="1x"
                    />
                    Adicionar
                  </h3>
                </div>
              </Fragment>
            ))}
          </Fragment>
        ) : (
          "Nenhum pokemon foi encontrado! :("
        )}
      </div>
      <div className="modal-container" id={`greeting-modal${toggle}`}>
        <div className="modal" style={{ backgroundColor: "lightskyblue" }}>
          <div
            style={{
              backgroundColor: "white",
              margin: "20px",
              padding: "30px",
            }}
          >
            <h3>Ultima compra</h3>
            {historico.length > 0 ? (
              <Fragment>
                {historico.map((each) => (
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
                      id="names"
                      style={{
                        margin: "auto 30px auto 5px",
                      }}
                    >
                      {each.name}
                    </h3>

                    <h3
                      style={{
                        margin: "auto 10px auto 5px",
                      }}
                    >
                      R$ {each.price}
                    </h3>
                    <h3
                      style={{
                        margin: "auto 10px auto 5px",
                      }}
                    >
                      Qtd: {each.qtdd}
                    </h3>
                  </div>
                ))}
              </Fragment>
            ) : (
              <p>Você ainda nao realizou nenhuma compra conosco</p>
            )}
          </div>
        </div>

        <span onClick={() => setToggle("")} className="modal-bg"></span>
      </div>
    </section>
  );
};

export default Catalog;
