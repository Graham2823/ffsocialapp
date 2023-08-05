const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const fantasyTeamSchema = new Schema({
    teamName:{
        type: String,
        required: true
    },
    roster:{
        QB:{
            type:String,
            required: true
        },
        RB1:{
            type:String,
            required: true
        },
        RB2:{
            type:String,
            required: true
        },
        Flex:{
            type:String,
            required:true
        },
        WR1:{
            type:String,
            required: true
        },
        WR2:{
            type:String,
            required: true
        },
        TE:{
            type:String,
            required: true
        },
        bench:{
            type:[String],
            required:true
        }
    }
});

// const FantasyTeam = mongoose.model('FantasyTeam', fantasyTeamSchema)

// module.exports = mongoose.model('FantasyTeam', fantasyTeamSchema)

module.exports =
    mongoose.models.FantasyTeam || mongoose.model('FantasyTeam', fantasyTeamSchema);