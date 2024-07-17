"use client"
import React, { useState, useEffect, useRef } from 'react';
import Tile from "@/app/components/subpages/Tile";
import Script from 'next/script';
import Link from 'next/link';
import StarsCanvas from '../components/subpages/StarBackground';

const page = () => {
  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds timer
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState('Anon');
  const containerRef = useRef(null);
  const scoreRef = useRef(score);

  useEffect(() => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (user) {
      setUsername(user.username || 'badboy');
    }

    if (gameOver) return;

    const gameInterval = setInterval(() => {
      addTiles();
      moveTiles();
    }, 100);

    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(gameInterval);
          clearInterval(timerInterval);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
    };
  }, [gameOver]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (gameOver) {
      endGame(scoreRef.current);
    }
  }, [gameOver]);

  const addTiles = () => {
    const numTiles = Math.floor(Math.random() * 2);
    const newTiles = Array.from({ length: numTiles }, () => ({
      id: Math.random(),
      top: 0,
      left: Math.random() * 100,
      size: Math.random() * 30 + 20,
    }));
    setTiles(prevTiles => [...newTiles, ...prevTiles]);
  };

  const moveTiles = () => {
    const containerHeight = containerRef.current.clientHeight;
    setTiles(prevTiles => {
      const updatedTiles = prevTiles.map(tile => ({
        ...tile,
        top: tile.top + 15,
      })).filter(tile => tile.top < containerHeight);

      return updatedTiles;
    });
  };

  const handleTileClick = (id) => {
    setTiles(prevTiles => prevTiles.filter(tile => tile.id !== id));
    setScore(prevScore => prevScore + 1);
  };

  const endGame = async (finalScore) => {
    try {
      const response = await fetch('https://walledb.onrender.com/api/Cluster0/update-score', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          score: finalScore,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Failed to update user score:', data.message);
      } else {
        console.log("Score updated successfully:", data);
      }
    } catch (error) {
      console.error("Failed to update user score:", error);
    }
  };

  const resetGame = () => {
    setTiles([]);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  return (
    <>
      <div
        id="game-container"
        ref={containerRef}
        className="relative w-[100vw] h-screen overflow-hidden z-[99999]"
      >
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        <div id="score" className="absolute text-white top-1 left-2 text-xl">
          Score: {score}
        </div>
        <div id="timer" className="absolute text-white top-1 right-2 text-xl">
          Time Left: {timeLeft}s
        </div>
        <div id="tiles-container" className="absolute top-0 w-full h-full">
          {tiles.map(tile => (
            <Tile
              key={tile.id}
              onClick={() => handleTileClick(tile.id)}
              top={tile.top}
              left={tile.left}
              size={tile.size}
            />
          ))}
        </div>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
            <div className="bg-black rounded-md border border-[#1F7DF1] p-4  shadow-lg text-center">
              <h2 className="text-2xl mb-4">Game Over!</h2>
              <p className="mb-4">Your score is {score}</p>
              <button
                onClick={resetGame}
                className="bg-[#1F7DF1] font-semibold text-white px-4 py-2 rounded"
              >
                Play Again
              </button>
              <div>
                <Link href="/">
                  <button
                    className="bg-[#1F7DF1] font-semibold text-white px-4 py-2 my-2 rounded"
                  >
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <StarsCanvas />
    </>
  );
};

export default page;

