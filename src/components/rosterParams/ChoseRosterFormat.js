import React, { useState } from 'react'

const initialState = {
}


const ChoseRosterFormat = ({setFantasyTeam, fantasyTeam}) => {
    const [rosterFormat, setRosterFormat] = useState(initialState)
    
    
    const handleFormatRoster = ( e)=>{
        const amount = e.target.value
        const position = e.target.name
        const updatedRoster = {...fantasyTeam}
        console.log("ur", updatedRoster)
        if(amount > 1){
            for(let i=0; i<amount; i++){
                    updatedRoster[position].push({position: `${position}${i+1}`, player:''})
            }
        }else{
            updatedRoster[position].push({position: position, player:''})
        }
    //    setRosterFormat(updatedRoster)
       setFantasyTeam(updatedRoster)
    }


  return (
    <div className='centered'>
        <form>
            <p>
            <label>How many Qbs in the starting lineup?
            <input type='text' name='QB' onChange={(e)=> handleFormatRoster(e)}></input></label>
            </p>
            <p><label>How many RBs in the starting lineup?
            <input type='text' name='RB' onChange={(e)=> handleFormatRoster(e)}></input></label></p>
            
            <p><label>How many WRs in the starting lineup?
            <input type='text' name='WR' onChange={(e)=> handleFormatRoster(e)}></input></label></p>
            <p><label>How many RB/WR flex spots in the starting lineup?
            <input type='text' name='Flex' onChange={(e)=> handleFormatRoster(e)}></input></label></p>
            
            <p><label>How many TEs in the starting lineup?
            <input type='text' name='TE' onChange={(e)=> handleFormatRoster(e)}></input></label></p>
        </form>
        {/* <table>
        <thead>
				<tr>
					<th>Position</th>
					<th>Name</th>
				</tr>
			</thead>
            <tbody>
               {Object.keys(rosterFormat).map((position)=>(
                <tr key ={position}>
                    <td>{position}:</td>
                    <td></td>
                </tr>
               ))}
            </tbody>
        </table> */}
    </div>
  )
}

export default ChoseRosterFormat