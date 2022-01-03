import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard } from "../../utils/api/index";
import CardForm from "./CardForm";

const EditCard = ({ deck, getDeck }) => {
  const { deckId, cardId } = useParams();
  const [cardData, setCardData] = useState(null);

  // get card using utility function readCard() and update form data
  const getCard = async (signal) => {
    try {
      const response = await readCard(cardId, signal);
      setCardData(response);
      console.log("cardResponse", response);
    } catch (error) {
      console.log(error);
    }
  };

  // using getDeck in a useEffect() hook with deckId dependency so there is no infinite loop
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getDeck(deckId);
    getCard(signal);

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
              Edit Card
            </li>
          </ol>
        </nav>
      </div>
      <h2>Edit Card</h2>
      {/* If there is cardData then render CardForm and pass the deck, cardData and how to process the card */}
      {cardData && (
        <CardForm deck={deck} cardData={cardData} processCard={"edit-card"} />
      )}
    </div>
  );
};

export default EditCard;
