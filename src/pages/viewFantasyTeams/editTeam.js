import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/navbar/NavBar';
import CreateFantasyTeam from '../../components/createFantasyTeam/createFantasyTeam';
import { Button, Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const editTeam = () => {
	const [teamToEdit, setTeamToEdit] = useState();
	const [playerToAdd, setPlayerToAdd] = useState();
	const router = useRouter();
	const { id } = router.query;
	const [playersOnTeam, setPlayersOnTeam] = useState([]);
	useEffect(() => {
		fetch(`/api/editFantasyTeam?teamID=${id}`, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})
			.then((res) => res.json())
			.then((data) => {
				// Handle the response data if needed
				setTeamToEdit(data);
			})
			.catch((error) => {
				console.error('Error deleting team:', error);
			});
	}, [id]);

	// useEffect(() => {
	// 	if (teamToEdit) {
	// 	  const newPlayers = [];
	// 	  Object.keys(teamToEdit.roster).forEach((position) => {
	// 		teamToEdit.roster[position].forEach((player) => {
	// 		  newPlayers.push(player.player);
	// 		});
	// 	  });
	// 	  setPlayersOnTeam((prevPlayers) => [...prevPlayers, ...newPlayers]);
	// 	}
	//   }, [teamToEdit]);

	const handleClickPlayer = (e) => {
		const playerNameToReplace = e.target.innerText; // Name of the player to replace
		const newPlayerName = playerToAdd.players.name; // New player name
		const updatedRoster = { ...teamToEdit.roster };

		let playerNameToReplaceUpdated = false; // Flag to track if the name has been updated

		Object.keys(updatedRoster).forEach((position) => {
			const updatedPlayers = updatedRoster[position].map((player) => {
				if (player.player === newPlayerName) {
					return { ...player };
				} else if (
					player.player === playerNameToReplace &&
					(player.position.slice(0, -1) === playerToAdd.players.position ||
						player.position === playerToAdd.players.position) &&
					!playerNameToReplaceUpdated
				) {
					playerNameToReplaceUpdated = true; // Set the flag to true once updated
					return { ...player, player: newPlayerName };
				} else if (
					player.player === playerNameToReplace &&
					player.position === 'Flex' &&
					playerToAdd.players.position !== 'QB' &&
					playerToAdd.players.position !== 'TE' &&
					!playerNameToReplaceUpdated
				) {
					playerNameToReplaceUpdated = true; // Set the flag to true once updated
					return { ...player, player: newPlayerName };
				} else if (
					player.player === playerNameToReplace &&
					player.position.slice(0, -1) === 'bench' &&
					!playerNameToReplaceUpdated
				) {
					playerNameToReplaceUpdated = true; // Set the flag to true once updated
					return { ...player, player: newPlayerName };
				} else {
					return player;
				}
			});

			updatedRoster[position] = updatedPlayers;
		});

		setTeamToEdit({
			...teamToEdit,
			roster: updatedRoster,
		});
	};

	const handleSaveTeam = () => {
		if (teamToEdit) {
			const playerOccurrences = {}; // Object to track player occurrences

			Object.keys(teamToEdit.roster).forEach((position) => {
				teamToEdit.roster[position].forEach((player) => {
					const playerName = player.player;

					// Check if the player is already in the occurrences object
					if (playerOccurrences[playerName]) {
						playerOccurrences[playerName] += 1;
					} else {
						playerOccurrences[playerName] = 1;
					}
				});
			});

			// Now, playerOccurrences object contains player names and their occurrences
			console.log(playerOccurrences);

			// You can iterate over the playerOccurrences object to see players with more than one occurrence
			for (const playerName in playerOccurrences) {
				if (playerOccurrences[playerName] > 1) {
					console.log('player is there twice, please fix!');
					toast.error('A player is on the team twice, please fix before saving!')
					return;
				}
			}
		}
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
				WR: teamToEdit.roster.WR,
				TE: teamToEdit.roster.TE,
				bench: teamToEdit.roster.bench,
			}),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				router.push('/viewFantasyTeams');
			})
			.catch((error) => {
				console.error('Error editingteam:', error);
			});
	};

	return (
		<>
			<NavBar />
			<ToastContainer />
			<Container
				style={{
					display: 'flex',
					justifyContent: 'space-evenly',
					flexWrap: 'wrap',
				}}>
				{teamToEdit && (
					<>
						<CreateFantasyTeam
							fantasyTeam={teamToEdit}
							setFantasyTeam={setTeamToEdit}
							setPlayerToAdd={setPlayerToAdd}></CreateFantasyTeam>
						<Table
							key={teamToEdit._id}
							striped
							bordered
							hover
							size='sm'
							style={{ width: '350px' }}>
							<thead>
								<tr>
									<td>Team Name: {teamToEdit.teamName}</td>
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
													<td onClick={(e) => handleClickPlayer(e)}>
														{player.player}
													</td>
												</tr>
										  ))
										: null
								)}
							</tbody>
						</Table>
						<Button onClick={handleSaveTeam}>Save Team</Button>
					</>
				)}
			</Container>
		</>
	);
};

export default editTeam;
