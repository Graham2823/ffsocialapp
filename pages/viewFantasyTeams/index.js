import React, { useState, useEffect } from 'react'



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
    },[fantasyTeams])

  return (
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
				<tr>
					<td>QB</td>
					<td>{team.roster.QB}</td>
				</tr>
				<tr>
					<td>RB</td>
					<td>{team.roster.RB1}</td>
				</tr>
				<tr>
					<td>RB</td>
					<td>{team.roster.RB2}</td>
				</tr>
				<tr>
					<td>WR</td>
					<td>{team.roster.WR1}</td>
				</tr>
				<tr>
					<td>WR</td>
					<td>{team.roster.WR2}</td>
				</tr>
				<tr>
					<td>Flex</td>
					<td>{team.roster.Flex}</td>
				</tr>
				<tr>
					<td>TE</td>
					<td>{team.roster.TE}</td>
				</tr>
							{team.roster.bench.map((player, index)=>(
						<tr key={index}>
							<td>Bench</td>
							<td>{player}</td>
						</tr>
							))}
			</tbody>
		</table>
		))}
			</div>
  )
}

export default index