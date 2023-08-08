import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { Dropdown } from 'react-bootstrap';
import ChoseRosterFormat from '../components/choseRosterFormat';

const initialTeam = {
	QB: [],
	RB: [],
	WR: [],
	Flex: [],
	TE: [],
	bench: [],
	teamName: '',
};

const index = () => {
	const [teams, setTeams] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState('');
	const [selectedPlayers, setSelectedPlayers] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [fantasyTeam, setFantasyTeam] = useState(initialTeam);
	const [teamName, setTeamName] = useState();
	const [showDropdown, setShowDropdown] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		fetch('/api/teams', {
			method: 'GET',
			headers: { Accept: 'application/json' },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setTeams(data);
			});
	}, []);

	useEffect(() => {
		// This effect will trigger whenever fantasyTeam changes
		// You can use it to force a re-render of the component
	}, [fantasyTeam]);

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

	const handleTeamName = (e) => {
		setFantasyTeam((prevFantasyTeam) => ({
			...prevFantasyTeam,
			teamName: e.target.value,
		}));
	};

	const handleDropDown = (e) => {
		console.log('e', e);
		setSelectedPlayer(e.target.text);
		setInputValue(e.target.text);
		setShowDropdown(false);
	};

	// const handleAddPlayer = (e) => {
	// 	e.preventDefault();
	// 	const player = selectedPlayers.filter(
	// 		(player) => player.players.name === selectedPlayer
	// 	);

	// 	const playerPosition = player[0].players.position;

	// 	const position = Object.keys(fantasyTeam).filter((position)=> position === playerPosition)
	// 		console.log("position", position)
	// 	Object.keys(fantasyTeam).map(
	// 		(position) =>
	// 			Array.isArray(fantasyTeam[position]) && fantasyTeam[position] === playerPosition &&
	// 			fantasyTeam[position].map((players) => (
	// 				players.player === '' ?
	// 				players.player = player[0].players.name :
	// 				Array.isArray(fantasyTeam[Flex]) &&
	// 			fantasyTeam[Flex].map((players)=>(
	// 				players.player === '' ?
	// 				players.player = player[0].players.name :
	// 				players.player = players.player
	// 			))
	// 			))
	// 	);
	// 	console.log("ft after add", fantasyTeam)
	// };

	const handleAddPlayer = (e) => {
		e.preventDefault();
		const player = selectedPlayers.find(
		  (player) => player.players.name === selectedPlayer
		);
	  
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
	  
			const emptyFlexPlayer = flexArray.find((player) => player.player === '');
	  
			if (emptyFlexPlayer) {
			  emptyFlexPlayer.player = player.players.name;
			} else if (copiedTeam.bench) {
			  if (copiedTeam.bench.length < 6) {
				copiedTeam.bench.push({position: "Bench", player: player.players.name});
			  }
			}
		  }
		}
	  
		setFantasyTeam({ ...copiedTeam });
		console.log('ft after add', copiedTeam); // Log the copiedTeam for accurate information
	  };
	  


	const handleSubmitTeam = () => {
		const queryString = new URLSearchParams(fantasyTeam).toString();
		fetch(`/api/fantasyTeamAPI?${queryString}`, {
			method: 'POST',
			headers: { Accept: 'application/json' },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
			});
	};

	const handleSelectTeam = (e) => {
		console.log(e.target.value);
		if (e.target.value === 'Players') {
			setSelectedTeam('');
		} else {
			setSelectedTeam(e.target.value);
		}
	};

	console.log('fantastTeam in create', fantasyTeam);
	return (
		<div>
			<NavBar />
			<ChoseRosterFormat
				setFantasyTeam={setFantasyTeam}
				fantasyTeam={fantasyTeam}
			/>
			<h2>Add your Fantasy Team:</h2>
			<form>
				<input
					type='text'
					placeholder={'enter player name'}
					value={inputValue}
					onChange={(e) => handleInput(e)}></input>
				{teams.length > 0 ? (
					<select
						name='Team'
						value={selectedTeam}
						onChange={(e) => handleSelectTeam(e)}>
						<option value='Players' defaultValue>
							Chose Team
						</option>
						{teams.map((team) => (
							<option key={team._id} value={team.team[0]}>
								{team.team[0]}
							</option>
						))}
					</select>
				) : (
					<p>Loading teams...</p>
				)}
				<div>
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
				</div>
				<button onClick={(e) => handleAddPlayer(e)}>Add Player</button>
				<input
					type='text'
					placeholder='Enter Team Name'
					onChange={(e) => handleTeamName(e)}></input>
			</form>
			<div>
				<table>
					<thead>
						<tr>
							<th>Position</th>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(fantasyTeam).map((position) =>
							Array.isArray(fantasyTeam[position]) &&
							fantasyTeam[position].length > 0
								? fantasyTeam[position].map((player, index) => (
										<tr key={index}>
											<td>{player.position}</td>
											<td>{player.player}</td>
										</tr>
								  ))
								: null
						)}
					</tbody>
				</table>

				<button onClick={handleSubmitTeam}>Add Team</button>
			</div>
		</div>
	);
};

export default index;

{
	/* <table>
	<thead>
		<tr>
			<th>Position</th>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>QB</td>
			<td>{fantasyTeam.QB}</td>
		</tr>
		<tr>
			<td>RB</td>
			<td>{fantasyTeam.RB1}</td>
		</tr>
		<tr>
			<td>RB</td>
			<td>{fantasyTeam.RB2}</td>
		</tr>
		<tr>
			<td>WR</td>
			<td>{fantasyTeam.WR1}</td>
		</tr>
		<tr>
			<td>WR</td>
			<td>{fantasyTeam.WR2}</td>
		</tr>
		<tr>
			<td>Flex</td>
			<td>{fantasyTeam.Flex}</td>
		</tr>
		<tr>
			<td>TE</td>
			<td>{fantasyTeam.TE}</td>
		</tr>
		{fantasyTeam.bench.length > 0 &&
			fantasyTeam.bench.map((player, index) => (
				<tr key={index}>
					<td>Bench</td>
					<td>{player}</td>
				</tr>
			))}
	</tbody>
</table> */
}
