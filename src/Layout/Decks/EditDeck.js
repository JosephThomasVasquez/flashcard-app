import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck } from "../../utils/api/index";

const EditDeck = () => {
  const history = useHistory();
  const { deckId } = useParams();
  console.log("history:", history);

  const [deck, setDeck] = useState(null);

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

    getDeck(signal);

    return () => {
      controller.abort();
    };
  }, [deckId]);

  return (
    deck && (
      <div>
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Deck
              </li>
            </ol>
          </nav>
        </div>
        <h2>Edit Deck</h2>
        <DeckForm editDeckData={deck} processDeck={"edit-deck"} />
      </div>
    )
  );
};

export default EditDeck;
