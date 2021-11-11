import React from "react";
import { Link } from "react-router-dom";

const Deck = ({ deck, handleDeleteDeck }) => {
  return (
    deck && (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">
            {deck.name}{" "}
            <div className="float-right small">{deck.cards.length} cards</div>
          </h4>
          <p className="card-text">{deck.description}</p>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
            View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            Study
          </Link>
          <button
            className="btn btn-danger float-right"
            onClick={() => handleDeleteDeck(deck)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default Deck;
