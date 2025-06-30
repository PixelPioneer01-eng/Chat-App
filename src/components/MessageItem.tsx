import { Avatar, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";

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

interface MessageItemProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageItem = ({ message, isCurrentUser }: MessageItemProps) => {
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div
      className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex items-start gap-2 max-w-xs lg:max-w-md ${
          isCurrentUser ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}
      >
        <Avatar src={message.user.photoURL || "/placeholder.svg"} />

        <div>
          <div
            className={`p-3 rounded-2xl whitespace-pre-wrap break-words ${
              isCurrentUser
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {message.text}
          </div>

          <div className="mt-1 text-xs text-gray-500 flex items-center gap-1">
            <Text strong>{message.user.displayName}</Text>
            <span>•</span>
            <span>{getTimeAgo(message.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
