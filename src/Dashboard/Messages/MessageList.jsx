import axios from "axios";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TokenExpiredModal from "../../UtilityComponents/TokenExpiredModal"; // Adjust the path based on your project structure
import { logoutUser } from "../../Slices/AuthSlice"; // Adjust the path based on your project structure

function MessagesList() {
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage the modal display
  const[markMessageAsRead, setMarkMessageAsRead] = useState(false)

  const apiUrl = import.meta.env.VITE_API_URL; // Update with your API URL

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);

        // Fetch conversations
        const response = await axios.get(`${apiUrl}/chats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setConversations(response.data);
        console.log('setConversation is', response.data[0])
        //this is what I am looking for response.data.
      } catch (error) {
        if (error?.response?.status === 404) {
          setError("You don't have any messages yet");
        } else if (error?.response?.status === 500) {
          // Force log out on 500 error
          setShowModal(true); // Show modal when status is 500
        } else {
          setError("Failed to load conversations");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token, apiUrl]);

   const handleSignOut = async () => {
     await dispatch(logoutUser());
     navigate("/login"); // Redirect after successful logout
   };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (showModal) {
    return <TokenExpiredModal onSignOut={handleSignOut} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {conversations.length === 0 ? (
        <div>No messages yet.</div>
      ) : (
        conversations.map((conversation) => (
          <MessageCard
            key={conversation._id}
            conversation={conversation}
            unreadCount={unreadCounts[conversation._id] || 0}
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
      to={`/chats/${conversation._id}`}
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
