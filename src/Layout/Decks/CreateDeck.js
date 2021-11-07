import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeckForm from "./DeckForm";

const CreateDeck = () => {
  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Create Deck
            </li>
          </ol>
        </nav>
      </div>
      <h2>Create Deck</h2>
      <DeckForm processDeck={"create-deck"} />
    </div>
  );
};

export default CreateDeck;
