import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import Card from "../Cards/Card";

const Study = () => {
  // use params for deckId
  const { deckId } = useParams();
  const history = useHistory();

  const initialCard = { currentCard: 0, total: 0, flipped: false };

  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState({ ...initialCard });

  const nextCard = () => {
    // prompt to restart cards or go back to Home
    if (currentCard.currentCard + 1 === currentCard.total) {
      const prompt = window.confirm("Restart cards?");

      prompt
        ? setCurrentCard({ ...currentCard, currentCard: 0, flipped: false })
        : history.push("/");
    } else {
      setCurrentCard({
        ...currentCard,
        currentCard: currentCard.currentCard + 1,
        flipped: !currentCard.flipped,
      });
    }
  };

  useEffect(() => {
    // fetch decks using utility function listDecks()
    const controller = new AbortController();
    const { signal } = controller;

    const getDeck = async () => {
      try {
        const response = await readDeck(deckId, signal);
        setDeck(response);
        setCurrentCard({
          ...currentCard,
          total: response.cards.length,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getDeck();

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
            <li className="breadcrumb-item" aria-current="page">
              {deck && <Link to={`/decks/${deck.id}`}>{deck.name}</Link>}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
      </div>
      {deck && (
        <>
          <h2>Study: {deck.name}</h2>
          <Card
            card={deck.cards[currentCard.currentCard]}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
            nextCard={nextCard}
          />
        </>
      )}
    </div>
  );
};

export default Study;
