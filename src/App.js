/*eslint-disable */
import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import SignInMain from "./pages/SignInMain";
import SignInQuestions from "./pages/SignInQuestions";
import SignInRegister from './pages/SignInRegister';
import Loading from './pages/Loading';

function App() {
  return (
    <>
      {/* <SignInMain></SignInMain> */}
      {/* <SignInQuestions></SignInQuestions> */}
      {/* <SignInRegister></SignInRegister> */}
      <Loading></Loading>
    </>
  );
}

export default App;
