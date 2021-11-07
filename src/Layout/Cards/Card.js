import React, { useState } from "react";

const Card = ({ card, currentCard, setCurrentCard, nextCard }) => {
  //   return null if currentCard does not exist
  if (!card) return null;

  const notEnoughCards = () => {
    const cardDetails = (
      <div className="card">
        <div className="card-body">
          <div className="card-text my-4">
            <p className="card-text h4 my-4">
              Card {currentCard.currentCard + 1} of {currentCard.total}
            </p>
            {!currentCard.flipped ? card.front : card.back}
          </div>
          <button className="btn btn-secondary mr-2" onClick={handleFlipCard}>
            Flip
          </button>
          {/* Show Next button if card is flipped */}
          {currentCard.flipped && (
            <button className="btn btn-primary" onClick={() => nextCard()}>
              Next
            </button>
          )}
        </div>
      </div>
    );

    const addCards = (
      <div className="card">
        <div className="card-body">
          <div className="card-text my-4">
            <p className="card-text h4 my-4">Not enough cards.</p>
            You need at least 3 cards to study. There are {
              currentCard.total
            }{" "}
            cards in this deck.
          </div>
          <button className="btn btn-primary" onClick={() => nextCard()}>
            Add Cards
          </button>
        </div>
      </div>
    );
    return currentCard.total <= 2 ? addCards : cardDetails;
  };

  //   handle card flip from card.front to card.back
  const handleFlipCard = () => {
    !currentCard.flipped
      ? setCurrentCard({ ...currentCard, flipped: true })
      : setCurrentCard({ ...currentCard, flipped: false });
  };

  return <div>{notEnoughCards()}</div>;
};

export default Card;
