import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const CardList = ({ cards, handleDeleteCard }) => {
  const { url } = useRouteMatch();

  const cardMap = cards.map((card) => (
    <div key={`cardId-${card.id}`} className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <div className="small">{card.front}</div>
          </div>
          <div className="col-6">
            <div className="small">{card.back}</div>
          </div>
        </div>
        <div className="float-right">
          <Link to={`${url}/cards/${card.id}/edit`}>
            <button className="btn btn-secondary mr-2">Edit</button>
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteCard(card.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ));

  return <div>{cardMap}</div>;
};

export default CardList;
