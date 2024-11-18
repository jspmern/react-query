import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
     <div className="container">
        <ul style={{display:"flex",gap:"12px"}}> 
           <NavLink to={"/"} >Home</NavLink>
           <NavLink to="/user">user</NavLink>
           <NavLink to="/post">Post without rq</NavLink>
           <NavLink to="/post-rq">Post with rq</NavLink>

        </ul>
     </div>
  )
}

export default Header