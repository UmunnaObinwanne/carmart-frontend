import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../UtilityFunctions/Socket";
import axios from "axios";
import Loader from "../../UtilityComponents/Loader";
import AdvertCard from "../../UtilityComponents/SmallAdvertCard";
import { formatDistanceToNow } from "date-fns";
import TokenExpiredModal from "../../UtilityComponents/TokenExpiredModal";
import { logoutUser } from "../../Slices/AuthSlice";

function ChatDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { chatId } = useParams();
  const token = useSelector((state) => state.user?.token);
  const userId = useSelector((state) => state.user?.userId);

  const [chat, setChat] = useState(null);
  const [participants, setParticipants] = useState({});
  const [advert, setAdvert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sellerImage, setSellerImage] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const placeholderImage = "https://via.placeholder.com/150";
  

  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const chatResponse = await axios.get(`${apiUrl}/chats/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setChat(chatResponse.data);

        const participantsMap = chatResponse.data.participants.reduce(
          (acc, participant) => {
            acc[participant._id] = participant.username;
            return acc;
          },
          {}
        );
        setParticipants(participantsMap);

        const advertResponse = await axios.get(
          `${apiUrl}/adverts/${chatResponse.data.advertId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setAdvert(advertResponse.data);
        setSellerImage(advertResponse.data.imageUrls[0]);
      } catch (error) {
        if (error?.response?.status === 500) {
          setShowModal(true);
        } else {
          console.error("Failed to fetch chat or advert details:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChatDetails();

    socket.emit("joinRoom", { chatId });

    socket.on("receiveMessage", (message) => {
      setChat((prevChat) => {
        const isDuplicate = prevChat.messages.some(
          (msg) => msg._id === message._id
        );

        if (isDuplicate) {
          return prevChat;
        }

        return {
          ...prevChat,
          messages: [...prevChat.messages, message],
        };
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId, token, apiUrl]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(
        `${apiUrl}/chats/${chatId}/messages`,
        { content: newMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      const sentMessage = response.data.chat.messages.pop();

      setChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, sentMessage],
      }));

      socket.emit("sendMessage", {
        chatId,
        message: sentMessage,
      });

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  if (loading) return <Loader />;
  if (showModal) {
    return <TokenExpiredModal onSignOut={handleSignOut} />;
  }

  const otherParticipant = chat?.participants.find((p) => p._id !== userId);
 

  return (
    <div className="container mx-auto py-8 px-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h2 className="text-2xl font-bold mb-4">
        Chat with {otherParticipant?.username || "Participant"}
      </h2>

      {advert ? <AdvertCard advert={advert} /> : <div>Loading advert...</div>}

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md mb-4">
        {chat?.messages
          .filter((message) => message.sender && message.content)
          .map((message) => {
            const senderId = message.sender?._id || message.sender;
            const senderName = participants[senderId] || "Unknown";
            const isCurrentUser = senderId === userId;

            const messageAlignment = isCurrentUser
              ? "justify-end"
              : "justify-start";
            const marginAlignment = isCurrentUser ? "ml-auto" : "mr-auto";

            let formattedDate = "Invalid date";
            try {
              const messageDate = new Date(message.sentAt);
              if (!isNaN(messageDate.getTime())) {
                formattedDate = formatDistanceToNow(messageDate, {
                  addSuffix: true,
                });
              }
            } catch (error) {
              console.error("Error parsing date:", error);
            }

                   const isMessageFromSeller =
                     senderId === advert?.postedBy._id;

            console.log("this is userId", userId);

            const isSeller = userId === advert?.postedBy._id;
            console.log("this is sender ID", senderId);
            console.log("this is advert id", advert?.postedBy._id);
            console.log("I am the seller", isSeller);
            return (
              <div
                key={message._id}
                className={`flex items-start mb-4 ${messageAlignment}`}
              >
                <div className={`flex items-start ${marginAlignment}`}>
                  <img
                    src={isMessageFromSeller ? sellerImage : placeholderImage}
                    alt={
                      isMessageFromSeller ? "Seller Profile" : "User Profile"
                    }
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div
                    className={`p-3 rounded-lg ${
                      isCurrentUser
                        ? "bg-green-800 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    <span className="font-semibold">{senderName}</span>
                    <p>{message.content}</p>
                    <span className="text-gray-300 text-xs">
                      {formattedDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          className="flex-grow border rounded-lg p-2 mr-4 bg-white dark:bg-gray-700 text-black dark:text-white"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatDetails;
