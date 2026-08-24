import { useMemo, useState } from "react";
import { ArrowLeft, Bell, Search, Send, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import "./Chat.css";
import logo from "../assets/claro.png";

const initialChats = [
  {
    id: 1,
    name: "XYZ Corporación",
    preview: "Así es, esta primera será con el gerente y la segunda será técnica.",
    time: "3 horas",
    avatar: "XYZ",
    unread: false,
    favorite: true,
    messages: [
      { text: "¡Hola! Gracias por tu postulación.", time: "10:00 AM", mine: false },
      { text: "¡Gracias! ¿Cuándo es la entrevista?", time: "10:15 AM", mine: true },
      { text: "Quedo pendiente. ¿Habrá una segunda entrevista técnica?", time: "10:30 AM", mine: true },
      { text: "Así es, esta primera será con el gerente y la segunda será técnica.", time: "10:45 AM", mine: false },
      { text: "¡Perfecto! Prepararé ambas. Gracias.", time: "11:00 AM", mine: true },
      { text: "De nada. Nos vemos el martes.", time: "11:15 AM", mine: false },
    ],
  },
  { id: 2, name: "Patry Team", preview: "Nos comunicaremos contigo lo mas pronto posible...", time: "2 enero", avatar: "PT", messages: [] },
  { id: 3, name: "Dev Resources", preview: "Felicidades pasaste a la siguiente etapa...", time: "4 minutos", avatar: "HTML", unread: true, messages: [] },
];

export default function Chat() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(1);
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const activeChat = chats.find((chat) => chat.id === activeId) || chats[0];
  const visibleChats = useMemo(
    () => chats.filter((chat) => chat.name.toLowerCase().includes(search.toLowerCase().trim())),
    [chats, search],
  );

  const selectChat = (id) => setActiveId(id);

  const sendMessage = (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;

    setChats((currentChats) => currentChats.map((chat) => chat.id === activeId
      ? { ...chat, preview: text, time: "Ahora", messages: [...chat.messages, { text, time: "Ahora", mine: true }] }
      : chat));
    setDraft("");
  };

  return (
    <main className="chat-page">
      <header className="chat-header">
        <Link to="/inicio" className="chat-back" aria-label="Volver al inicio"><ArrowLeft size={28} /></Link>
        <img src={logo} alt="Worksy" className="chat-logo" />
        <div className="chat-header-actions">
          <Link to="/notificaciones" aria-label="Notificaciones"><Bell size={24} /></Link>
          <Link to="/perfil" className="chat-user" aria-label="Abrir perfil"><UserRound size={18} /></Link>
        </div>
      </header>

      <section className="chat-layout">
        <aside className="chat-sidebar">
          <label className="chat-search">
            <Search size={22} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar" aria-label="Buscar conversaciones" />
          </label>
          <div className="chat-list">
            {visibleChats.map((chat) => (
              <button key={chat.id} type="button" className={`chat-preview ${activeId === chat.id ? "selected" : ""}`} onClick={() => selectChat(chat.id)}>
                <span className={`chat-avatar avatar-${chat.id}`}>{chat.avatar}</span>
                <span className="chat-preview-body"><strong>{chat.name}</strong><span>{chat.preview}</span></span>
                <span className="chat-preview-meta">{chat.favorite && <b aria-label="Favorito">♥</b>}{chat.unread && <i aria-label="No leído" />}{chat.time}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="conversation" aria-label={`Conversación con ${activeChat.name}`}>
          <div className="conversation-top"><span className={`chat-avatar avatar-${activeChat.id}`}>{activeChat.avatar}</span><strong>{activeChat.name}</strong></div>
          <div className="message-list">
            {activeChat.messages.length ? activeChat.messages.map((message, index) => (
              <div className={`message-row ${message.mine ? "mine" : "theirs"}`} key={`${message.time}-${index}`}>
                <time>{message.time}</time><div className="message-bubble">{message.text}</div>
              </div>
            )) : <p className="empty-conversation">Escribe un mensaje para comenzar la conversación.</p>}
          </div>
          <form className="message-form" onSubmit={sendMessage}>
            <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Escribe un mensaje..." aria-label="Escribe un mensaje" />
            <button type="submit" aria-label="Enviar mensaje" title="Enviar mensaje"><Send size={28} /></button>
          </form>
        </section>
      </section>
    </main>
  );
}
