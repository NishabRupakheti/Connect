import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [eyestate, setEyeState] = useState(false);
  
  const token = localStorage.getItem("secretToken");

  useEffect(()=>{
    if(token){
      setIsAuthenticated(true);
    }
  },[token])

  const toggleEye = () => {
    setEyeState(!eyestate);
  };

  function removeStatus() {
    setTimeout(() => {
      setStatus("");
    }, 3000);
  }

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userName,
        posts,
        setPosts,
        setUserName,
        token,
        status,
        setStatus,
        removeStatus,
        eyestate,
        toggleEye,
        setEyeState,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
