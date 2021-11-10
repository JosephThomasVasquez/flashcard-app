import React from "react";
import { Link } from "react-router-dom";

const NotEnoughCards = ({ totalCards }) => {
  console.log("totalCards", totalCards);
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-text my-4">
          <h2 className="h4 my-4">Not enough cards.</h2>
          You need at least 3 cards to study. There are {totalCards} cards in
          this deck.
        </div>
        <Link to={`cards/new`}>
          <button className="btn btn-primary mr-2">Add Cards</button>
        </Link>
      </div>
    </div>
  );
};

export default NotEnoughCards;
