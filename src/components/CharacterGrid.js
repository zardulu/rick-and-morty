import React from 'react';
import CharacterCard from './CharacterCard';
import { css } from '@emotion/react';

// Define the styles for the grid
const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

function CharacterGrid({ characters }) {
  return (
    <div css={gridStyle} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CharacterGrid;
