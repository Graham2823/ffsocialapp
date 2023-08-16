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
				require: true,
			},
			player: {
				type: String,
				require: true,
			}}],
		RB: [{
			position: {
				type: String,
				require: true,
			},
			player: {
				type: String,
				require: true,
			}}],
		Flex: [{
			position: {
				type: String,
				require: true,
			},
			player: {
				type: String,
				require: true,
			}}],
		WR: [{
			position: {
				type: String,
				require: true,
			},
			player: {
				type: String,
				require: true,
			}}],
		TE: [{
			position: {
				type: String,
				require: true,
			},
			player: {
				type: String,
				require: true,
			}}],
		bench: [{
			position: {
				type: String,
				require: true,
			},
			player: {
				type: String,
				require: true,
			}}],
	},
});

// const FantasyTeam = mongoose.model('FantasyTeam', fantasyTeamSchema)

// module.exports = mongoose.model('FantasyTeam', fantasyTeamSchema)

module.exports =
	mongoose.models.FantasyTeam ||
	mongoose.model('FantasyTeam', fantasyTeamSchema);
