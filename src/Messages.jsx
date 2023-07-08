import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Messages({ message, currentMember }) {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  function showMessage(message) {
    const { member, data } = message;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe
      ? "Messages-message currentMember"
      : "Messages-message";

    return (
      <li className={className} key={uuidv4()}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{data}</div>
        </div>
      </li>
    );
  }

  return (
    <div>
      <ul className="Messages-list">
        {message && message.map((message) => showMessage(message))}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
}
