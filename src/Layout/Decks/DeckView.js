import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api/index";
import CardList from "../Cards/CardList";

const DeckView = () => {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  const [deck, setDeck] = useState(null);

  console.log("url", url);

  useEffect(() => {
    // fetch decks using utility function listDecks()
    const controller = new AbortController();
    const { signal } = controller;

    const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
    };

    getDeck();

    return () => {
      controller.abort();
    };
  }, [deckId]);

  const handleDeleteDeck = async () => {
    window.confirm(`Delete the deck "${deck.name}"`);
    await deleteDeck(deck.id);
    history.push("/");
  };

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
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              {deck.name}{" "}
              <div className="float-right small">{deck.cards.length} cards</div>
            </h4>
            <p className="card-text">{deck.description}</p>
            <Link to={`${url}/edit`}>
              <button className="btn btn-secondary mr-2">Edit</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
            <button
              className="btn btn-danger float-right"
              onClick={handleDeleteDeck}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckView;
