const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fantasyTeamSchema = new Schema({
	teamName: {
		type: String,
		required: true,
	},
	roster: {
		QB: [{
			position: {
				type: String,
				required: true,
			},
			player: {
				type: String,
				required: true,
			}}],
		RB: [{
			position: {
				type: String,
				required: true,
			},
			player: {
				type: String,
				required: true,
			}}],
		Flex: [{
			position: {
				type: String,
				required: true,
			},
			player: {
				type: String,
				required: true,
			}}],
		WR: [{
			position: {
				type: String,
				required: true,
			},
			player: {
				type: String,
				required: true,
			}}],
		TE: [{
			position: {
				type: String,
				required: true,
			},
			player: {
				type: String,
				required: true,
			}}],
		bench: [{
			position: {
				type: String,
				required: true,
			},
			player: {
				type: String,
				required: true,
			}}],
	},
});

// const FantasyTeam = mongoose.model('FantasyTeam', fantasyTeamSchema)

// module.exports = mongoose.model('FantasyTeam', fantasyTeamSchema)

module.exports =
	mongoose.models.FantasyTeam ||
	mongoose.model('FantasyTeam', fantasyTeamSchema);
