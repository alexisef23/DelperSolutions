import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { MessageCircle, X, Send, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BOT_NAME = 'Delper AI';

const QUICK_REPLIES = [
  { id: 'services', label: '🚀 ¿Qué servicios ofrecen?' },
  { id: 'portfolio', label: '🏆 Ver Casos de Éxito' },
  { id: 'stack', label: '⚙️ Arsenal Técnico' },
  { id: 'quote', label: '⚡ Cotizar Proyecto' },
];

const BOT_RESPONSES = {
  services: {
    text: 'Desarrollamos 4 tipos de soluciones digitales de alto impacto:',
    cards: [
      { icon: '📱', title: 'Apps Móviles', desc: 'iOS & Android nativas' },
      { icon: '🖥️', title: 'Plataformas Full-Stack', desc: 'SaaS & Sistemas empresariales' },
      { icon: '🌐', title: 'Sitios Comerciales', desc: 'SEO & Alta conversión' },
      { icon: '✨', title: 'Agentes & IA', desc: 'Automatización inteligente' },
    ],
    followUp: '¿Te interesa cotizar alguna de estas soluciones?',
    quickReplies: [{ id: 'quote', label: '⚡ Sí, cotizar ahora' }, { id: 'portfolio', label: '🏆 Ver casos reales' }],
  },
  portfolio: {
    text: 'Hemos trabajado con empresas líderes como ZF Engineering, OXXO Go, Weber\'s Bread y Novo Sushi, entre otros. Algunos resultados destacados:',
    bullets: [
      '🥇 Primer Lugar Innovation Meetup 2026 (Zyklus Halo)',
      '📊 94.5% de puntualidad operativa (OxxoGo)',
      '📉 Reducción de mermas en cadena de suministro (WeberTrack)',
      '🤖 Chatbot 24/7 con agendamiento automático (Redken)',
    ],
    followUp: '¿Listo para escribir tu propio caso de éxito?',
    quickReplies: [{ id: 'quote', label: '⚡ Cotizar mi proyecto' }],
  },
  stack: {
    text: 'Utilizamos el mejor stack tecnológico del mercado:',
    bullets: [
      '⚛️ Frontend: React, Next.js, Tailwind CSS',
      '🟢 Backend: Node.js, Python',
      '☁️ Cloud & DB: PostgreSQL, Supabase, AWS',
      '📱 Mobile: Flutter, React Native, Swift, Kotlin',
    ],
    followUp: 'Seleccionamos la arquitectura ideal para cada proyecto. ¿Iniciamos tu diagnóstico técnico?',
    quickReplies: [{ id: 'quote', label: '⚡ Iniciar diagnóstico' }],
  },
  quote: {
    text: '¡Perfecto! Puedo dirigirte directamente a nuestro planificador de proyectos. Nuestro equipo responde en menos de 24 horas con una propuesta técnica personalizada.',
    cta: { label: 'Ir al Formulario de Cotización →', path: '/contacto' },
    quickReplies: [{ id: 'services', label: '🚀 Ver servicios antes' }],
  },
};

const TypingIndicator = () => (
  <div className="chat-bubble bot typing-indicator">
    <span></span><span></span><span></span>
  </div>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = (msg, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { from: 'bot', ...msg }]);
    }, delay);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (!hasGreeted) {
      setHasGreeted(true);
      setTimeout(() => {
        addBotMessage({
          text: '¡Hola! 👋 Soy el asistente de **Delper Solutions**. ¿En qué puedo ayudarte hoy?',
          quickReplies: QUICK_REPLIES,
        }, 600);
      }, 300);
    }
  };

  const handleQuickReply = (id) => {
    setMessages(prev => [...prev, { from: 'user', text: QUICK_REPLIES.find(q => q.id === id)?.label || id }]);
    const response = BOT_RESPONSES[id];
    if (response) {
      addBotMessage(response, 1000);
    }
  };

  const handleSend = () => {
    const text = inputVal.trim();
    if (!text) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInputVal('');
    addBotMessage({
      text: 'Gracias por tu mensaje. Nuestro equipo revisará tu consulta pronto. Mientras tanto, ¿te gustaría cotizar directamente?',
      quickReplies: [{ id: 'quote', label: '⚡ Cotizar Proyecto' }],
    }, 1000);
  };

  const handleCtaClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const formatText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chatbot-fab ${isOpen ? 'hidden' : ''}`}
        onClick={handleOpen}
        aria-label="Abrir asistente"
        type="button"
      >
        <Sparkles size={22} className="chatbot-fab-icon" />
        <span className="chatbot-fab-label">Asistente IA</span>
        <span className="chatbot-fab-pulse"></span>
      </button>

      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="chatbot-name">{BOT_NAME}</span>
              <span className="chatbot-status">● En línea</span>
            </div>
          </div>
          <button className="chatbot-close-btn" onClick={() => setIsOpen(false)} type="button">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message-row ${msg.from}`}>
              <div
                className={`chat-bubble ${msg.from}`}
                dangerouslySetInnerHTML={{ __html: formatText(msg.text || '') }}
              />
              {msg.bullets && (
                <ul className="chat-bullets">
                  {msg.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
              {msg.cards && (
                <div className="chat-cards">
                  {msg.cards.map((c, j) => (
                    <div key={j} className="chat-card">
                      <span className="chat-card-icon">{c.icon}</span>
                      <span className="chat-card-title">{c.title}</span>
                      <span className="chat-card-desc">{c.desc}</span>
                    </div>
                  ))}
                </div>
              )}
              {msg.followUp && (
                <div className="chat-bubble bot follow-up">{msg.followUp}</div>
              )}
              {msg.cta && (
                <button className="chat-cta-btn" onClick={() => handleCtaClick(msg.cta.path)} type="button">
                  {msg.cta.label} <ArrowRight size={14} />
                </button>
              )}
              {msg.quickReplies && (
                <div className="chat-quick-replies">
                  {msg.quickReplies.map((qr, j) => (
                    <button key={j} className="chat-quick-reply-btn" onClick={() => handleQuickReply(qr.id)} type="button">
                      {qr.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="chat-message-row bot">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chatbot-input-area">
          <input
            type="text"
            className="chatbot-input"
            placeholder="Escribe tu pregunta..."
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="chatbot-send-btn" onClick={handleSend} type="button">
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
