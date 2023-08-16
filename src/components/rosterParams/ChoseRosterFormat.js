import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

const initialState = {};

const ChoseRosterFormat = ({ setFantasyTeam, fantasyTeam }) => {
	const [rosterFormat, setRosterFormat] = useState(initialState);

	const handleFormatRoster = (e) => {
		const amount = e.target.value;
		const position = e.target.name;
		const updatedRoster = { ...fantasyTeam };
		console.log('ur', updatedRoster);
		if (amount > 1) {
			for (let i = 0; i < amount; i++) {
				updatedRoster[position].push({
					position: `${position}${i + 1}`,
					player: '',
				});
			}
		} else {
			updatedRoster[position].push({ position: position, player: '' });
		}
		//    setRosterFormat(updatedRoster)
		setFantasyTeam(updatedRoster);
	};

	function handleInput(input) {
		if (input.value > input.getAttribute('max')) {
			input.value = input.getAttribute('max');
		}
	}

	return (
		<Container className='centered'>
			<Form>
				<Form.Group>
					<Form.Label>How many Qbs in the starting lineup(Max: 2)?</Form.Label>
					<Form.Control
						type='number'
						max='2'
						name='QB'
						onInput={(e) => handleInput(e.target)}
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many RBs in the starting lineup (Max: 3)?</Form.Label>
					<Form.Control
						type='number'
						max='3'
						name='RB'
						onInput={(e) => handleInput(e.target)}
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many WRs in the starting lineup (Max: 4)?</Form.Label>
					<Form.Control
						type='number'
						max='4'
						name='WR'
						onInput={(e) => handleInput(e.target)}
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						How many RB/WR flex spots in the starting lineup (Max: 2)?
					</Form.Label>
					<Form.Control
						type='number'
						max='2'
						name='Flex'
						onInput={(e) => handleInput(e.target)}
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many TEs in the starting lineup (Max: 2)?</Form.Label>
					<Form.Control
						type='number'
						max='2'
						name='TE'
						onInput={(e) => handleInput(e.target)}
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many Bench Spots (Max: 8)?</Form.Label>
					<Form.Control
						type='number'
						max='8'
						name='bench'
						onInput={(e) => handleInput(e.target)}
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default ChoseRosterFormat;
