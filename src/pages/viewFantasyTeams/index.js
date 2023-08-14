import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/NavBar'


const index = () => {
    const [fantasyTeams, setFantasyTeams] = useState()

    useEffect(()=>{
        fetch(`/api/getAllFantasyTeams`, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setFantasyTeams(data)
				// console.log(data)
			});
    },[])

  return (
	<>
	
	<NavBar/>
    <div style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
		{fantasyTeams && fantasyTeams.map((team)=>(
			<table key={team._id} style={{border: '1px solid black'}}>
			<thead>
				<tr>
					Team Name: {team.teamName}
				</tr>
				<tr>
					<th>Position</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
						{Object.keys(team.roster).map((position) =>
							Array.isArray(team.roster[position]) &&
							team.roster[position].length > 0
								? team.roster[position].map((player, index) => (
									<tr key={index}>
											<td>{player.position}</td>
											<td>{player.player}</td>
										</tr>
								  ))
								  : null
						)}
					</tbody>
		</table>
								  ))}
			</div>
		</>
  )
}

export default index