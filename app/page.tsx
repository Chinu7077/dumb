"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function AreYouDumb() {
  const [answered, setAnswered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonMoving, setNoButtonMoving] = useState(false);
  const containerRef = useRef(null);
  const yesSound = useRef(null);

  useEffect(() => {
    yesSound.current = new Audio("/yes.mp3"); // Load the sound
  }, []);

  const handleYesClick = () => {
    setAnswered(true);
    setShowConfetti(true);
    yesSound.current.play(); // Play the sound
  };

  const moveButton = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = 160;
    const buttonHeight = 50;
    const padding = 20;

    const maxX = containerRect.width - buttonWidth - padding;
    const maxY = containerRect.height - buttonHeight - padding;

    const newX = Math.max(padding, Math.min(Math.random() * maxX, maxX));
    const newY = Math.max(padding, Math.min(Math.random() * maxY, maxY));

    setPosition({ x: newX, y: newY });
  };

  useEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: containerRect.width / 4,
        y: containerRect.height / 2 - 25,
      });
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 p-4 overflow-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={true}
          numberOfPieces={500}
        />
      )}
      {!answered ? (
        <>
          <motion.h1
            className="text-center text-4xl font-bold text-white mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Are You Dumb?
          </motion.h1>

          <div
            ref={containerRef}
            className="relative w-96 h-96 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat rounded-lg shadow-xl p-6"
            style={{ backgroundImage: "url('/ryd.jpg')" }}
          >
            <div className="flex gap-6 mt-56">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={handleYesClick}
                  className="w-40 bg-green-500 text-lg hover:bg-green-600"
                >
                  Yes
                </Button>
              </motion.div>
              <motion.div
                animate={noButtonMoving ? { x: position.x, y: position.y } : {}}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                style={{ touchAction: "none" }}
              >
                <Button
                  onMouseEnter={() => {
                    moveButton();
                    setNoButtonMoving(true);
                  }}
                  onTouchStart={() => {
                    moveButton();
                    setNoButtonMoving(true);
                  }}
                  className="w-40 bg-red-500 text-lg hover:bg-red-600"
                >
                  No
                </Button>
              </motion.div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="relative w-96 h-96 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat rounded-lg shadow-xl p-6"
          style={{ backgroundImage: "url('/yur2.jpg')" }}
        >
          <motion.p
            className="absolute -top-14 text-center text-4xl font-bold text-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Yes, you are! 😂
          </motion.p>

          <Button
            onClick={() => {
              setAnswered(false);
              setShowConfetti(false);
              setNoButtonMoving(false);
            }}
            className="absolute bottom-6 bg-purple-500 hover:bg-purple-600"
          >
            Try Again
          </Button>
        </div>
      )}
      <div className="absolute bottom-4 text-white text-lg font-bold flex items-center gap-2">
        Created by CHINU
        <a
          href="https://www.instagram.com/chinuuu______________/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/ig.png" alt="Instagram" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
