/*eslint-disable */
import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInMain from "./pages/SignInMain";
import SignInQuestions from "./pages/SignInQuestions";
import SignInRegister from "./pages/SignInRegister";
import MainBoard from "./pages/MainBoard";
import PersonalPage from "./pages/PersonalPage";
import PostingPage from "./pages/PostingPage";
import Myinfo from "./pages/Myinfo";
import ProfileEdit from "./pages/ProfileEdit";
import SignOutEdit from "./pages/SignOutEdit";
import Inbox from "./pages/Inbox";
import Chatting from "./pages/Chatting";
import MyDashBoard from './pages/MyDashBoard';
import Nearby from './pages/Nearby';
import "firebase/firestore";



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<SignInMain></SignInMain>}></Route>
        <Route
          path='/signinquestions'
          element={<SignInQuestions></SignInQuestions>}
        ></Route>
        <Route
          path='/signinregister'
          element={<SignInRegister></SignInRegister>}
        ></Route>
        <Route path='/mainboard' element={<MainBoard></MainBoard>}></Route>
        <Route path='/nearby' element={<Nearby></Nearby>}></Route>
        <Route
          path='/mydashboard'
          element={<MyDashBoard></MyDashBoard>}
        ></Route>
        <Route
          path='/personalpage'
          element={<PersonalPage></PersonalPage>}
        ></Route>
        <Route
          path='/postingpage'
          element={<PostingPage></PostingPage>}
        ></Route>
        <Route path='/myinfo' element={<Myinfo></Myinfo>}></Route>
        <Route
          path='/profileedit'
          element={<ProfileEdit></ProfileEdit>}
        ></Route>
        <Route
          path='/signoutedit'
          element={<SignOutEdit></SignOutEdit>}
        ></Route>
        <Route path='/inbox' element={<Inbox></Inbox>}></Route>
        <Route path='/chatting' element={<Chatting></Chatting>}></Route>
        
      </Routes>

    </>
  );
}

export default App;
