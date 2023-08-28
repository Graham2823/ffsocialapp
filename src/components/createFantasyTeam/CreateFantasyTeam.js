import React, { useState } from 'react';
import { Container, Dropdown, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateFantasyTeam = ({ fantasyTeam, setFantasyTeam, setPlayerToAdd, showAddPlayer, setShowDirection }) => {
	const [selectedTeam, setSelectedTeam] = useState('');
	const [selectedPlayers, setSelectedPlayers] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [teamName, setTeamName] = useState();
	const [showDropdown, setShowDropdown] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [playersOnTeam, setPlayersOnTeam] = useState([]);
	
	const handleInput = (e) => {
		if (e.target.value === '') {
			setShowDropdown(false);
			setInputValue('');
			return;
		}
		let name = e.target.value;
		setInputValue(name);
		fetch(`/api/findPlayer?name=${name}&team=${selectedTeam}`, {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})
			.then((res) => {
				return res.json();
			})
			.then((players) => {
				setSelectedPlayers(players);
				setShowDropdown(true);
			});
	};

	const handleDropDown = (e) => {
		setSelectedPlayer(e.target.text);
		if(setShowDirection){
			setShowDirection(true)
		}
		if (setPlayerToAdd) {
			const player = selectedPlayers.find(
				(player) => player.players.name === e.target.text
			);
			console.log('player', player);
			setPlayerToAdd(player);
		}
		setInputValue(e.target.text);
		setShowDropdown(false);
	};

	const handleAddPlayer = (e) => {
		e.preventDefault();
		const player = selectedPlayers.find(
			(player) => player.players.name === selectedPlayer
		);

		const onTeamAlready = playersOnTeam.find(
			(player) => player === selectedPlayer
		);

		console.log('ontean', onTeamAlready);
		if (onTeamAlready) {
			toast.error('That Player is already on the team!')
			return; // handle player thats already on team
		}
		if (!player) {
			return; // Handle invalid player
		}
		setPlayersOnTeam([...playersOnTeam, selectedPlayer]);
		const copiedTeam = { ...fantasyTeam };
		const playerPosition = player.players.position;

		const positionArray = copiedTeam[playerPosition];

		if (positionArray) {
			const emptyPlayer = positionArray.find((player) => player.player === '');

			if (emptyPlayer) {
				emptyPlayer.player = player.players.name;
			} else if (playerPosition !== 'QB' && copiedTeam.Flex) {
				const flexArray = copiedTeam.Flex;

				const emptyFlexPlayer = flexArray.find(
					(player) => player.player === ''
				);

				if (emptyFlexPlayer) {
					emptyFlexPlayer.player = player.players.name;
				} else if (copiedTeam.bench) {
					const benchArray = copiedTeam.bench;
					const emptyBenchPlayer = benchArray.find(
						(player) => player.player === ''
					);
					if (emptyBenchPlayer) {
						emptyBenchPlayer.player = player.players.name;
					}
				}
			} else if (playerPosition === 'QB' && copiedTeam.bench) {
				const benchArray = copiedTeam.bench;
				const emptyBenchPlayer = benchArray.find(
					(player) => player.player === ''
				);
				if (emptyBenchPlayer) {
					emptyBenchPlayer.player = player.players.name;
				}
			}
		}

		setFantasyTeam({ ...copiedTeam });
	};

	const handleSelectTeam = (e) => {
		if (e.target.value === 'Players') {
			setSelectedTeam('');
		} else {
			setSelectedTeam(e.target.value);
		}
	};

	return (
		<Container className='centered'>
			<ToastContainer/>
			<h2>Add your Fantasy Team:</h2>
			<Form>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder={'enter player name'}
						value={inputValue}
						onChange={(e) => handleInput(e)}
					/>
				</Form.Group>
				<Form.Group>
					{selectedPlayers.length > 0 && (
						<Dropdown.Menu show={showDropdown} value={selectedPlayer}>
							{selectedPlayers.map((player, index) => (
								<Dropdown.Item
									value={player.players.name}
									key={index}
									onClick={(e) => handleDropDown(e)}>
									{player.players.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					)}
				</Form.Group>
				{showAddPlayer && 
				<Button onClick={(e) => handleAddPlayer(e)}>Add Player</Button>
				}
			</Form>
		</Container>
	);
};

export default CreateFantasyTeam;
