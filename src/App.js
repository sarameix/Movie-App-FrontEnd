/////////////
// IMPORTS //
/////////////

import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

////////////////
// COMPONENTS //
////////////////

import Header from './components/Header';
import AddForm from './components/AddForm';
import Show from './components/Show';

//////////////////
// APP FUNCTION //
//////////////////

const App = () => {

  ////////////
  // STATES //
  ////////////

  let [shows, setShows] = useState([]);
  let [newName, setNewName] = useState('');
  let [newGenre, setNewGenre] = useState('');
  let [newCreated, setNewCreated] = useState('');
  let [newImage, setNewImage] = useState('');
  let [newLastWatchedEp, setNewLastWatchedEp] = useState('');

  //////////////////////
  // HELPER FUNCTIONS //
  //////////////////////

  // *** READ *** //

  // Function to Populate Show Data from BackEnd
  const getShows = () => {
    axios.get("https://fathomless-refuge-80112.herokuapp.com/shows/").then((response) => {
      setShows(response.data);
    })
  }

  // *** CREATE *** //

  // Function to Update New Name from Add Form
  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  // Function to Update New Genre from Add Form
  const handleNewGenre = (event) => {
    setNewGenre(event.target.value);
  }

  // Function to Update New Created from Add Form
  const handleNewCreated = (event) => {
    setNewCreated(event.target.value);
  }

  // Function to Update New Image from Add Form
  const handleNewImage = (event) => {
    setNewImage(event.target.value);
  }

  // Function to Update New Last Watched Episode from Add Form
  const handleNewLastWatchedEp = (event) => {
    setNewLastWatchedEp(event.target.value);
  }

  // Function to Handle Add Show Form Submission
  const handleNewShowSubmit = (event) => {
    // Prevent Form Default
    event.preventDefault();

    // Reformat Date
    let reformatCreated = [newCreated.split('-')[1], newCreated.split('-')[2], newCreated.split('-')[0]].join('-');

    // Make Object with New States
    const newShow = {
      name: newName,
      genre: newGenre,
      image: newImage,
      created: reformatCreated,
      lastWatchedEp: newLastWatchedEp
    };
    
    // Add Show to API with Axios Request
    axios.post(
      'https://fathomless-refuge-80112.herokuapp.com/shows/',
      newShow
    ).then(() => {
      axios.get('https://fathomless-refuge-80112.herokuapp.com/shows/')
        .then((response) => {
          setShows(response.data);
          event.target.reset();
          setNewName('');
          setNewGenre('');
          setNewCreated('');
          setNewImage('');
          setNewLastWatchedEp('');
        })
    })
  }

  ////////////////
  // USE EFFECT //
  ////////////////

  // Use Effect to Populate Show Data
  useEffect(()=>{
    getShows();
  }, [])

  ////////////////////////
  // BODY HTML ELEMENTS //
  ////////////////////////

  return (
    <>
      <Header/>
      <main>
        <section>
          <h1>Add New Show</h1>
          <AddForm handleNewName={handleNewName} handleNewGenre={handleNewGenre} handleNewCreated={handleNewCreated} handleNewImage={handleNewImage} handleNewLastWatchedEp={handleNewLastWatchedEp} handleNewShowSubmit={handleNewShowSubmit} />
        </section>
        <section>
          <h1>My Watch List</h1>
          <div className='shows-container'>
            {
              shows.map((show) => {
                return (
                  <div className='show-container' key={show._id}>
                    <Show show={show}/>
                  </div>
                )
              })
            }
          </div>
        </section>
        
      </main>
    </>
  );
}

////////////////
// EXPORT APP //
////////////////

export default App;
