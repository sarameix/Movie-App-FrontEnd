/////////////
// IMPORTS //
/////////////

import React, {useState} from 'react'
import Show from './Show';



const RandomShow = (props) => {
    let shuffleProps=props.show.sort((a,b) => 0.5 - Math.random());
    const items = shuffleProps.slice(0,1);
    
    return(
        <div className="d-flex justify-content-center">
        
            <div className="show-info-container-middle">
            <img src={items[0].image}/>
                <h3>{items[0].name}</h3>
                <p>{items[0].genre}</p>
            
        </div>
        </div>
    )
    
}

export default RandomShow;