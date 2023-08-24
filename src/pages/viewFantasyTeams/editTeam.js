import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavBar from '../../components/navbar/NavBar'
import CreateFantasyTeam from '../../components/createFantasyTeam/createFantasyTeam'
import { Button, Container, Table} from 'react-bootstrap'

const editTeam = () => {
    const [teamToEdit, setTeamToEdit] = useState()
    const [playerToAdd, setPlayerToAdd] = useState()
    const router = useRouter()
    const {id} = router.query
	

    useEffect(()=>{
        fetch(`/api/editFantasyTeam?teamID=${id}`,{
			method:'GET',
			headers: { Accept: 'application/json' },
		})
		.then((res) => res.json())
    .then((data) => {
      // Handle the response data if needed
      setTeamToEdit(data)
    })
		.catch((error) => {
			console.error('Error deleting team:', error);
		  });
    },[id])

    const handleClickPlayer = (e) => {
        const playerNameToReplace = e.target.innerText; // Name of the player to replace
        const newPlayerName = playerToAdd.players.name; // New player name
    
        const updatedRoster = { ...teamToEdit.roster };
		console.log('player name to replace', playerNameToReplace)
		console.log('updated roster', updatedRoster)
        // Iterate through the keys of the roster object
		Object.keys(updatedRoster).forEach((position) => {
			const updatedPlayers = updatedRoster[position].map((player) =>
				(player.player === playerNameToReplace && player.position.slice(0, -1) === playerToAdd.players.position || player.position === playerToAdd.players.position) 
					? { ...player, player: newPlayerName }
					: (player.player === playerNameToReplace && player.position === "Flex" && playerToAdd.players.position !== "QB" && playerToAdd.players.position !== "TE") 
						? { ...player, player: newPlayerName }
						: (player.player === playerNameToReplace && player.position.slice(0, -1) === 'bench') 
							? { ...player, player: newPlayerName }
							: player
			);
		
			updatedRoster[position] = updatedPlayers;
			console.log(updatedRoster)
		});
    
        setTeamToEdit({
            ...teamToEdit,
            roster: updatedRoster,
        });
    };

    const handleSaveTeam = ()=>{
        const queryString = new URLSearchParams(teamToEdit).toString();
		fetch(`/api/saveEditedTeam`, {
			method: 'PUT',
			headers: { Accept: 'application/json' },
			body: JSON.stringify({
                _id: id,
				teamName: teamToEdit.teamName,
				QB: teamToEdit.roster.QB,
				RB: teamToEdit.roster.RB,
				Flex: teamToEdit.roster.Flex,
				WR:teamToEdit.roster.WR,
				TE: teamToEdit.roster.TE,
				bench: teamToEdit.roster.bench
				})
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				router.push('/viewFantasyTeams')
			})
		.catch((error) => {
			console.error('Error editingteam:', error);
		  });
    }
  
    console.log("player to add!!!", playerToAdd)
  return (
    <>
	
	<NavBar/>
    <Container style={{display:'flex', justifyContent:'space-evenly', flexWrap:'wrap'}}>
		{teamToEdit&& 
        <>
        
        <CreateFantasyTeam fantasyTeam={teamToEdit} setFantasyTeam={setTeamToEdit} setPlayerToAdd={setPlayerToAdd}></CreateFantasyTeam>
			<Table key={teamToEdit._id} striped bordered hover size='sm' style={{width:'350px'}}>
			<thead>
				<tr>
					<td>
					Team Name: {teamToEdit.teamName}
					</td>
				</tr>
				<tr>
					<th>Position</th>
					<th>Name</th>
				</tr>
			</thead>
			<tbody>
						{Object.keys(teamToEdit.roster).map((position) =>
							Array.isArray(teamToEdit.roster[position]) &&
							teamToEdit.roster[position].length > 0
								? teamToEdit.roster[position].map((player, index) => (
									<tr key={index}>
											<td>{player.position}</td>
											<td onClick={(e)=>handleClickPlayer(e)}>{player.player}</td>
										</tr>
								  ))
								  : null
						)}
					</tbody>
                
		</Table>
		<Button onClick={handleSaveTeam}>Save Team</Button>
        </>
								  }
			</Container>
		</>
  )
}

export default editTeam