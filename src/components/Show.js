/////////////
// IMPORTS //
/////////////

import {useState, useEffect} from 'react';
import axios from 'axios';

///////////////////
// SHOW FUNCTION //
///////////////////

const Show = (props) => {
    // Set Update State
    let [updateMode, setUpdateMode] = useState(false);

    // Make Created Data from Data
    let createDate = props.show.created.split('-');
    createDate = [createDate[2], createDate[0], createDate[1]];
    createDate = createDate.join('-');

    // Make Last Watched Date from Data
    let watchDate = props.show.updatedAt.split('-');
    watchDate = [watchDate[1], watchDate[2].substring(0,2), watchDate[0]];
    watchDate = watchDate.join('-');

    // Function to Handle Update Form Submi
    const handleUpdateSubmit = (event) => {
        // Prevent Form Default
        event.preventDefault();

        // Make New Show Object
        let newCreated = [event.target.created.value.split('-')[1], event.target.created.value.split('-')[2], event.target.created.value.split('-')[0]].join('-');
        const newShow = {
            name: event.target.name.value,
            genre: event.target.genre.value,
            image: event.target.image.value,
            created: newCreated,
            lastWatchedEp: event.target.lastEp.value
        }

        // Update Show in API and Update Shows State
        axios.put(
            (`https://fathomless-refuge-80112.herokuapp.com/shows/${event.target.showID.value}`),
            newShow
          ).then(() => {
            axios.get('https://fathomless-refuge-80112.herokuapp.com/shows/')
              .then((response) => {
                props.setShows(props.sortShowArray('mostRecent', response.data));
                setUpdateMode(!updateMode);
              })
          })
    }

    // Return HTML Elements
    return (
        <div className='show-container'>
            {
                updateMode ?
                    <form className='update-form' onSubmit={handleUpdateSubmit}>
                        <input className="image-input" type="text" name="image" defaultValue={props.show.image} placeholder="Preview Image" /><br/>
                        <div className="show-info-container">
                            <div className="show-info-container-left">
                                <input type="text" name="name" defaultValue={props.show.name} placeholder="Show Name" /><br/>
                                <input type="text" name="genre" defaultValue={props.show.genre} placeholder="Show Genre" /><br/>
                                <input type="text" name="lastEp" defaultValue={props.show.lastWatchedEp} placeholder="Last Watched Episode" /><br/>
                            </div>
                            <div className="show-info-container-right">
                                <h5>First Aired On:</h5>
                                <input type="date" name="created" defaultValue={createDate} /><br/>
                                <h5>Last Watched:</h5>
                                <p>{watchDate}</p>
                            </div>
                        </div>
                        <div className="modify-buttons-container">
                            <button onClick={() => {setUpdateMode(!updateMode)}}>
                                <div className='back-button'></div> 
                            </button>
                            <div className='submit-container'>
                                <input className="submit-button" type="submit" value=" " />
                                <div className="submit-button-icon"></div>
                            </div>
                            
                        </div>
                        <input type="hidden" name="showID" value={props.show._id} />
                    </form>
                :
                    <>
                        <img src={props.show.image}/>
                        <div className="show-info-container">
                            <div className="show-info-container-left">
                                <h3>{props.show.name}</h3>
                                <p>{props.show.genre}</p>
                                <p>{props.show.lastWatchedEp}</p>
                            </div>
                            <div className="show-info-container-right">
                                <h5>First Aired On:</h5>
                                <p>{props.show.created}</p>
                                <h5>Last Watched:</h5>
                                <p>{watchDate}</p>
                            </div>
                        </div>
                        <div className="modify-buttons-container">
                            <button onClick={() => {setUpdateMode(!updateMode)}}>
                                <div className='edit-button'></div>
                            </button>
                            <button onClick={ () => {props.handleDelete(props.show)}} >
                                <div className='delete-button'></div>
                            </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default Show;