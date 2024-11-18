import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getSinglePostHandler } from '../utilitis/Api'

function Details() {

    let {id}=useParams()
  let {data,error,isLoading}=  useQuery({
          queryKey:['post',id],
          queryFn:()=> { return getSinglePostHandler(id)}
    })
    if(isLoading){return <h1>loading.....</h1>}
    if(error) {return <h1>error: {error.message}</h1>}
  return (
    <div style={{height:"135px",width:"100%",border:"1px solid black"}}>
              <h1>{data.title}</h1>
                 <NavLink to={'/post-rq'}>goBack</NavLink>
        </div>
  )
}

export default Details