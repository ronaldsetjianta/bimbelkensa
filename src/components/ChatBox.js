import React, { useState, useEffect, useRef } from "react";

const avatarBot = "https://placehold.co/40x40/282828/F6F5F1?text=ALP";
const avatarUser = "https://placehold.co/40x40/EAEAEA/282828?text=You";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [menuStage, setMenuStage] = useState("mainMenu");
  const messagesContainerRef = useRef(null);
  const audioRef = useRef(null);

  const mainMenuText = `Silakan pilih layanan dengan mengetik angka:\n1. Layanan Individu\n2. Layanan Perusahaan\n3. Booking Konsultasi`;

  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text: mainMenuText,
        time: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === "bot" && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => console.log("Audio play was prevented:", error));
      }
    }
  }, [messages]);

  const formatTime = (date) => {
    const today = new Date();
    const isSameDay =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    return isSameDay
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString([], { day: "2-digit", month: "short" }) +
        " " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // --- FUNGSI LOGIKA CHAT YANG DIPERBARUI ---
  const handleUserChoice = (choice) => {
    let botText = "";

    // Perintah universal untuk kembali ke menu utama
    if (choice === "0" && menuStage !== 'mainMenu') {
        botText = mainMenuText;
        setMenuStage("mainMenu");
        return botText;
    }

    switch (menuStage) {
      case "mainMenu":
        switch (choice) {
          case "1":
            botText = "Silakan pilih layanan individu:\n1. SPT Tahunan OP\n2. Konsultasi PPh 21\n0. Kembali ke Awal";
            setMenuStage("individu");
            break;
          case "2":
            botText = "Silakan pilih layanan perusahaan:\n1. Layanan PPh\n2. Layanan PPN\n3. Laporan Keuangan\n0. Kembali ke Awal";
            setMenuStage("perusahaan");
            break;
          case "3":
            botText = "Terima kasih. Tim kami akan menghubungi Anda untuk jadwal konsultasi.";
            setMenuStage("mainMenu"); // Langsung kembali ke menu utama
            break;
          default:
            botText = `Pilihan tidak valid.\n${mainMenuText}`;
        }
        break;

      case "individu":
        switch (choice) {
          case "1":
            botText = "Terima kasih. Tim kami akan menghubungi Anda untuk layanan SPT Tahunan OP.";
            setMenuStage("mainMenu");
            break;
          case "2":
            botText = "Terima kasih. Tim kami akan menghubungi Anda untuk layanan Konsultasi PPh 21.";
            setMenuStage("mainMenu");
            break;
          default:
            botText = "Pilihan tidak valid. Silakan pilih layanan individu:\n1. SPT Tahunan OP\n2. Konsultasi PPh 21\n0. Kembali ke Awal";
        }
        break;

      case "perusahaan":
        switch (choice) {
          case "1":
            botText = "Terima kasih. Tim kami akan menghubungi Anda untuk layanan Pajak Penghasilan (PPh).";
            setMenuStage("mainMenu");
            break;
          case "2":
            botText = "Terima kasih. Tim kami akan menghubungi Anda untuk layanan Pajak Pertambahan Nilai (PPN).";
            setMenuStage("mainMenu");
            break;
          case "3":
            botText = "Terima kasih. Tim kami akan menghubungi Anda untuk layanan Laporan Keuangan Bulanan.";
            setMenuStage("mainMenu");
            break;
          default:
            botText = "Pilihan tidak valid. Silakan pilih layanan perusahaan:\n1. Layanan PPh\n2. Layanan PPN\n3. Laporan Keuangan\n0. Kembali ke Awal";
        }
        break;
      
      default:
        botText = mainMenuText;
        setMenuStage("mainMenu");
    }

    return botText;
  };
  // --- AKHIR FUNGSI LOGIKA CHAT ---

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage = { id: Date.now(), sender: "user", text: input, time: new Date() };
    const userInput = input.trim();
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botText = handleUserChoice(userInput);
      const botMessage = { id: Date.now() + 1, sender: "bot", text: botText, time: new Date() };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div
      className="fixed bottom-4 right-4 border border-gray-200 rounded-lg shadow-2xl overflow-hidden flex flex-col z-50 font-sans"
      style={{
        width: minimized ? "250px" : "400px",
        height: minimized ? "50px" : "500px",
        transition: "all 0.4s ease-in-out",
        backgroundColor: '#FFFFFF',
      }}
    >
      <audio ref={audioRef} src="/notif.mp3" preload="auto" />

      <div
        className="flex items-center justify-between bg-[#282828] text-[#F6F5F1] px-4 py-2 cursor-pointer flex-shrink-0"
        onClick={() => setMinimized(!minimized)}
      >
        <span className="font-bold">Chat Bantuan</span>
        <button className="text-lg">{minimized ? "↑" : "−"}</button>
      </div>

      {!minimized && (
        <>
          <div
            ref={messagesContainerRef}
            className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#F6F5F1] text-sm flex flex-col"
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start max-w-xs space-x-2 ${msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''}`}>
                <img src={msg.sender === 'bot' ? avatarBot : avatarUser} alt="avatar" className="w-8 h-8 rounded-full mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender === "bot" ? "bg-gray-200 text-[#282828] rounded-bl-none" : "bg-[#282828] text-white rounded-br-none"
                    }`}
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <span className={`text-xs text-gray-500 mt-1 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>{formatTime(msg.time)}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-2">
                <img src={avatarBot} alt="avatar" className="w-8 h-8 rounded-full mt-1" />
                <div>
                  <div className="bg-gray-200 text-black p-3 rounded-lg flex space-x-1.5">
                    <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                    <span style={{animationDelay: '0.1s'}} className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                    <span style={{animationDelay: '0.2s'}} className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-xs text-gray-500">Ayo Lapor Pajak sedang mengetik...</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 flex space-x-2 border-t bg-white flex-shrink-0">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#282828] focus:outline-none transition"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ketik pesan..."
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-[#282828] text-white rounded-lg text-sm font-semibold hover:bg-black transition-colors"
            >
              Kirim
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBox;
