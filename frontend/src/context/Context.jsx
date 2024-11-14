import React from "react";
import { createContext, useContext, useState } from "react";
import axios from 'axios'

const Context = createContext();

const getFunction = async() => {
  const token = localStorage.getItem('secretToken')
  try {
    const response = await axios.get("http://localhost:3000/api/",{
      headers:{
        Authorization : `Bearer ${token}` 
      }
    })
   console.log(response)
  } catch (err) {
    console.log("Failed to fetch the data", err)
  }
};

export const ContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Nishab  Rupakheti");
  
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated ,userName , getFunction }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
