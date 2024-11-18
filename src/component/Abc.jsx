import React,{useEffect, useState} from 'react'

function Abc() {
    let printHandler=()=>{console.log('how are you')}
    let [no,setNo]=useState(0)
    useEffect(()=>{
        console.log('1')
      window.addEventListener('scroll',printHandler)
      return ()=>{
        window.removeEventListener('scroll',printHandler)
        console.log('2')
      }
    },[no])
  return (
    <div style={{height:"1000px"}}>Abc
       <button onClick={()=>{
        setNo(pre=>pre+1)
       }}>{no}</button>
    </div>
  )
}

export default Abc