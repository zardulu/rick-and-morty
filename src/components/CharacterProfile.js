/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';

// Define the styles for the container
const containerStyle = css`
  display: flex;
  justify-content: space-between; 
  padding: 16px;
  margin: 8px;
  flex-wrap: wrap;
`;

// Define the styles for the profile image
const imageStyle = css`
  width: 100%;
  max-width: 200px;
  border-radius: 10px;
`;

// Define the styles for the columns
const columnStyle = css`
  flex: 1; 
  min-width: 300px;
  border: 1px solid #2B1F31;
  border-radius: 10px;
  padding: 16px;
  margin: 8px;
  box-sizing: border-box; 
  background-color: #A6FF96;
`;

const columnHeadingStyle = css`
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #032D3C;
`;

const bodyTextStyle = css`
  color: #032D3C;
`
// Renders the profile page for individual character
function CharacterProfile({ characterId }) {

  const [character, setCharacter] = useState(null);
  const [originLocation, setOriginLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [episodes, setEpisodes] = useState([]); 

  useEffect(() => {
    const characterUrl = `https://rickandmortyapi.com/api/character/${characterId}`; // Dynamic URL to fetch character by ID
    
    // Fetch the character's details
    fetch(characterUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCharacter(data);

        // Fetch the character's origin location details
        fetch(data.origin.url)
          .then(response => response.json())
          .then(originData => setOriginLocation(originData))
          .catch(error => console.error('Error fetching origin location:', error));

        // Fetch the character's current location details  
        fetch(data.location.url)
          .then(response => response.json())
          .then(locationData => setCurrentLocation(locationData))
          .catch(error => console.error('Error fetching current location:', error));

        // Fetch the list of episodes
        Promise.all(data.episode.map(episodeUrl => 
          fetch(episodeUrl).then(response => response.json())
        ))
        .then(episodeData => setEpisodes(episodeData))
        .catch(error => console.error('Error fetching episodes:', error));
        
      })
      .catch(error => console.error('Error fetching character details:', error));

  }, [characterId]);
  
  // Loading...
  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div css={containerStyle}>

       {/* Profile details */}
      <div css={columnStyle}>
        <h2 css={columnHeadingStyle}>{character.name}</h2>
        <img src={character.image} alt={character.name} css={imageStyle} />
        <p css={bodyTextStyle}>Species: {character.species}</p>
        <p css={bodyTextStyle}>Gender: {character.gender}</p>
        
        {/* Origin Location details */}
        <h3>Origin Location - </h3>
        {originLocation && 
          <div css={bodyTextStyle}>
            <p>Name: {originLocation.name}</p>
            <p>Dimension: {originLocation.dimension}</p>
            <p>Residents: {originLocation.residents.length}</p>
          </div>
        }
        
        {/* Current Location details */}
        <h3>Current Location - </h3>
        {currentLocation &&
          <div css={bodyTextStyle} >
            <p>Name: {currentLocation.name}</p>
            <p>Dimension: {currentLocation.dimension}</p>
            <p>Residents: {currentLocation.residents.length}</p>
          </div>
        }

      </div>

      <div css={columnStyle}>
         {/* Episode list */}
        <h3 css={columnHeadingStyle}>Episodes</h3>
        <ul>
          {episodes.map(episode => (
            <li css={columnHeadingStyle} key={episode.id}>{episode.name}</li>
          ))}
        </ul>
      </div>

    </div>
  );
  
}

export default CharacterProfile;