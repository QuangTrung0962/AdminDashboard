import React, { useState, createContext } from 'react'
export const ContextFunction = createContext()

const ContextProvider = ({ children }) => {
  const [fillter, setFillter] = useState([]);
  const [test, setTest] = useState("");

  return (
    <ContextFunction.Provider value={{ fillter, setFillter, test, setTest }}>
      {children}
    </ContextFunction.Provider>
  )
}

export default ContextProvider
