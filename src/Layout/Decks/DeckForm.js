import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../../utils/api/index";

const DeckForm = ({ processDeck }) => {
  const history = useHistory();

  //   set initial form data object
  const initialFormData = {
    name: "",
    description: "",
    id: "",
  };

  const [deckFormData, setDeckFormData] = useState({ ...initialFormData });

  // update state with deck form data
  const handleChange = ({ target }) => {
    setDeckFormData({ ...deckFormData, [target.name]: target.value });
    console.log("deckFormData:", deckFormData);
  };

  //   handle submit deck form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (processDeck === "create-deck") {
      const response = await createDeck(deckFormData);
      setDeckFormData({ ...initialFormData });
      history.push(`/decks/${response.id}`);
      console.log("Creating Deck..", deckFormData);
    }

    if (processDeck === "edit-deck") {
      const response = await createDeck(deckFormData);
      setDeckFormData({ ...initialFormData });
      history.push(`/decks/${response.id}`);
      console.log("Creating Deck..", deckFormData);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-start flex-column">
            <label htmlFor="name" className="h6 my-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Deck Name"
              className="my-2"
              onChange={handleChange}
              value={deckFormData.name}
            />
            <label htmlFor="description" className="h6 my-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Brief description of the deck"
              className="my-2"
              cols="30"
              rows="5"
              onChange={handleChange}
              value={deckFormData.description}
            ></textarea>
          </div>
          <div>
            <button type="button" className="btn btn-secondary mr-2 my-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeckForm;
