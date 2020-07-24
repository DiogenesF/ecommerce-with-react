import React, { memo } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filters = ({
  handleMenorPreco,
  handleMaiorPreco,
  menorPreco,
  maiorPreco,
}) => {
  return (
    <section
      style={{
        textAlign: "center",
        border: "1px solid black",
        overflow: "auto",
      }}
    >
      <h3>Filtros</h3>

      <div>
        <FontAwesomeIcon
          onClick={() => handleMenorPreco()}
          icon={menorPreco ? "check-square" : "square"}
        />

        <p
          style={{
            margin: "10px 10px",
            display: "inline-block",
          }}
        >
          Menor preço
        </p>
      </div>
      <div style={{ marginRight: "0" }}>
        <FontAwesomeIcon
          onClick={() => handleMaiorPreco()}
          icon={maiorPreco ? "check-square" : "square"}
        />

        <p
          style={{
            margin: "10px 10px",
            display: "inline-block",
          }}
        >
          Maior preço
        </p>
      </div>
    </section>
  );
};

export default memo(Filters);
