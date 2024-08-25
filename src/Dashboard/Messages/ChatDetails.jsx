import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Loader from "../../UtilityComponents/Loader";
import AdvertCard from "../../UtilityComponents/SmallAdvertCard"; // Import the AdvertCard component
import { useSelector } from "react-redux"; // Import useSelector

function ChatDetails() {
  const { chatId } = useParams();
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState(""); // State to hold the new message

  const apiUrl = import.meta.env.VITE_API_URL;

  const currentUser = useSelector((state) => state.user); // Replace with your actual state slice
  const userId = currentUser.userId;

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/user/messages/${chatId}`, {
          withCredentials: true,
        });

        setChat(response.data);
      } catch (error) {
        console.error("Error fetching chat details:", error);
        setError("Failed to load chat details");
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(
        `${apiUrl}/user/messages/${chatId}/reply`,
        { content: newMessage },
        {
          withCredentials: true,
        }
      );

      // Update the chat with the new message
      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, response.data],
      }));

      setNewMessage(""); // Clear the input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;
  if (!chat) return <div>No chat found</div>;

  const placeholderImage = "https://via.placeholder.com/150"; // Placeholder image URL

  // Identifying the seller by the postedBy field
  const sellerId = chat.advertId?.postedBy;
  const advertImage = chat.advertId?.imageUrls[0] || placeholderImage;

  // Find the other participant (the one we are chatting with)
  const otherParticipant = chat.participants.find((p) => p._id !== userId);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-4">
        Chat with {otherParticipant?.username}
      </h2>
      {/* Advert Card */}
      <AdvertCard advert={chat.advertId} />

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        {chat.messages.map((message) => {
          const isCurrentUser = message.sender._id === userId;
          const isSeller = message.sender._id === sellerId;

          // Use the advert image if the sender is the seller, otherwise use the placeholder image
          const profileImage = isSeller ? advertImage : placeholderImage;

          return (
            <div
              key={message._id}
              className={`flex items-start mb-4 ${
                isCurrentUser ? "justify-start" : "justify-end"
              }`}
              style={{
                flexDirection: isCurrentUser ? "row" : "row-reverse",
              }}
            >
              <div
                className={`flex items-start ${
                  isCurrentUser ? "mr-auto" : "ml-auto"
                }`}
                style={{
                  maxWidth: "70%",
                  textAlign: isCurrentUser ? "left" : "right",
                }}
              >
                <img
                  src={profileImage}
                  alt={message.sender.username}
                  className="w-10 h-10 rounded-full object-cover mx-4"
                />
                <div
                  className={`p-3 rounded-lg ${
                    isCurrentUser
                      ? "bg-gray-100 text-black"
                      : "bg-green-500 text-white"
                  }`}
                >
                  <p className="font-semibold">{message.sender.username}</p>
                  <p>{message.content}</p>
                  <span className="text-white-500 text-xs">
                    {formatDistanceToNow(new Date(message.sentAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply Text Bar */}
      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          className="flex-grow border rounded-lg p-2 mr-4"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatDetails;
