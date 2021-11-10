import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import CardForm from "./CardForm";

const AddCard = () => {
  const { deckId } = useParams();
  const { url } = useRouteMatch();

  const [deck, setDeck] = useState();

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
              Add Card
            </li>
          </ol>
        </nav>
      </div>
      <h2>Add Card</h2>
      {deck && <CardForm deck={deck} processCard={"add-card"} />}
    </div>
  );
};

export default AddCard;
