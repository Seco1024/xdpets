// UidContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const UidContext = createContext();

export const UidProvider = ({ children }) => {
  const [uid, setUidState] = useState(null);

  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      setUidState(storedUid);
    }
  }, []);

  const setUid = (uid) => {
    setUidState(uid);
    if (uid) {
      localStorage.setItem("uid", uid);
    } else {
      localStorage.removeItem("uid");
    }
  };

  const logout = () => {
    setUid(null);
    localStorage.removeItem("uid");
  };

  return (
    <UidContext.Provider value={{ uid, setUid, logout }}>
      {children}
    </UidContext.Provider>
  );
};

export const useUid = () => useContext(UidContext);
