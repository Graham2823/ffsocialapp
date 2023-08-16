import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navbar/NavBar';
import ChoseRosterFormat from '../../components/rosterParams/ChoseRosterFormat';
import CreateFantasyTeam from '../../components/createFantasyTeam/createFantasyTeam';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
	const [fantasyTeam, setFantasyTeam] = useState(initialTeam);
	const [showRosterParams, setShowRosterParams] = useState(true)
	

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
				setShowRosterParams(true)
			});
	}, []);


	useEffect(() => {
		// This effect will trigger whenever fantasyTeam changes
		// You can use it to force a re-render of the component
	}, [fantasyTeam]);


	const handleSubmitTeam = () => {
		const queryString = new URLSearchParams(fantasyTeam).toString();
		fetch(`/api/fantasyTeamAPI`, {
			method: 'POST',
			headers: { Accept: 'application/json' },
			body: JSON.stringify({
				teamName: fantasyTeam.teamName,
				QB: fantasyTeam.QB,
				RB: fantasyTeam.RB,
				Flex: fantasyTeam.Flex,
				WR:fantasyTeam.WR,
				TE: fantasyTeam.TE,
				bench: fantasyTeam.bench
				})
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<div>
			<NavBar />
			{showRosterParams &&
			<>
			<ChoseRosterFormat
				setFantasyTeam={setFantasyTeam}
				fantasyTeam={fantasyTeam}
			/>
		<FontAwesomeIcon className='centered' icon={faArrowRight} size='5x' onClick={()=>setShowRosterParams(false)}/>
			</>
		}
			{showRosterParams === false &&
			<>
			
			<CreateFantasyTeam fantasyTeam={fantasyTeam} setFantasyTeam={setFantasyTeam} teams={teams}></CreateFantasyTeam>
			<div className='centered'>
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
								  </>
			}
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
