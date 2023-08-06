import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { Dropdown } from 'react-bootstrap';

const initialTeam = {
	QB: '',
	RB1: '',
	RB2: '',
	WR1: '',
	WR2: '',
	Flex: '',
	TE: '',
	// D_ST:"",
	// Kicker:"",
	bench: [],
    teamName:''
};

const index = () => {
	const [teams, setTeams] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState('');
	const [selectedPlayers, setSelectedPlayers] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState();
	const [fantasyTeam, setFantasyTeam] = useState(initialTeam);
    const [teamName, setTeamName] = useState()
	const [showDropdown, setShowDropdown] = useState(false)
	const [inputValue, setInputValue] = useState('')

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

	const handleInput = (e) => {
		if(e.target.value === ''){
			setShowDropdown(false)
			setInputValue('')
			return
		}
			let name = e.target.value;
			setInputValue(name)
			fetch(`/api/findPlayer?name=${name}&team=${selectedTeam}`, {
				method: 'GET',
				headers: { Accept: 'application/json' },
			})
				.then((res) => {
					return res.json();
				})
				.then((players) => {
					setSelectedPlayers(players);
					setShowDropdown(true)
				});
	};

    const handleTeamName = (e)=>{
        setFantasyTeam((prevFantasyTeam) => ({
            ...prevFantasyTeam,
            teamName: e.target.value,
        }));
    }

	const handleDropDown = (e) =>{
		console.log("e", e)
		setSelectedPlayer(e.target.text)
		setInputValue(e.target.text)
		setShowDropdown(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
        console.log("selected player in submit", selectedPlayers)
		const player = selectedPlayers.filter(
			(player) => player.players.name === selectedPlayer
		);
		console.log("player in submit",player);
		if (player) {
			setInputValue('')
			const playerPosition = player[0].players.position;
            if (playerPosition === 'QB' && fantasyTeam.QB !== '' ) {
                if(fantasyTeam.bench.length>5){
                    return
                }
                setFantasyTeam((prevFantasyTeam) => ({
                    ...prevFantasyTeam,
                    bench: [...prevFantasyTeam.bench, player[0].players.name],
                }));
			}else 
            if (playerPosition === 'QB') {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
                        QB: player[0].players.name,
				}));
			} else if (playerPosition === 'RB' && fantasyTeam.RB1 === '') {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					RB1: player[0].players.name,
				}));
			} else if (playerPosition === 'RB' && fantasyTeam.RB2 === '') {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					RB2: player[0].players.name,
				}));
			} else if (
				playerPosition === 'RB' &&
				fantasyTeam.RB1 !== '' &&
				fantasyTeam.RB2 !== '' &&
				fantasyTeam.Flex === ''
			) {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					Flex: player[0].players.name,
				}));
			} else if (playerPosition === 'RB' && fantasyTeam.Flex !== '') {
                if(fantasyTeam.bench.length>5){
                    return
                }
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					bench: [...prevFantasyTeam.bench, player[0].players.name],
				}));
			} else if (playerPosition === 'WR' && fantasyTeam.WR1 === '') {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					WR1: player[0].players.name,
				}));
			} else if (playerPosition === 'WR' && fantasyTeam.WR2 === '') {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					WR2: player[0].players.name,
				}));
			} else if (
				playerPosition === 'WR' &&
				fantasyTeam.WR1 !== '' &&
				fantasyTeam.WR2 !== '' &&
				fantasyTeam.Flex === ''
			) {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					Flex: player[0].players.name,
				}));
			} else if (playerPosition === 'WR' && fantasyTeam.Flex !== '') {
                if(fantasyTeam.bench.length>5){
                    return
                }
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					bench: [...prevFantasyTeam.bench, player[0].players.name],
				}));
            } else if (playerPosition === 'TE' && fantasyTeam.TE !== '' ) {
                if(fantasyTeam.bench.length>5){
                    return
                }
                setFantasyTeam((prevFantasyTeam) => ({
                    ...prevFantasyTeam,
                    bench: [...prevFantasyTeam.bench, player[0].players.name],
                }));
            }
          else if (playerPosition === 'TE') {
				setFantasyTeam((prevFantasyTeam) => ({
					...prevFantasyTeam,
					TE: player[0].players.name,
				}));
            }}
        };
        
        const handleSubmitTeam = ()=>{
                const queryString = new URLSearchParams(fantasyTeam).toString();
                fetch(`/api/fantasyTeamAPI?${queryString}`, {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                })
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        console.log(data)
                    });
    }

	const handleSelectTeam = (e) =>{
		console.log(e.target.value)
		if (e.target.value === 'Players'){
			setSelectedTeam('')
		}else{
			setSelectedTeam(e.target.value)
		}
	}

	return (
		<div>
			<NavBar/>
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
							{selectedPlayers.map((player) => (
								<Dropdown.Item value={player.players.name} key={player.players.index} onClick={(e) => handleDropDown(e)}>
									{player.players.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
						// <select
						// 	name='Players'
						// 	value={selectedPlayer}
						// 	onChange={(e) => setSelectedPlayer(e.target.value)}>
						// 	<option value='Players' defaultValue>
						// 		Click for Players
						// 	</option>
						// </select>
					)}
				</div>
				<button onClick={(e) => handleSubmit(e)}>Add Player</button>
                <input type='text' placeholder='Enter Team Name' onChange={(e)=> handleTeamName(e) }></input>
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
				</table>
                <button onClick={handleSubmitTeam}>Add Team</button>
			</div>
		</div>
	);
};

export default index;
