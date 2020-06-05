import React, { useState, useEffect } from "react";
import ApiService from "../../services/api-service";
import Axios from "axios";
import config from "../../config.js";
import "./LikeButton.css";

import TokenService from "../../services/token-service";

export default function LikeButton(props) {
  const [like, setLike] = useState(false);
  const [counter, setCounter] = useState(0);
  const variable = { attached_to: props.attached_to };
  const userId = JSON.parse(TokenService.getUser()).id;
  const id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const upLikeVariable = {
    attached_to: props.attached_to,
    user: userId,
    id: id,
  };

  useEffect(() => {
    Axios.post(`${config.API_ENDPOINT}/likes/getLikes`, variable)
    // ApiService.getAllLikes(variable)
        .then(response => {
            if (response.data.success) {
                setCounter(response.data.likes.length)
                response.data.likes.map(like => {
                    if (like.user === userId) {
                        setLike(true)
                    }
                    return null
                })
            } else {
                console.log('Failed to get likes')
            }
        })
  }, [variable, userId]);

  const onLike = () => {
    setLike(!like);

    if (!like) {
      Axios.post(
        `${config.API_ENDPOINT}/likes/upLike`,
        upLikeVariable
      ).then(setCounter(counter + 1));
      // ApiService.upLike(upLikeVariable).then(setCounter(counter + 1))
    } else ApiService.unLike().then(setCounter(counter - 1));
  };
  return (
    <div className="like-button-container">
      <button
        className="like-button"
        type="button"
        style={{
          color: !like ? "lightgray" : "rgba(203, 80, 255, 0.735)",
        }}
        onClick={onLike}
      >
        &hearts;
      </button>
      <div
        className="like-text"
        type="button"
        style={{
          color: !like ? "#212121" : "rgba(203, 80, 255, 0.735)",
        }}
        onClick={onLike}
      >
        Like
      </div>
      <div className="counter">{counter}</div>
    </div>
  );
}