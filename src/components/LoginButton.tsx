import { Button, Typography, Card } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";

const { Title, Paragraph } = Typography;

const LoginButton = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <Card className="max-w-md w-full rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">💬</span>
          </div>

          <Title level={2} className="!mb-2 text-gray-800">
            Welcome to ChatApp
          </Title>
          <Paragraph className="text-gray-600">
            Connect and chat with friends in real-time.
          </Paragraph>
        </div>

        <Button
          onClick={signInWithGoogle}
          icon={<GoogleOutlined />}
          size="large"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 shadow hover:shadow-lg transition"
        >
          <span className="text-gray-700 font-medium">
            Continue with Google
          </span>
        </Button>
      </Card>
    </div>
  );
};

export default LoginButton;
