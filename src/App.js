import React, { useState } from "react";
import { motion } from "framer-motion";

const swipeConfidenceThreshold = 100;

const Card = ({ imgUrl, onSwipe, interactive, style }) => (
  <motion.div
    drag={interactive ? "x" : false}
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={0.8}
    onDragEnd={(e, info) => {
      if (info.offset.x > swipeConfidenceThreshold) {
        onSwipe("like");
      } else if (info.offset.x < -swipeConfidenceThreshold) {
        onSwipe("dislike");
      }
    }}
    style={{
      width: "100%",
      height: "100%",
      borderRadius: 16,
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 28,
      // boxShadow removed
      userSelect: "none",
      overflow: "hidden",
      cursor: interactive ? "grab" : "default",
      ...style,
    }}
  >
    <img
      src={imgUrl}
      alt="cat"
      draggable={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        userSelect: "none",
        pointerEvents: "none",
      }}
    />
  </motion.div>
);

export default function App() {
  const initialCards = [
    "https://cataas.com/cat?1",
    "https://cataas.com/cat?2",
    "https://cataas.com/cat?3",
    "https://cataas.com/cat?4",
    "https://cataas.com/cat?5",
    "https://cataas.com/cat?6",
    "https://cataas.com/cat?7",
    "https://cataas.com/cat?8",
    "https://cataas.com/cat?9",
    "https://cataas.com/cat?10",
  ];

  const [cards, setCards] = useState(initialCards);
  const [liked, setLiked] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [round, setRound] = useState(1);

  const handleSwipe = (direction, index) => {
    const swipedCat = cards[index];
    if (direction === "like") setLiked((prev) => [...prev, swipedCat]);
    else if (direction === "dislike") setDisliked((prev) => [...prev, swipedCat]);
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSwipeAgain = () => {
    const newRound = round + 1;
    setRound(newRound);
  const newCards = Array.from({ length: 10 }, (_, i) => `https://cataas.com/cat?${newRound}-${i + 1}`);
    setCards(newCards);
    setLiked([]);
    setDisliked([]);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 340,
        minHeight: "100vh",
        margin: "0 auto",
        padding: "24px 8px 0 8px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // background: "#f5f5f5",
      }}
    >
      {/* Liked cats counter */}
      <div
        style={{
          width: "100%",
          maxWidth: 340,
          height: 480,
          position: "relative",
        }}
      >
        {cards.length > 0 ? (
          cards.map((url, index) => {
            const isTop = index === cards.length - 1;
            const peekStyle = !isTop ? { scale: 0.96, y: 12, opacity: 0.9 } : {};
            return (
              <div
                key={url}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Card imgUrl={url} onSwipe={(dir) => handleSwipe(dir, index)} interactive={isTop} style={peekStyle} />
              </div>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
              background: "#f9f9f9",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: 16,
              // boxShadow removed
              overflowY: "auto",
              maxHeight: 480,
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
            className="hide-scrollbar"
          >
            <h2 style={{ marginBottom: 12 }}>Summary 🐾</h2>
            {/* <div style={{ fontSize: 18, fontWeight: 600, color: '#4CAF50', marginBottom: 8 }}>
              Cats you like: {liked.length}
            </div> */}
            <p style={{ fontSize: 18, marginBottom: 16 }}>
              You liked <strong>{liked.length}</strong> furball{liked.length !== 1 ? "s" : ""}.
            </p>

            {/* <h3 style={{ marginTop: 16, marginBottom: 8 }}>👍 Liked {liked.length} furballs</h3> */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: 10,
                width: "100%",
              }}
            >
              {liked.map((cat, i) => (
                <img
                  key={i}
                  src={cat}
                  alt={`liked-cat-${i}`}
                  style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 12 }}
                />
              ))}
            </div>

            <button
              onClick={handleSwipeAgain}
              style={{
                marginTop: 20,
                padding: "10px 20px",
                fontSize: 16,
                borderRadius: 8,
                border: "none",
                backgroundColor: "#4CAF50",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Swipe Again
            </button>
          </motion.div>
        )}
      </div>

      {/* Swipe indicators below the card */}
      {cards.length > 0 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 40px",
          }}
        >
          {/* Dislike Button */}
          <button
            onClick={() => handleSwipe("dislike", cards.length - 1)}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#ffe6e6",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "transform 0.1s",
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <span style={{ color: "red", fontSize: 28 }}>❌</span>
          </button>

          {/* Like Button */}
          <button
            onClick={() => handleSwipe("like", cards.length - 1)}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#e6ffe6",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              transition: "transform 0.1s",
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
            onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <span style={{ color: "green", fontSize: 28 }}>❤️</span>
          </button>
        </div>
      )}
    </div>
  );
}
