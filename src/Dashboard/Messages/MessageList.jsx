import axios from "axios";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

function MessagesList() {
  const [conversations, setConversations] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({}); // State to hold unread counts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/user/messages`, {
          withCredentials: true,
        });
        setConversations(response.data);

        // Fetch unread counts
        const unreadResponse = await axios.get(
          `${apiUrl}/user/messages/unread/count`,
          {
            withCredentials: true,
          }
        );
        setUnreadCounts(unreadResponse.data); // Assuming the response is an object with chatId as keys
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("You don't have any messages yet");
        } else error;
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      {error}
      {conversations.length === 0 ? (
        <div>No messages yet.</div>
      ) : (
        conversations.map((conversation) => (
          <MessageCard
            key={conversation._id}
            conversation={conversation}
            unreadCount={unreadCounts[conversation._id] || 0} // Pass unread count to the MessageCard
          />
        ))
      )}
    </div>
  );
}

function MessageCard({ conversation, unreadCount }) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const lastMessageSender = lastMessage.sender;

  const profileImage =
    lastMessageSender.profileImage || "https://via.placeholder.com/150";

  const sentTime = formatDistanceToNow(
    new Date(lastMessage?.sentAt || new Date()),
    {
      addSuffix: true,
    }
  );

  return (
    <Link
      to={`/messages/${conversation._id}`}
      className="block border rounded-lg p-4 mb-4 bg-white shadow-md hover:bg-gray-100"
    >
      <div className="flex items-center">
        <img
          src={profileImage}
          alt={lastMessageSender.username || "Placeholder Image"}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">
            {lastMessageSender.username || "Unknown"}
          </h3>
          <p className="text-gray-600">
            {lastMessage?.content.length > 30
              ? `${lastMessage.content.substring(0, 30)}...`
              : lastMessage?.content || "No message"}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 text-sm">{sentTime}</span>
          {unreadCount > 0 && <span className="ml-4 badge">{unreadCount}</span>}
        </div>
      </div>
    </Link>
  );
}

export default MessagesList;
