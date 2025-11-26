import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Favorites from "./pages/Favorites";
import WeeklyMealPlanner from "./pages/WeeklyMealPlanner";

import ProtectedRoute from "./components/ProtectedRoute"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/weekly" element={<WeeklyMealPlanner />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
