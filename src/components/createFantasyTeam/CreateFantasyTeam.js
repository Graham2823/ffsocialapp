import React, { useState } from 'react';
import { Container, Dropdown, Form, Button } from 'react-bootstrap';
const CreateFantasyTeam = ({ fantasyTeam, setFantasyTeam, setPlayerToAdd }) => {
	const [selectedTeam, setSelectedTeam] = useState('');
	const [selectedPlayers, setSelectedPlayers] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [teamName, setTeamName] = useState();
	const [showDropdown, setShowDropdown] = useState(false);
	const [inputValue, setInputValue] = useState('');

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
		setPlayerToAdd(e.target.text)
		setInputValue(e.target.text);
		setShowDropdown(false);
	};
	
	const handleAddPlayer = (e) => {
		e.preventDefault();
		console.log('selected',selectedPlayer)
		const player = selectedPlayers.find(
			(player) => player.players.name === selectedPlayer
			);
			console.log('player',player)

		if (!player) {
			return; // Handle invalid player
		}
		const copiedTeam = { ...fantasyTeam };
		const playerPosition = player.players.position;

		const positionArray = copiedTeam[playerPosition];

		if (positionArray) {
			const emptyPlayer = positionArray.find((player) => player.player === '');

			if (emptyPlayer) {
				emptyPlayer.player = player.players.name;
			} else if (copiedTeam.Flex) {
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
			}
		}

		setFantasyTeam({ ...copiedTeam });
		console.log('ft after add', copiedTeam); // Log the copiedTeam for accurate information
	};

	const handleSelectTeam = (e) => {
		console.log(e.target.value);
		if (e.target.value === 'Players') {
			setSelectedTeam('');
		} else {
			setSelectedTeam(e.target.value);
		}
	};

	return (
		<Container className='centered'>
			<h2>Add your Fantasy Team:</h2>
			<Form>
				<Form.Group>
					<Form.Control type='text'
					placeholder={'enter player name'}
					value={inputValue}
					onChange={(e) => handleInput(e)}/>
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
				<Button onClick={(e) => handleAddPlayer(e)}>Add Player</Button>
			</Form>
		</Container>
	);
};

export default CreateFantasyTeam;
