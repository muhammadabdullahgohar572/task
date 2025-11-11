"use client";
import { createContext, useEffect, useState } from "react";

export const contextcode = createContext();

const Contextprodier = ({ children }) => {
  const [UserData, setuser] = useState(null);
  useEffect(() => {
    apicall();
  }, []);

  const apicall = async () => {
    try {
      const apiurl = await fetch("/api/cureent");
      const convert = await apiurl.json();
      if (convert?.user) {
        setuser(convert);
      } else {
        setuser(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <contextcode.Provider value={{ UserData, setuser }}>
      {children}
    </contextcode.Provider>
  );
};

export default Contextprodier;
