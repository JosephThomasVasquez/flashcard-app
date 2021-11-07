import React from "react";

const CardList = ({ deck }) => {
  return <div>{JSON.stringify(deck.cards)}</div>;
};

export default CardList;
