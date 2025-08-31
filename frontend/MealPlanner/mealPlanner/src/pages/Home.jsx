import React from "react";
import { Container, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useState,useEffect } from "react";
import axios from "axios";
import MealSearch from "./MealSearch"

const Home = () => {
   const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    axios.get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,  // Important!
      },
    })
    .then((res) => {
      setProfile(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);
  return (
    <>
    
      <Navbar />
      <Container sx={{ marginTop: 4 }}>
      </Container>
      <div>
      <h1></h1>
      <MealSearch /> 
    </div>
    
      
    </>
   
  );
};

export default Home;