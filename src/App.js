import { useEffect, useState } from "react";
import "./App.css";
import Messages from "./Messages";
import InputButton from "./InputButton";

export default function App() {
  function randomUser() {
    const firstNames = [
      "Ante",
      "Ivana",
      "Gabrijela",
      "Matea",
      "Branimir",
      "Igor",
      "Stjepan",
      "Mihaela",
      "Goran",
      "Ida",
    ];

    const lastNames = [
      "Horvat",
      "Mikić",
      "Marić",
      "Dumenčić",
      "Raos",
      "Jurčević",
      "Đukić",
      "Martić",
      "Gerin",
      "Mikulić",
    ];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return firstName + " " + lastName;
  }

  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  const [message, setMessages] = useState([]);

  const [member, setMembers] = useState({
    username: randomUser(),
    color: randomColor(),
  });

  const [drone, setDrone] = useState();

  useEffect(() => {
    const drone = new window.Scaledrone("du9ChObUvJkjWun4", {
      data: member,
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Successfully connected to Scaledrone");

      member.id = drone.clientId;
      setMembers(member);
    });

    const room = drone.subscribe("observable-room");
    room.on("message", (message) => {
      setMessages((prevState) => [...prevState, message]);
    });
    console.log("Successfully joined room");

    setDrone(drone);
  }, [member]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
    console.log("poslano " + message);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="chat-app-logo.svg" className="logo" />
      </header>
      <Messages message={message} currentMember={member} />
      <InputButton onSendMessage={onSendMessage} />
    </div>
  );
}
