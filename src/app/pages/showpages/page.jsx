
"use client"

import { useEffect, useState } from "react";

const ShowTask=()=>{
    const [data,setdata]=useState([])
    const apicall=async()=>{
        try {
            const apicall=await fetch("/api/Taskadd");
            const apiconvertjosn=await apicall.json()
            setdata(apiconvertjosn)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
     apicall()
    },[])
    console.log(data)
return(
    <>
    

    </>
)
}

export default ShowTask