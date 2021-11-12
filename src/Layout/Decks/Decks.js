import React from "react";
import { Link } from "react-router-dom";
import Deck from "./Deck";

const Decks = ({ decks, handleDeleteDeck }) => {
  // create a Deck component and pass deck data as props for each deck

  const deckList = decks.map((deck, index) => (
    <Deck
      key={`deckId-${deck.id}`}
      deck={deck}
      decks={decks}
      handleDeleteDeck={handleDeleteDeck}
    />
  ));

  return (
    <>
      <div className="row">
        <Link to="/decks/new">
          <button className="btn btn-secondary">Create New</button>
        </Link>
      </div>
      {deckList}
    </>
  );
};

export default Decks;
