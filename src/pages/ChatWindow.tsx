import { useEffect, useRef, useState } from 'react';
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
} from 'lucide-react';

const SERVER = `wss://pl9dpggq-8080.inc1.devtunnels.ms/`;

const users = ['Shalu', 'Saurav'];
const clientId = 'Raj'; // logged-in user

export default function Chat() {
  const [targetUser, setTargetUser] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { from: 'Shalu', text: 'Hey! How are you doing?', time: '2:30 PM' },
    {
      from: clientId,
      text: "I'm good! Just working on some exciting projects 🚀",
      time: '2:31 PM',
    },
    {
      from: 'Shalu',
      text: 'That sounds awesome! Tell me more about it',
      time: '2:32 PM',
    },
  ]);
  const [input, setInput] = useState('');
  const socketRef = useRef<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // WebSocket connection
  useEffect(() => {
    socketRef.current = new WebSocket(SERVER);

    socketRef.current.onopen = () => {
      socketRef.current?.send(
        JSON.stringify({ type: 'register', userId: clientId })
      );
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data ?? '{}');

      if (data.type === 'system') {
        // You can add toast notification here
        console.log(data.message);
      }

      if (data.type === 'message') {
        setMessages((prev) => [
          ...prev,
          {
            from: data.from,
            text: data.text,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          },
        ]);
      }
    };

    return () => socketRef.current?.close();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!targetUser) {
      alert('Please select a user first');
      return;
    }
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      alert('WebSocket is not open');
      return;
    }
    if (input.trim()) {
      const payload = {
        type: 'message',
        from: clientId,
        to: targetUser,
        text: input,
      };
      socketRef.current?.send(JSON.stringify(payload));
      setMessages((prev) => [
        ...prev,
        {
          from: clientId,
          text: input,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setInput('');
    }
  };

  const getUserColor = (user: string) => {
    const colors = {
      Shalu: 'from-purple-500 to-pink-500',
      Saurav: 'from-blue-500 to-cyan-500',
      Raj: 'from-green-500 to-emerald-500',
    };
    return colors[user as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (user: string) => {
    return user === 'Shalu' ? 'bg-green-400' : 'bg-yellow-400';
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='bg-orb bg-orb-1'></div>
        <div className='bg-orb bg-orb-2'></div>
      </div>

      {/* Sidebar */}
      <div className='w-80 backdrop-blur-xl bg-white/10 border-r border-white/20 flex flex-col relative z-10'>
        <div className='p-6 border-b border-white/20'>
          <div className='flex items-center gap-3 mb-4'>
            <div
              className={`h-12 w-12 rounded-full bg-gradient-to-r ${getUserColor(
                clientId
              )} flex items-center justify-center font-bold text-white shadow-lg`}
            >
              {clientId.charAt(0)}
            </div>
            <div>
              <div className='font-bold text-white text-lg'>{clientId}</div>
              <div className='text-xs text-green-400'>● Online</div>
            </div>
          </div>
          <div className='text-white/90 font-semibold text-sm mb-2'>
            Messages
          </div>
        </div>

        <div className='flex-1 overflow-y-auto px-2 custom-scrollbar'>
          {users.map((user, index) => (
            <button
              key={user}
              onClick={() => setTargetUser(user)}
              className={`user-item ${
                targetUser === user ? 'user-item-active' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className='relative'>
                <div
                  className={`h-14 w-14 rounded-full bg-gradient-to-r ${getUserColor(
                    user
                  )} flex items-center justify-center font-bold text-white shadow-lg`}
                >
                  {user.charAt(0)}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(
                    user
                  )} rounded-full border-2 border-slate-900`}
                ></div>
              </div>
              <div className='flex-1 min-w-0'>
                <div className='font-semibold text-white text-base'>{user}</div>
                <div className='text-sm text-white/70 truncate'>
                  {user === 'Shalu'
                    ? 'That sounds awesome! Tell me...'
                    : "Hey, how's it going?"}
                </div>
              </div>
              <div className='text-xs text-white/50'>2:32 PM</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col relative z-10'>
        {targetUser ? (
          <>
            {/* Header */}
            <div className='px-6 py-4 backdrop-blur-xl bg-white/10 border-b border-white/20 flex items-center justify-between shadow-lg'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <div
                    className={`h-12 w-12 rounded-full bg-gradient-to-r ${getUserColor(
                      targetUser
                    )} flex items-center justify-center font-bold text-white shadow-lg`}
                  >
                    {targetUser.charAt(0)}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(
                      targetUser
                    )} rounded-full border-2 border-slate-900`}
                  ></div>
                </div>
                <div>
                  <div className='font-bold text-white text-lg'>
                    {targetUser}
                  </div>
                  <div className='text-sm text-green-400'>
                    ● Online • Last seen recently
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                <button className='p-3 rounded-full hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white hover:scale-110'>
                  <Phone size={20} />
                </button>
                <button className='p-3 rounded-full hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white hover:scale-110'>
                  <Video size={20} />
                </button>
                <button className='p-3 rounded-full hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-white hover:scale-110'>
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className='flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent custom-scrollbar'>
              {messages
                .filter((m) => m.from === targetUser || m.from === clientId)
                .map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      m.from === clientId ? 'justify-end' : 'justify-start'
                    } message-fade-in`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className='flex items-end gap-2 max-w-md'>
                      {m.from !== clientId && (
                        <div
                          className={`h-8 w-8 rounded-full bg-gradient-to-r ${getUserColor(
                            m.from
                          )} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                        >
                          {m.from.charAt(0)}
                        </div>
                      )}
                      <div
                        className={`px-6 py-3 rounded-3xl backdrop-blur-lg transition-all duration-300 hover:scale-105 shadow-xl ${
                          m.from === clientId
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto'
                            : 'bg-white/20 text-white border border-white/20'
                        }`}
                      >
                        <div className='text-sm leading-relaxed'>{m.text}</div>
                        <div
                          className={`text-xs mt-2 ${
                            m.from === clientId
                              ? 'text-blue-100'
                              : 'text-white/60'
                          }`}
                        >
                          {m.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className='p-6 backdrop-blur-xl bg-white/10 border-t border-white/20'>
              <div className='flex items-center gap-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/20 p-2 focus-within:border-white/40 transition-all duration-300'>
                <button className='p-2 text-white/70 hover:text-white hover:scale-110 transition-all duration-300'>
                  <Paperclip size={20} />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className='flex-1 px-4 py-3 bg-transparent border-none outline-none text-white placeholder-white/60 text-sm'
                  placeholder='Type your message...'
                />
                <button className='p-2 text-white/70 hover:text-white hover:scale-110 transition-all duration-300'>
                  <Smile size={20} />
                </button>
                <button
                  onClick={sendMessage}
                  className='p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25'
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className='flex-1 flex items-center justify-center'>
            <div className='text-center'>
              <div className='w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl floating-animation'>
                <Send size={48} className='text-white' />
              </div>
              <h2 className='text-2xl font-bold text-white mb-2'>
                Welcome to Modern Chat
              </h2>
              <p className='text-white/70'>
                Select a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
