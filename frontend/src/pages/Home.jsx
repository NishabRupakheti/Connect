import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Context";

const Home = () => {  

  const {getFunction} = useAuth();

  useEffect(()=>{
    getFunction()
  },[])

  return (
    <>
      <div>THis is home</div>
    </>
  );
};

export default Home;
