import React from "react";
import Decks from "./Decks/Decks";

const Home = ({ decks, handleDeleteDeck }) => {
  return (
    <div>
      <Decks decks={decks} handleDeleteDeck={handleDeleteDeck} />
    </div>
  );
};

export default Home;
