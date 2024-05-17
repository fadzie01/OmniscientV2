import React, { useState, useRef } from 'react';
import '@/RiddleGame.css';
import { useToast } from "@/components/ui/use-toast"

const RiddleGame: React.FC = () => {
  const { toast } = useToast();
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); // State for high score
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([
    "Drugs",
  "Drug addiction",
  "Drugs",
  "Drug dealer",
  "Drug rehabilitation center",
  "Gender-based violence",
  "Violence against women",
  "Fear of violence",
  "Survivor of gender-based violence",
  "Hope for a world without gender-based violence"
  ]);

  const riddles = [
    "I am a friend who can turn into a foe, I make you feel good, but I can also make you low. I can take away your pain, but I can also cause you to go insane. What am I?",
  "I am a trap that is easy to fall into, I promise you pleasure, but I will only bring you sorrow. I can make you forget your troubles, but I will only make them worse in the long run. What am I?",
  "I am a poison that can kill you slowly, I can damage your body and your mind. I can make you lose everything you have. What am I?",
  "I am a dealer who will sell you anything, I don't care if it ruins your life. I am only interested in making a profit. What am I?",
  "I am a place where people can go to get help, But I am often ignored or avoided. I am the last chance for many people, But I can only help those who want to be helped. What am I?",
  "I am a crime that is often hidden in the shadows, I am committed against women and girls of all ages. I can take many forms, from physical abuse to sexual assault. What am I?",
  "I am a weapon that is used to control and intimidate women, I am used to silence their voices and to keep them in their place. I am a symbol of the inequality that exists between men and women. What am I?",
  "I am a fear that many women live with every day, I am the fear of being attacked, harassed, or killed. I am a fear that is justified, because gender-based violence is a pandemic. What am I?",
  "I am a survivor, I have experienced gender-based violence firsthand. I am strong and resilient, And I am determined to break the cycle of violence. What am I?",
  "I am a hope for a better future, I am a hope that one day gender-based violence will be eliminated. I am a hope that all women and girls will be able to live in peace and safety. What am I?"
];

  const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref to store the interval ID

  const shuffle = (array: string[]): string[] => {
    const sortedArr = [...array];
    for (let i = sortedArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
    }
    return sortedArr;
  };

  const startGame = () => {
    setTimer(0);
    setScore(0);
    setAnswers(shuffle([...answers])); // Shuffle answers at the start of the game
    setCurrentRiddleIndex(0);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Use the ref to access the interval ID
      timerRef.current = null; // Reset the ref
      setTimer(0);
      setScore(0);
      setCurrentRiddleIndex(0);
      setAnswers(shuffle([...answers])); // Shuffle answers after stopping the game
      if (score > highScore) {
        setHighScore(score);
      }
    }
  };

  const checkAnswer = (answer: string) => {
    if (answer === answers[currentRiddleIndex]) {
      setScore(score + 1);
      setCurrentRiddleIndex(currentRiddleIndex + 1);
      setAnswers(shuffle([...answers])); // Shuffle answers after correct answer
    } else {
      return toast({
        title: "Try Again "
      })
    }
  };
  const backgroundImageUrl = '/assets/images/bg2.jpeg';

  return (
    <div className="game-container">
          <div style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      backgroundAttachment: 'fixed', // Keeps the image fixed during scrolling
      backgroundPosition: 'center',
      minHeight: '100vh', // Full height of the viewport
      width: '100%',
      backgroundSize: 'contain',
      
    }}>
      <div className='text'>
      <div className="score-display">
        <p className='h4-bold md:h3-bold text-left '>Score: {score}</p>
        <p className='h4-bold md:h3-bold text-left '>High Score: {highScore}</p>
      </div>
      <div className="time-display">
        <p className='h4-bold md:h3-bold text-left '>Time: {timer}</p>
      </div>
      <div className="buttons">
        <div className='start-button'>
        <button className='h2-bold md:h2-bold text-left rounded-lg base-medium hover:bg-primary-500 transition ' onClick={startGame}>Start Game</button>
        </div>
        <div className='start-button'>
        <button className='h2-bold md:h2-bold text-right rounded-lg base-medium hover:bg-primary-500 transition'onClick={stopGame}>Stop Game</button>
        </div>
      </div>
      {currentRiddleIndex < riddles.length && (
        <div className="riddle-display">
         <div className='questions'> <p>{riddles[currentRiddleIndex]}</p></div>
          <div className="answers">
            {answers.map((answer, index) => (
              <button key={index} onClick={() => checkAnswer(answer)}>
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
    </div>
  );
};

export default RiddleGame;
