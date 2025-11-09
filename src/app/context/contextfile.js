"use client";
import { createContext, useEffect, useState } from "react";

export const contextcode = createContext();

const Contextprodier = ({ children }) => {
  const [UserData, setuser] = useState();

  const apicall = async () => {
    try {
      const apiurl = await fetch("/api/cureent");
      const convert = await apiurl.json();
      setuser(convert);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    apicall();
  }, []);
  return <contextcode.Provider value={UserData}>{children}</contextcode.Provider>;
};

export default Contextprodier;
