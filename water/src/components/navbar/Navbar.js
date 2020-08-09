import React, { memo } from "react";
import Water from "../../images/agua.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Navbar.css";

const Navbar = ({
  allPokemons,
  setSearchedPokemons,
  inputField,
  setInputField,
  tggButton,
  setTggButton,
}) => {
  const onChange = (e) => {
    setInputField(e.target.value);
    const filteredPokemons = allPokemons.filter((each) =>
      each.name.includes(e.target.value)
    );

    setSearchedPokemons(filteredPokemons);
  };

  const onClick = (e) => {
    setTggButton(tggButton.length > 0 ? "" : "-active");
  };

  return (
    <div>
      <nav className="navbar">
        <img id="image" alt="Logo" src={Water} width="60px" height="60px"></img>

        <h1 className="brand">Pokeshop</h1>

        <div className="form-wrapper">
          <form style={{ margin: "auto 0px auto 5vw" }}>
            <input
              value={inputField}
              onChange={(e) => onChange(e)}
              placeholder="Pesquisar por nome..."
            ></input>
          </form>
        </div>
        <button
          onClick={() => onClick()}
          id="tgg-button"
          style={{
            margin: "auto 10px auto 2vw",
            border: "none",
            padding: "0px",
            backgroundColor: "lightskyblue",
          }}
        >
          <FontAwesomeIcon icon="bars" color="black" size="2x" />
        </button>
      </nav>
    </div>
  );
};

export default memo(Navbar);
