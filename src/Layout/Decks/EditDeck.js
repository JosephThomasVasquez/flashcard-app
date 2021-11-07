import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";
import { readDeck } from "../../utils/api/index";

const EditDeck = () => {
  const history = useHistory();
  console.log("history:", history);

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Deck
            </li>
          </ol>
        </nav>
      </div>
      <h2>Edit Deck</h2>
      <DeckForm processDeck={"edit-deck"} />
    </div>
  );
};

export default EditDeck;
