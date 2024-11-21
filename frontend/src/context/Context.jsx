import React from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("secretToken");
  const [status, setStatus] = useState("");
  
  function removeStatus() {
    setTimeout(() => {
      setStatus("");
    }, 3000);
  }

  
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated , userName , posts , setPosts , setUserName , token , status , setStatus , removeStatus }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
