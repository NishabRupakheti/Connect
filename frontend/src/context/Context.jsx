import React from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("Nishab  Rupakheti");
  
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated , userName }}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => useContext(Context);
