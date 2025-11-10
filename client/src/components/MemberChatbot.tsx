import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Send, Bot, User, X, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const MemberChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your club assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('balance') || lowerInput.includes('account balance')) {
      return "Your current account balance is KES 12,450. Would you like to make a payment or view your transaction history?";
    }

    if (lowerInput.includes('membership') || lowerInput.includes('renew')) {
      return "Your membership is active and will expire on December 31, 2025. You can renew it anytime from your account settings.";
    }

    if (lowerInput.includes('booking') || lowerInput.includes('reservation')) {
      return "You can view and manage your bookings in the 'My Bookings' section. Would you like me to take you there?";
    }

    if (lowerInput.includes('handicap') || lowerInput.includes('hcp')) {
      return "Your current handicap index is 12.4. Your last update was on November 1, 2025.";
    }

    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! I'm your club assistant. I can help you with account information, bookings, and more. What would you like to know?";
    }

    if (lowerInput.includes('help')) {
      return "I can help you with:\n• Account balance and payments\n• Membership information\n• Booking details\n• Handicap information\n• Event schedules\n• And more!\n\nWhat would you like to know?";
    }

    return "I'm sorry, I didn't understand that. Could you please rephrase? I can help with account balances, membership details, bookings, and more.";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 p-0 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col z-50 shadow-xl">
      <CardHeader className="border-b p-4 flex flex-row items-center justify-between bg-primary text-primary-foreground">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <CardTitle className="text-lg">Club Assistant</CardTitle>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-primary-foreground hover:bg-primary/80"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">
                    {message.sender === 'user' ? 'You' : 'Club Assistant'}
                  </span>
                  <span className="text-xs opacity-70 ml-2">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Ask about your account, bookings, or membership
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default MemberChatbot;
