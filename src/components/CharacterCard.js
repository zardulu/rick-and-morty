/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

// Define the styles for the CharacterCard
const cardStyle = css`
  border: 1px solid #ddd;
  border-color: #39FF14;
  border-radius: 10px;
  padding: 0px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #000000;
  cursor: pointer; /* Add cursor style to indicate it's clickable */
`;

const imageStyle = css`
  width: 90%; /* Make the image cover the full width of the card */
  border-radius: 10px;
  
  margin: 10px;
  
`;

const linkStyle = css`
  text-decoration: none;
  color: #FFFFFF;
`;

// Renders individual profile card
function CharacterCard({ character, onClick }) {
  const handleCardClick = () => {
    if (onClick) {
      onClick(character);
    }
  };

  return (
    <div css={[cardStyle,linkStyle]} onClick={handleCardClick}> 
      <img src={character.image} alt={character.name} css={imageStyle} />
      <h3>{character.name}</h3>
      <p>Status: {character.status}</p>
      <p>Location: {character.location.name}</p>
      <p>Episode: {character.episode.length}</p>
    </div>
  );
}

export default CharacterCard;
