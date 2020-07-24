import React from "react";
import Fire from "../../images/fogo.png";

import "./Navbar.css";

const Navbar = ({
  allPokemons,
  setSearchedPokemons,
  inputField,
  setInputField,
}) => {
  const onChange = (e) => {
    setInputField(e.target.value);
    const filteredPokemons = allPokemons.filter((each) =>
      each.name.includes(e.target.value)
    );
    setSearchedPokemons(filteredPokemons);
  };

  return (
    <div>
      <nav className="navbar">
        <img
          alt="Logo"
          style={{ margin: "auto 0px auto 10vw" }}
          src={Fire}
          width="60px"
          height="60px"
        ></img>

        <h1 className="brand">Pokeshop</h1>

        <div className="form-wrapper">
          <form style={{ margin: "auto 0px auto 5vw" }}>
            <input
              value={inputField}
              onChange={(e) => onChange(e)}
              placeholder="Digite o nome do pokemon que procura..."
            ></input>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
