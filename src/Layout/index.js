import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck, deleteCard } from "../utils/api/index";
import Header from "./Header";
import Decks from "./Decks/Decks";
import Study from "./study/Study";
import DeckView from "./Decks/DeckView";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import NotFound from "./NotFound";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

function Layout() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  const controller = new AbortController();
  const { signal } = controller;

  const getDecks = async (signal) => {
    try {
      const response = await listDecks(signal);
      setDecks(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // fetch decks using utility function listDecks()

    getDecks(signal);
    return () => {
      controller.abort();
    };
  }, []);

  const handleDeleteDeck = async (deck, signal) => {
    window.confirm(`Delete the deck "${deck.name}"`);
    await deleteDeck(deck.id);
    getDecks(signal);
    history.push("/");
  };

  const addDeck = (deck) => {
    deck.cards = [];
    setDecks([...decks, deck]);
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
              handleDeleteDeck={handleDeleteDeck}
              handleDeleteCard={handleDeleteCard}
            />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study decks={decks} />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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
