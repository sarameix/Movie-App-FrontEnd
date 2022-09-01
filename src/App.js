/////////////
// IMPORTS //
/////////////

import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

////////////////
// COMPONENTS //
////////////////

import Header from './components/Header';
import AddForm from './components/AddForm';
import Show from './components/Show';
import SortForm from './components/SortForm';
import RandomShow from './components/RandomShow';

//////////////////
// APP FUNCTION //
//////////////////

const App = () => {

  ////////////
  // STATES //
  ////////////

  let [shows, setShows] = useState([]);
  let [displayPage, setDisplayPage] = useState('watchList');
  let [sortBy, setSortBy] = useState('mostRecent');
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
      setShows(response.data.sort((a, b) => {
        let aDate = a.updatedAt.toUpperCase();
        let bDate = b.updatedAt.toUpperCase();

        if (aDate < bDate) {
          return 1;
        }
        if (aDate > bDate) {
            return -1;
        }
        return 0;
      }));
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
          setShows(sortShowArray('mostRecent', response.data));
          event.target.reset();
          setNewName('');
          setNewGenre('');
          setNewCreated('');
          setNewImage('');
          setNewLastWatchedEp('');
          setDisplayPage('watchList');
        })
    })
  }

  // *** DELETE *** //

  // Function to Delete Show
  const handleDelete = (showData) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete ${showData.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            axios.delete(`https://fathomless-refuge-80112.herokuapp.com/shows/${showData._id}`)
            .then(() => {
              axios.get('https://fathomless-refuge-80112.herokuapp.com/shows/')
                .then((response) => {
                  setShows(sortShowArray('mostRecent', response.data));
                })
            })
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  // *** MISC *** //

  // Function to Toggle Pages
  const handleDisplayChange = (event) => {
    setDisplayPage(event.target.value);
  }

  // Function to Sort Array of Show Objects
  const sortShowArray = (key, showsArray) => {
    const sortedShows = showsArray;
    if (key === 'mostRecent') {
      sortedShows.sort((a, b) => {
        let aDate = a.updatedAt.toUpperCase();
        let bDate = b.updatedAt.toUpperCase();

        if (aDate < bDate) {
          return 1;
        }
        if (aDate > bDate) {
            return -1;
        }
        return 0;
      });
    } else if (key === 'showName') {
      sortedShows.sort((a, b) => {
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();

        if (aName < bName) {
            return -1;
        }
        if (aName > bName) {
            return 1;
        }
        return 0;
      });
    } else if (key === 'showGenre') {
      sortedShows.sort((a, b) => {
        let aGenre = a.genre.toLowerCase();
        let bGenre = b.genre.toLowerCase();

        if (aGenre < bGenre) {
            return -1;
        }
        if (aGenre > bGenre) {
            return 1;
        }
        return 0;
      });
    }
    
    // Return Sorted Array
    return sortedShows;
  }

  // Function to Re-Sort Shows When Sort Dropdown Changes
  const handleSortChange = (event) => {
    // Prevent Form Default
    event.preventDefault();

    // Set Sort By State
    setSortBy(event.target.value);
    axios.get("https://fathomless-refuge-80112.herokuapp.com/shows/")
      .then((response) => {
        const sortedShows = sortShowArray(event.target.value, response.data);
        console.log(event.target.value, sortedShows);
        setShows(sortedShows);
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
      <Header handleDisplayChange={handleDisplayChange} />
      <main>
        {
          displayPage === 'watchList' ?
            <section>
              <h1 className='page-header'>My Watch List</h1>
              <SortForm handleSortChange={handleSortChange} />
              <div className='shows-container'>
                {
                  shows.map((show) => {
                    return (
                      <Show show={show} handleDelete={handleDelete} setShows={setShows} sortShowArray={sortShowArray} key={show._id} />
                    )
                  })
                }
              </div>
            </section>
           :displayPage === 'addForm' ?
            <section>
              <h1 className='page-header'>Add New Show</h1>
              <AddForm handleNewName={handleNewName} handleNewGenre={handleNewGenre} handleNewCreated={handleNewCreated} handleNewImage={handleNewImage} handleNewLastWatchedEp={handleNewLastWatchedEp} handleNewShowSubmit={handleNewShowSubmit} />
            </section>
            
            :displayPage === 'randomMovie' ?
            <section>
            <RandomShow show={shows}/>
            </section>
          :
            null
        }
      </main>
      <footer>
        <h5 className="footer-text">© 2022</h5>
        <h5 className="footer-logo">T.V. Tracker.</h5>
        <h5>All Rights Reserved.</h5>
      </footer>
    </>
  );
}

////////////////
// EXPORT APP //
////////////////

export default App;
