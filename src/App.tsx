import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { Main } from "./layout/Main";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadMemePage from "./games/components/UploadMemePage";

function App() {
  return (
    // <div className="screen">
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/upload-meme" element={<UploadMemePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
