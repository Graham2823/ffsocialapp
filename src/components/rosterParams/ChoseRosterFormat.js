import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';

const initialState = {};

const ChoseRosterFormat = ({ setFantasyTeam, fantasyTeam }) => {
	const handleFormatRoster = (e) => {
		const amount = parseInt(e.target.value, 10);
    const maxAmount = parseInt(e.target.getAttribute('max'), 10);
		const position = e.target.name;
		const input = e.target
		if (amount > maxAmount) {
			input.value = maxAmount
		}
		const updatedRoster = { ...fantasyTeam };
		if (amount >= 1) {
			updatedRoster[position] = []
			const loopCount = Math.min(amount, maxAmount);
			for (let i = 0; i < loopCount; i++) {
				updatedRoster[position].push({
					position: `${position}${i + 1}`,
					player: '',
				});
			}
		} else {
			updatedRoster[position].push({ position: position, player: '' });
		}
		setFantasyTeam(updatedRoster);
	};


	return (
		<Container className='centered'>
			<Form>
				<Form.Group>
					<Form.Label>How many Qbs in the starting lineup(Max: 2)?</Form.Label>
					<Form.Control
						type='number'
						max='2'
						name='QB'
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many RBs in the starting lineup (Max: 3)?</Form.Label>
					<Form.Control
						type='number'
						max='3'
						name='RB'
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many WRs in the starting lineup (Max: 4)?</Form.Label>
					<Form.Control
						type='number'
						max='4'
						name='WR'
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
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many TEs in the starting lineup (Max: 2)?</Form.Label>
					<Form.Control
						type='number'
						max='2'
						name='TE'
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>How many Bench Spots (Max: 8)?</Form.Label>
					<Form.Control
						type='number'
						max='8'
						name='bench'
						onChange={(e) => handleFormatRoster(e)}/>
				</Form.Group>
			</Form>
		</Container>
	);
};

export default ChoseRosterFormat;
