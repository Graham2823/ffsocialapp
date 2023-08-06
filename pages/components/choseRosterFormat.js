import React, { useState } from 'react'

const initialState = {
}


const choseRosterFormat = () => {
    const [rosterFormat, setRosterFormat] = useState(initialState)
    
    
    const handleFormatRoster = ( e)=>{
        const amount = e.target.value
        const position = e.target.name
        const updatedRoster = {...rosterFormat}
        if(amount > 1){
            for(let i=0; i<amount; i++){
                    updatedRoster[position + `${i + 1}`]=''
            }
        }else{
            updatedRoster[position]=''
        }
        
       setRosterFormat(updatedRoster)
    }

console.log(rosterFormat)
  return (
    <div>
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
        <table>
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
        </table>
    </div>
  )
}

export default choseRosterFormat