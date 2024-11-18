import React, { useEffect, useState } from 'react'
import { api } from '../utilitis/Api'
function Post() {
    let [data,setData]=useState([])
    let [loading,setLoding]=useState(false)
    let [error,setError]=useState(false)
async function fetchHandler(){
    try{
        setLoding(true)
        let response= await  api.get('/posts')
        setData(response.data)
        setLoding(false)
    }
    catch(err)
    {
         setError(err)
         setLoding(false)
    }
}

useEffect(()=>{
    fetchHandler()
},[])
 if(loading) return <h1>LOADING......</h1>
 if(error) return <h1>{error.message}</h1>
  return (
        <div className="container">
            <div className="row d-flex" >
                   {data?.map((item)=>{
                    return     <div className="col" style={{minWidth:"100%",minHeight:"55px",border:"1px solid black"}} >
                    <h1>{item?.title}</h1>
                                 </div>
                   })}
             
            </div>
        </div>
  )
}

export default Post