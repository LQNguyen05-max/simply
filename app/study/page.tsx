"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [cards, setCards] = useState<any[]>([]); // Expect an array of objects
  const { status, data } = useSession();
  const [revealedCards, setRevealedCards] = useState<number[]>([]); // New state for revealed cards
  const [studyMode, setStudyMode] = useState(false);

  const getUserData = async () => {
    try {
      console.log("Email:", data?.user?.email);
      const res = await axios.post("/api/cards", {
        email: data?.user?.email,
      });

      console.log("API response:", res.data.response);

      // Ensure the response is an array of objects
      if (Array.isArray(res.data.response)) {
        setCards(res.data.response);
      } else {
        console.error("Response is not an array:", res.data.response);
      }
    } catch (error: any) {
      toast.error("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && data?.user?.email) {
      getUserData();
    }
  }, [status, data]);

  useEffect(() => {
    console.log("Updated cards array:", cards);
  }, [cards]);

  // Handle the card reveal
  const handleReveal = (index: number) => {
    // Add card index to revealedCards array
    setRevealedCards((prev) => [...prev, index]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold pt-5 pb-2">Saved Note Cards</h1>
      <Button
        className=" bg-gradient-to-r from-cyan-400 to-fuchsia-400 font-semibold w-[130px]"
        onClick={() => {
          setStudyMode((prev) => !prev);
          if (!studyMode) {
            setRevealedCards([]); // Reset revealed cards when entering study mode
          }
        }}
      >
        Study Mode: {studyMode ? "On" : "Off"}
      </Button>
      {cards.length > 0 ? (
        <ul className="pt-4">
          {cards.map((card, index) => (
            <div
              className="p-5 border border-slate-200 py-2 rounded-lg min-h-[250px] max-w-[500px] mb-4"
              key={index}
            >
              <div className="w-full flex justify-end cursor-pointer"></div>
              <h1 className="font-bold">{card.prompt}</h1>
              <div className="py-2"></div>
              <div
                className={
                  studyMode && !revealedCards.includes(index)
                    ? "transition-all duration-300"
                    : "hidden transition-all duration-300" +
                      +"transition-all duration-200 cursor-pointer"
                }
              >
                <h1>
                  <span className="text-sky-500 font-bold">Click</span> to
                  Reveal Answer
                </h1>
              </div>
              <div
                className={
                  revealedCards.includes(index) || !studyMode
                    ? "blur-none transition-all duration-200"
                    : "blur-md transition-all duration-200 cursor-pointer"
                }
                onClick={() => handleReveal(index)}
              >
                <h1>{card.definition}</h1>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <div className="py-10">
          <p>No cards available.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
