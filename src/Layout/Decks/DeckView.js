import React, { useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import CardList from "../Cards/CardList";

const DeckView = ({ deck, getDeck, handleDeleteDeck, handleDeleteCard }) => {
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    // fetch decks using utility function getDeck()
    const controller = new AbortController();
    const { signal } = controller;

    getDeck(deckId, signal);

    return () => {
      controller.abort();
    };
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck && deck.name}
          </li>
        </ol>
      </nav>
      {deck && (
        <div>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                {deck.name}{" "}
                <div className="float-right small">
                  {deck.cards.length} cards
                </div>
              </h4>
              <p className="card-text">{deck.description}</p>

              <Link to={`${url}/edit`}>
                <button className="btn btn-secondary mr-2">Edit</button>
              </Link>

              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                Study
              </Link>

              <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-primary">Add Cards</button>
              </Link>

              <button
                className="btn btn-danger float-right"
                onClick={() => handleDeleteDeck(deck)}
              >
                Delete
              </button>
            </div>
          </div>
          <div>
            <h2>Cards</h2>
            <CardList cards={deck.cards} handleDeleteCard={handleDeleteCard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckView;
