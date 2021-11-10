import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api/index";
import CardForm from "./CardForm";

const EditCard = () => {
  const { deckId, cardId } = useParams();

  const [deck, setDeck] = useState(null);
  const [cardData, setCardData] = useState(null);

  // fetch decks using utility function listDecks()
  const controller = new AbortController();
  const { signal } = controller;

  useEffect(() => {
    const getDeck = async (signal) => {
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

  useEffect(() => {
    const getCard = async (signal) => {
      try {
        const response = await readCard(cardId, signal);
        setCardData(response);
        console.log("cardResponse", response);
      } catch (error) {
        console.log(error);
      }
    };

    getCard(signal);

    return () => {
      controller.abort();
    };
  }, [cardId]);

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
      {cardData && (
        <CardForm deck={deck} cardData={cardData} processCard={"edit-card"} />
      )}
    </div>
  );
};

export default EditCard;
