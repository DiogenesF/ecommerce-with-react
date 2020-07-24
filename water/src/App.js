import React from "react";
import MainComponent from "./components/MainComponent";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faChevronDown,
  faShoppingCart,
  faBars,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  library.add(
    faTrashAlt,
    faChevronDown,
    faShoppingCart,
    faBars,
    faCheckSquare,
    faSquare
  );
  return (
    <>
      <MainComponent />
    </>
  );
}

export default App;
