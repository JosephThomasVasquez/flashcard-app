import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateCard, createCard } from "../../utils/api/index";

const CardForm = ({ deck, cardData, processCard }) => {
  const history = useHistory();
  const { deckId } = useParams();

  //   set initial form data object
  const initialFormData = {
    id: "",
    deckId: deck.id,
    front: "",
    back: "",
  };

  // sets initial state if there is deckdata otherwise set initial form data
  const [cardFormData, setCardFormData] = useState(
    processCard === "edit-card" ? { ...cardData } : { ...initialFormData }
  );

  // update state with deck form data
  const handleChange = ({ target }) => {
    setCardFormData({ ...cardFormData, [target.name]: target.value });
  };

  //   handle submit deck form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const { signal } = controller;

    // uses createCard() utility function and resets initial form data
    if (processCard === "add-card") {
      await createCard(deck.id, cardFormData, signal);
      setCardFormData({ ...initialFormData });
      history.push(`/decks/${deckId}`);
    }

    // uses updateCard() utility function and resets initial form data
    if (processCard === "edit-card") {
      await updateCard(cardFormData, signal);
      setCardFormData({ ...initialFormData });
      history.push(`/decks/${deckId}`);
    }
  };

  return (
    <div className="row">
      <div className="col">
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-start flex-column">
            <label htmlFor="front" className="h6 my-2">
              Front
            </label>
            <textarea
              type="text"
              name="front"
              id="front"
              placeholder="Front side of card"
              className="my-2"
              cols="30"
              rows="2"
              onChange={handleChange}
              value={cardFormData.front}
            ></textarea>
            <label htmlFor="back" className="h6 my-2">
              Back
            </label>
            <textarea
              name="back"
              id="back"
              placeholder="Back side of card"
              className="my-2"
              cols="30"
              rows="2"
              onChange={handleChange}
              value={cardFormData.back}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-secondary mr-2 my-2">
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

export default CardForm;
