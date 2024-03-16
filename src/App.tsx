import React, { useState } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateOrder from "./components/CreateOrder/CreateOrder";

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (searchTerm: string) => {
    console.log("Search Term:", searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <Header handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/createorder" element={<CreateOrder />} />
        <Route path="/updateorder/:id" element={<CreateOrder />} />
      </Routes>
    </div>
  );
}

export default App;
