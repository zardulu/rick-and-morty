/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import { css } from '@emotion/react';

const linkStyle = css`
  text-decoration: none;
`;

// Define the styles for the Pagination buttons
const buttonStyles = css`
  background-color: black; 
  border: 1px solid #39FF14;
  border-radius: 5px;
  padding: 5px 10px;
  color: #39FF14;
`;

// More pagination styles
const paginationStyle = css`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px;
`;

// Define the styles for the filter section
const filterStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// Define the styles for the dropdown buttons
const selectStyle = css`
  font-size: 18px;
  background-color: black;
  color: #39FF14;
  border: 1px solid ;
  border-radius: 5px;  
  margin: 5px;
`;

function CharacterList({ characters, itemsPerPage, currentPage, onPageChange, onCharacterSelect }) {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
 
  // State for selected filter options
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedEpisode, setSelectedEpisode] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('');

  // State to store options for dropdown filters
  const [locationOptions, setLocationOptions] = useState([]);
  const [episodeOptions, setEpisodeOptions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [episodeUrlMap, setEpisodeUrlMap] = useState({});

  // Determine total number of pages based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Event handlers for filter changes
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleEpisodeChange = (event) => {
    setSelectedEpisode(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
  };

  // Fetch data from the Rick and Morty API 
  useEffect(() => {
    // Fetch location data from the API
    fetch('https://rickandmortyapi.com/api/location')
      .then((response) => response.json())
      .then((data) => {
        const locationNames = data.results.map((location) => location.name);
        setLocationOptions(['', ...locationNames]);
      })
      .catch((error) => console.error('Error fetching location data:', error));

    // Fetch episode data from the API
    fetch('https://rickandmortyapi.com/api/episode')
      .then((response) => response.json())
      .then((data) => {
        const episodeNames = data.results.map((episode) => episode.name);
        setEpisodeOptions(['', ...episodeNames]);
      })
      .catch((error) => console.error('Error fetching episode data:', error));

      fetch('https://rickandmortyapi.com/api/episode')
      .then(res => res.json())
      .then(data => {
        setEpisodeOptions(data.results.map(x => x.name));
        
        const urls = data.results.reduce((acc, ep) => {
          acc[ep.name] = ep.url;
          return acc;
        }, {});
        
        setEpisodeUrlMap(urls);
      });

    // Fetch species data for 'Alien'
    fetch('https://rickandmortyapi.com/api/character/?species=Alien')
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          setSpeciesOptions((prevOptions) => [...prevOptions, 'Alien']);
        }
      })
      .catch((error) => console.error('Error fetching Alien species data:', error));
  
  }, []);

  // Apply filters to the characters array
  const filteredCharacters = characters
    .filter((character) => character.name.toLowerCase().includes(searchTerm.toLowerCase())) // Search filter
    .filter((character) => !selectedStatus || character.status === selectedStatus) // Status filter 
    .filter((character) => !selectedLocation || character.location.name === selectedLocation) // Location filter
    .filter(char => {
      if (!selectedEpisode) return true;
      const url = episodeUrlMap[selectedEpisode];
      return char.episode.includes(url);
    }) // Episode filter
    .filter((character) => !selectedGender || character.gender === selectedGender) // Gender filter
    .filter((character) => !selectedSpecies || character.species === selectedSpecies) // Species filter

  // Determine total number of pages when filters applied  
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div>
      <div css={filterStyle}>
      <input css={selectStyle}
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select css={selectStyle} value={selectedStatus} onChange={handleStatusChange}>
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select css={selectStyle} value={selectedLocation} onChange={handleLocationChange}>
        <option value="">All Locations</option>
        {locationOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select css={selectStyle} value={selectedEpisode} onChange={handleEpisodeChange}>
        <option value="">All Episodes</option>
        {episodeOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select css={selectStyle} value={selectedGender} onChange={handleGenderChange}>
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select css={selectStyle} value={selectedSpecies} onChange={handleSpeciesChange}>
        <option value="">All Species</option>
        <option value="Alien">Alien</option>
        <option value="Human">Human</option>
      </select>

      </div>

       {/* Display filtered characters in a grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px',display: 'flex', flexWrap: 'wrap', justifyContent: 'center'  }}>
      {filteredCharacters.slice(startIndex, endIndex).map((character) => (
        <Link key={character.id}  to={`/character/${character.id}`}  css={linkStyle} onClick={() => onCharacterSelect(character.id)}>
          <CharacterCard character={character} />
        </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination" css={paginationStyle}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            css={buttonStyles}
            onClick={() => onPageChange(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CharacterList;
