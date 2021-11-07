import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import Header from "./Header";
import Decks from "./Decks/Decks";
import Study from "./study/Study";
import DeckView from "./Decks/DeckView";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import NotFound from "./NotFound";
import { Link, Route, Switch } from "react-router-dom";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // fetch decks using utility function listDecks()
    const controller = new AbortController();
    const { signal } = controller;

    const getDecks = async () => {
      try {
        const response = await listDecks(signal);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
    };

    getDecks();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}

        <Switch>
          <Route exact path="/">
            <Decks decks={decks} />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study decks={decks} />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck />
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
