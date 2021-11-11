import React from "react";

const Card = ({ card, currentCard, setCurrentCard, nextCard }) => {
  //   handle card flip from card.front to card.back
  const handleFlipCard = () => {
    !currentCard.flipped
      ? setCurrentCard({ ...currentCard, flipped: true })
      : setCurrentCard({ ...currentCard, flipped: false });
  };

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
        {currentCard.flipped && (
          <button className="btn btn-primary" onClick={() => nextCard()}>
            Next
          </button>
        )}
      </div>
    </div>
  );

  return <div>{card && cardDetails}</div>;
};

export default Card;
