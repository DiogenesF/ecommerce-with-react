import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Catalog from "./catalog/Catalog";
import Cart from "./cart/Cart";

import "./MainComponent.css";

function MainComponent() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [inputField, setInputField] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historico, setHistorico] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/type/10");

      let allpok = [];
      let srcpok = [];
      someFunction();
      async function someFunction() {
        for (let i = 0; i < res.data.pokemon.length; i++) {
          // o for loop so avanca quando cada promise se resolve
          const pics = await axios.get(res.data.pokemon[i].pokemon.url);
          allpok.push({
            id: Math.random() * 10000,
            name: res.data.pokemon[i].pokemon.name,
            price: Math.floor(Math.random() * 100) + 2,
            pic: pics.data.sprites.front_default
              ? pics.data.sprites.front_default
              : pics.data.sprites.front_shiny,
          });
          srcpok.push({
            id: Math.random() * 10000,
            name: res.data.pokemon[i].pokemon.name,
            price: Math.floor(Math.random() * 100) + 2,
            pic: pics.data.sprites.front_default
              ? pics.data.sprites.front_default
              : pics.data.sprites.front_shiny,
          });
          if (i === res.data.pokemon.length - 1) {
            setLoading(false);
            setSearchedPokemons(srcpok);
            setAllPokemons(allpok);
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setHistorico(JSON.parse(localStorage.getItem("compras") || "[]"));
  }, []);

  return (
    <>
      <Navbar
        allPokemons={allPokemons}
        setSearchedPokemons={setSearchedPokemons}
        inputField={inputField}
        setInputField={setInputField}
      />
      <div className="grid">
        {loading ? (
          <h4 style={{ textAlign: "center" }}>Carrgegando...</h4>
        ) : (
          <Catalog
            cartItem={cartItem}
            setCartItem={setCartItem}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            searchedPokemons={searchedPokemons}
            historico={historico}
          />
        )}
        <Cart
          cartItem={cartItem}
          setCartItem={setCartItem}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      </div>
    </>
  );
}

export default MainComponent;
