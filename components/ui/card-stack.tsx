"use client";
import CopyButton from "@/components/home/copy-button";
import { Highlight } from "@/components/home/results-stack";
import SurveyDialog from "@/components/home/survey-dialog";
import RightArrow from "@/components/icons/right-arrow";
import { motion } from "framer-motion";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { Transition } from "react-transition-group";

type Card = {
  id: number;
  name: string;
  survey?: boolean;
  designation: string;
  content: ReactNode | null;
  contentCompleted?: ReactNode;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  surveyCompleted,
  score,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(null);
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(
    [...items].sort((a, b) => b.id - a.id),
  );

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsSurveyCompleted(
      surveyCompleted || localStorage.getItem("surveyCompleted") === "true",
    );

    const params = new URLSearchParams(searchParams);

    params.delete("surveyCompleted");
    replace(`${pathname}?${params.toString()}` as Route);
  }, [surveyCompleted]);

  const flip = () => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.unshift(newArray.pop()!); // move the last element to the front
      return newArray;
    });
  };

  return (
    <div className="relative h-60 w-96 md:h-[16rem] md:w-[27rem] select-none">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-white h-60 w-96 md:h-[16rem] md:w-[27rem] rounded-3xl md:p-5 p-4 shadow-xl border border-neutral-200 shadow-black/[0.1] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: (cards.length - index - 1) * -CARD_OFFSET, // Reverse the order for animation
              scale: 1 - (cards.length - index - 1) * SCALE_FACTOR, // Decrease scale for cards that are behind
              zIndex: index + 1, // Increase z-index for the cards that are behind
            }}
          >
            <Transition in={isSurveyCompleted} timeout={500}>
              {(state) => (
                <>
                  <div
                    className={`font-normal text-neutral-700 md:leading-relaxed transition-opacity ${state === "entered" && "animate-fade-up"}`}
                  >
                    {isSurveyCompleted &&
                    card.contentCompleted &&
                    state === "entered" ? (
                      card.contentCompleted
                    ) : !card.content && score ? (
                      <p>
                        <Highlight>Félicitations,</Highlight> vous avez répondu
                        à toutes les questions. Votre score est de
                        <Highlight score={score}>
                          {score.toFixed(1)} sur 10.
                        </Highlight>{" "}
                        Cliquez sur suivant pour avoir plus d'informations !
                      </p>
                    ) : (
                      card.content
                    )}
                  </div>

                  <div>
                    <p className="text-neutral-500 font-medium">{card.name}</p>
                    <p className="flex justify-between items-center text-neutral-400 font-normal">
                      {card.designation}
                      {!card.survey ? (
                        <button
                          onClick={flip}
                          className="z-100 absolute right-4 md:right-5 inline-flex items-center justify-between gap-1.5 rounded-full bg-emerald-100 py-1 font-medium text-emerald-700 hover:text-emerald-800 transition-colors duration-300 ease-in-out hover:bg-emerald-200 px-3"
                          style={{
                            animationDelay: "0.3s",
                            animationFillMode: "forwards",
                          }}
                        >
                          <RightArrow className={"size-5"} />
                          <span>Suivant</span>
                        </button>
                      ) : isSurveyCompleted && state === "entered" ? (
                        <CopyButton state={state} />
                      ) : (
                        <SurveyDialog />
                      )}
                    </p>
                  </div>
                </>
              )}
            </Transition>
          </motion.div>
        );
      })}
    </div>
  );
};
