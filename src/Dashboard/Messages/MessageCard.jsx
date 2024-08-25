import { useEffect, useState } from "react";
import axios from "axios";
//import { useSelector, useDispatch } from "react-redux";
//import { logout } from "../../Slices/AuthSlice";

function MessageDetail({ onSelectConversation }) {
  const [conversations, setConversations] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/messages`, {
          withCredentials: true,
        });
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  return (
    <div className="conversation-list">
      <h2>Conversations</h2>
      {conversations.map((conversation) => (
        <div
          key={conversation._id}
          onClick={() => onSelectConversation(conversation)}
          className="conversation-item"
        >
          <p>{conversation.participants.map((p) => p.username).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageDetail;
