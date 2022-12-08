import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Landing, Auth, Home, Editor } from "./pages";
import Navbar from "./components/common/Navbar";
import RingSpinner from "./components/spinners/RingSpinner";

import { useAuth } from "./hooks/useAuth";
import { myAuth } from "./states";

const App = () => {
  const loading = useAuth();
  // const loading = false;
  const isAuth = myAuth((state) => state.auth.isAuth);
  const auth = myAuth((state) => state.auth.user);

  if (loading) {
    console.log('anubhav',loading)
    return (
      <div className="bg-black text-white h-screen w-screen flex items-center flex-col">
        <div className="w-full">
          <Navbar showLogin={false} />
        </div>
        <RingSpinner />
        <p className="text-xl font-semibold -mt-5">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            !isAuth ? (
              <Landing />
            ) : (
              <Navigate to={`/${auth?.email?.split("@")[0]}`} />
            )
          }
        />
        <Route
          path="/auth"
          element={
            !isAuth ? (
              <Auth />
            ) : (
              <Navigate to={`/${auth?.email?.split("@")[0]}`} />
            )
          }
        />
        <Route path="/editor" element={<Editor />} />
        <Route path="/:username" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
