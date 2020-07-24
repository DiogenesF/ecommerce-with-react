import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Catalog from "./catalog/Catalog";
import Filters from "./filters/Filters";
import Cart from "./cart/Cart";

import "./MainComponent.css";

function MainComponent() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [inputField, setInputField] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tggButton, setTggButton] = useState("");
  const [menorPreco, setMenorPreco] = useState(false);
  const [maiorPreco, setMaiorPreco] = useState(false);

  const handleMenorPreco = () => {
    if (maiorPreco) {
      setMaiorPreco(!maiorPreco);
      setMenorPreco(!menorPreco);
    } else {
      setMenorPreco(!menorPreco);
    }
    const cheaper = searchedPokemons.sort(function (a, b) {
      return a.price > b.price ? 1 : b.price > a.price ? -1 : 0;
    });
    setSearchedPokemons(cheaper);
  };

  const handleMaiorPreco = () => {
    if (menorPreco) {
      setMenorPreco(!menorPreco);
      setMaiorPreco(!maiorPreco);
    } else {
      setMaiorPreco(!maiorPreco);
    }
    const expensive = searchedPokemons.sort(function (a, b) {
      return a.price < b.price ? 1 : b.price < a.price ? -1 : 0;
    });
    setSearchedPokemons(expensive);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/type/11");

      let allpok = [];
      let srcpok = [];
      someFunction();
      async function someFunction() {
        for (let i = 0; i < res.data.pokemon.length; i++) {
          // o for loop so avanca quando a promise se resolve
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
        tggButton={tggButton}
        setTggButton={setTggButton}
      />
      <div className={`grid${tggButton}`}>
        <Filters
          handleMenorPreco={handleMenorPreco}
          handleMaiorPreco={handleMaiorPreco}
          menorPreco={menorPreco}
          maiorPreco={maiorPreco}
        />
        {loading ? (
          <h4 style={{ textAlign: "center" }}>Carregando...</h4>
        ) : (
          <Catalog
            cartItem={cartItem}
            setCartItem={setCartItem}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
            searchedPokemons={searchedPokemons}
            setSearchedPokemons={setSearchedPokemons}
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
