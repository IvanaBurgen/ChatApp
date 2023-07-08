import React from "react";
import { useState, useEffect } from "react";

export default function InputButton(props) {
  const [text, setTexts] = useState("");

  function onMessageType(event) {
    setTexts(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    setTexts("");
    props.onSendMessage(text);
  }

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Napiši poruku"
          value={text}
          onChange={onMessageType}
        />
        <button disabled={!text}>Pošalji</button>
        {}
      </form>
    </div>
  );
}
