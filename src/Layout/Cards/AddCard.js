import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";

const AddCard = ({ deck, getDeck }) => {
  const { deckId } = useParams();

  // using the useEffect() hook passing deckId
  useEffect(() => {
    const controller = new AbortController();

    getDeck(deckId);

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
      {/* If there is a deck then render CardForm and pass the deck and how to process the card */}
      {deck && <CardForm deck={deck} processCard={"add-card"} />}
    </div>
  );
};

export default AddCard;
