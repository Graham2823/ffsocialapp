import React, {useState } from 'react';
import { Dropdown } from 'react-bootstrap';
const CreateFantasyTeam = ({fantasyTeam, setFantasyTeam, teams}) => {

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
			  const benchArray = copiedTeam.bench;
			const emptyBenchPlayer = benchArray.find((player) => player.player === '');
			if (emptyBenchPlayer) {
			  emptyBenchPlayer.player = player.players.name;
			}
		  }
		}}
	  
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
    <div className='centered'>
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
</form></div>
  )
}

export default CreateFantasyTeam