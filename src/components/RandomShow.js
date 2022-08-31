/////////////
// IMPORTS //
/////////////

import React, {useState} from 'react'
import Show from './Show';



const RandomShow = (props) => {
    // Shuffle Shows Array
    let shuffleProps=props.show.sort((a,b) => 0.5 - Math.random());
    const items = shuffleProps.slice(0,1);

    // Make Last Watched Date from Data
    let watchDate = items[0].updatedAt.split('-');
    watchDate = [watchDate[1], watchDate[2].substring(0,2), watchDate[0]];
    watchDate = watchDate.join('-');
    
    return (
        <div className="random-show-container">
            <img src={items[0].image}/>
            <div className='random-show-info-container'>
                <h3>{items[0].name}</h3>
                <p>{items[0].genre}</p>
                <p>{items[0].lastWatchedEp}</p>
                <p>Last Watched: {watchDate}</p>
            </div>
        </div>
    )
    
}

export default RandomShow;