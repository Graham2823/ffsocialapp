import React from 'react'


const NavBar = () => {
  return (
    <nav style={{width:'100%', backgroundColor:'red', height:'45px', display: 'flex', flexDirection:'row', alignItems: 'flex-end'}}>
        <ul style={{display:'flex', flexDirection:'row', margin:0}}>
            <li style={{ marginRight:"20px", listStyleType:"none"}}>
                <a href='/createTeam'>Add Fantasy Team</a>
            </li>
            <li style={{ marginRight:"20px", listStyleType:"none"}}>
                <a href='/viewFantasyTeams'>View Fantasy Team</a>
            </li>
        </ul>
        <h1 style={{marginRight: '0px'}}>Fantasy Football Social</h1>
    </nav>
  )
}

export default NavBar