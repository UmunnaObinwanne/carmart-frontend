import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

function SendMessage() {
  const [content, setContent] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const userId = useSelector((state) => state.user.userId);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiUrl}/user/send-messages`,
        { recipientId, content },
        {
          withCredentials: true,
        }
      );
      toast.success("Message sent successfully");
      setContent("");
      setRecipientId("");
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        placeholder="Recipient ID"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message"
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
}

export default SendMessage;
