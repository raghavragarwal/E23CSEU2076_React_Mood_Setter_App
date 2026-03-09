import React, { useEffect, useState } from "react";

function App() {

  // List of moods with emojis
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😴", label: "Sleepy" },
    { emoji: "😎", label: "Cool" },
    { emoji: "😢", label: "Sad" },
    { emoji: "🤯", label: "Mind Blown" },
    { emoji: "🔥", label: "Motivated" }
  ];

  const [selectedMood, setSelectedMood] = useState(null);
  const [dateSelected, setDateSelected] = useState(null);

  // Get today's date
  const today = new Date().toLocaleDateString();

  // Load mood from localStorage on reload
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dailyMood"));

    if (storedData && storedData.date === today) {
      setSelectedMood(storedData.mood);
      setDateSelected(storedData.date);
    }
  }, []);

  // Handle mood selection
  const selectMood = (mood) => {
    const data = {
      mood: mood,
      date: today
    };

    localStorage.setItem("dailyMood", JSON.stringify(data));

    setSelectedMood(mood);
    setDateSelected(today);
  };

  // Reset mood
  const resetMood = () => {
    localStorage.removeItem("dailyMood");
    setSelectedMood(null);
    setDateSelected(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px", fontFamily: "Arial" }}>
      
      <h1>How's Your Vibe Today?</h1>

      {/* Emoji Mood Selector */}
      <div style={{ fontSize: "40px", marginTop: "20px" }}>
        {moods.map((mood, index) => (
          <span
            key={index}
            onClick={() => selectMood(mood)}
            style={{
              cursor: "pointer",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
              border: selectedMood?.emoji === mood.emoji ? "3px solid green" : "1px solid #ccc",
              backgroundColor: selectedMood?.emoji === mood.emoji ? "#1e1ea4" : "transparent"
            }}
          >
            {mood.emoji}
          </span>
        ))}
      </div>

      {/* Mood Display */}
      <div style={{ marginTop: "30px", fontSize: "18px" }}>
        {selectedMood ? (
          <p>
            Your vibe today is <b>{selectedMood.label} {selectedMood.emoji}</b>  
            <br />
            Selected on: {dateSelected}
          </p>
        ) : (
          <p>No vibe selected yet for today.</p>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetMood}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Reset Vibe
      </button>

    </div>
  );
}

export default App;