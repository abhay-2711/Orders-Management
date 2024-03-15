import React from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateOrder from "./components/CreateOrder/CreateOrder";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createorder" element={<CreateOrder />} />
      </Routes>
    </div>
  );
}

export default App;
