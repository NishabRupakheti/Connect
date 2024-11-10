import React from 'react'
import { createContext, useContext , useState } from 'react'

const Context = createContext();

export const ContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [userName, setUserName] = useState("Nishab  Rupakheti")

  return (
    <Context.Provider value={{isAuthenticated,userName}} >
        {children}
    </Context.Provider>
  )
}

export const useAuth = ()=> useContext(Context)