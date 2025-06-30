import { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Input, Button, Spin, Avatar, Typography } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { db } from "../firebase/config";
import { useAuth } from "../hooks/useAuth";
import MessageItem from "../components/MessageItem";

const { Text } = Typography;

interface Message {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const { user, logout } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      const updatedMessages: Message[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        updatedMessages.push({
          id: doc.id,
          text: data.text,
          createdAt: data.createdAt?.toDate() || new Date(),
          user: data.user,
        });
      });

      setMessages(updatedMessages);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        user: {
          uid: user.uid,
          displayName: user.displayName || "User",
          photoURL: user.photoURL || "",
        },
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spin tip="Loading messages..." size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">💬</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">ChatApp</h2>
          </div>

          <div className="flex items-center gap-3">
            <Avatar src={user?.photoURL} />
            <Text className="hidden sm:inline">{user?.displayName}</Text>
            <Button onClick={logout} size="small">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                isCurrentUser={msg.user.uid === user?.uid}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-4">
        <form
          onSubmit={handleSend}
          className="max-w-4xl mx-auto flex gap-2 items-center"
        >
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full"
            size="large"
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            htmlType="submit"
            size="large"
            disabled={!newMessage.trim()}
          />
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
