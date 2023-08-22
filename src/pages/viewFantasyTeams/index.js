import React, { useState, useEffect } from 'react'
import NavBar from '../../components/navbar/NavBar'
import { Button, Container, Table} from 'react-bootstrap'
import Link from 'next/link'




const index = () => {
    const [fantasyTeams, setFantasyTeams] = useState()
	const [teamDeleted, setTeamDeleted] = useState(false)

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
    },[teamDeleted])

	const handleDelete = (id)=>{
		setTeamDeleted(true)
		fetch(`/api/deleteFantasyTeam?teamID=${id}`,{
			method:'DELETE',
			headers: { Accept: 'application/json' },
		})
		.then((res) => res.json())
    .then((data) => {
      // Handle the response data if needed
      console.log("Team deleted:", data);
      setTeamDeleted(false);
    })
		.catch((error) => {
			console.error('Error deleting team:', error);
			// Handle the error if needed
			setTeamDeleted(false);
		  });	
	}


  return (
	<>
	
	<NavBar/>
    <Container style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
		{fantasyTeams && fantasyTeams.map((team)=>(
			<Table key={team._id} striped bordered hover size='sm' style={{width:'350px'}}>
			<thead>
				<tr>
					<td>
					Team Name: {team.teamName}
					</td>
					<td>
						<Button variant='primary'>
							<Link href={`/viewFantasyTeams/editTeam?id=${team._id}`} as={`/viewFantasyTeams/editTeam?id=${team._id}`}>
							Edit
							</Link></Button>
						<Button variant='danger' onClick={()=>handleDelete(team._id)} >Delete</Button>
					</td>
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
		</Table>
								  ))}
			</Container>
		</>
  )
}

export default index