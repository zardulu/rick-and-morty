import React, { useState, useEffect } from 'react';
import CharacterList from './components/CharacterList';
import { Global, css } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterProfile from './components/CharacterProfile';
import logo from './logo.png';
import { Link } from 'react-router-dom';

// Global styles for the entire application
const globalStyles = css`
  body {
    font-family: Bahnschrift, sans-serif;
  }
`;

function App() {
  const [characters, setCharacters] = useState([]); // State to store characters fetched from the API
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page for pagination
  const itemsPerPage = 8; // Number of characters to display per page
  const [selectedCharacterId, setSelectedCharacterId] = useState(null); // State to store the selected character's ID

  useEffect(() => {
    // Function to fetch characters from a specific page
    const fetchCharactersFromPage = (page) => {
      fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacters((prevCharacters) => [...prevCharacters, ...data.results]); // Concatenate new characters to the existing character state
        })
        .catch((error) => {
          console.error('Error fetching characters:', error);
        });
    };

    // Fetch characters from the first page (page 1)
    fetchCharactersFromPage(1);

    // Fetch characters from subsequent pages up to page 4 (can be changed as per requirement)
    for (let page = 2; page <= 4; page++) {
      fetchCharactersFromPage(page);
    }
  }, []);

  // Handle page change for pagination
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="App">
      <Global styles={globalStyles} /> 

       {/* Set up React Router for navigation */}
      <Router>
        <Link to="/">
          <img 
            src={logo}
            alt="logo"
            style={{ width: '200px', height: '60px', margin: '20px' }}
          />
        </Link>

        <Routes>
          {/* Route for the home page displaying the character list */}
          <Route
            path="/"
            element={
              <CharacterList
                characters={characters}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onCharacterSelect={setSelectedCharacterId}
              />
            }
          />
          <Route
            path="/character/:id"
            element={<CharacterProfile characterId={selectedCharacterId} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
