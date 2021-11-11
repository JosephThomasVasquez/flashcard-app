import React, { useState, useEffect } from "react";
import {
  listDecks,
  readDeck,
  deleteDeck,
  deleteCard,
} from "../utils/api/index";
import Header from "./Header";
import Decks from "./Decks/Decks";
import Study from "./study/Study";
import DeckView from "./Decks/DeckView";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import NotFound from "./NotFound";
import { Route, Switch, useHistory } from "react-router-dom";

function Layout() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState(null);

  const controller = new AbortController();
  const { signal } = controller;

  const getDecks = async (signal) => {
    try {
      // fetch decks using utility function listDecks()
      const response = await listDecks(signal);
      setDecks(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDecks(signal);
    return () => {
      controller.abort();
    };
  }, []);

  const getDeck = async (deckId, signal) => {
    try {
      const response = await readDeck(deckId, signal);
      setDeck(response);
    } catch (error) {
      console.log(error);
    }
  };

  const addDeck = (deck) => {
    deck.cards = [];
    setDecks([...decks, deck]);
  };

  const handleDeleteDeck = async (deck, signal) => {
    window.confirm(`Delete the deck "${deck.name}"`);
    await deleteDeck(deck.id);
    getDecks(signal);
    history.push("/");
  };

  const handleDeleteCard = async (cardId) => {
    window.confirm("Delete the card?");
    await deleteCard(cardId, signal);
    getDecks(signal);
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks decks={decks} handleDeleteDeck={handleDeleteDeck} />
          </Route>

          <Route path="/decks/new">
            <CreateDeck addDeck={addDeck} />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckView
              deck={deck}
              getDeck={getDeck}
              handleDeleteDeck={handleDeleteDeck}
              handleDeleteCard={handleDeleteCard}
            />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study decks={decks} />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck deck={deck} getDeck={getDeck} />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard deck={deck} getDeck={getDeck} />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard deck={deck} getDeck={getDeck} />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
