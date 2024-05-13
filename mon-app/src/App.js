import React, { useState, useEffect } from 'react';
import logo from '../src/assets/logo.png';
import './App.css';
import SingleCard from './components/SingleCard';
import image1 from "../src/assets/image1.png";
import image2 from "../src/assets/image2.png";
import image3 from "../src/assets/image3.png";
import image4 from "../src/assets/image4.png";
import image5 from "../src/assets/image5.png";
import image6 from "../src/assets/image6.png";
import pairFoundSound from "../src/assets/monPrecieux.mp3";
import backgroundMusic from "../src/assets/theShire.mp3";

// Définir une fonction pour créer une carte avec un identifiant unique
const createCard = (src) => ({
  src: src,
  matched: false,
  id: Math.random().toString(36).substr(2, 9) // Générer un identifiant aléatoire
});

// Définir la fonction de mélange
function shuffle(array) {
  const shuffledArray = [...array].sort(() => Math.random() - 0.5);
  return shuffledArray;
}

const originalCardImages = [
  createCard(image1),
  createCard(image2),
  createCard(image3),
  createCard(image4),
  createCard(image5),
  createCard(image6)
];

function App() {
  const [cards, setCards] = useState([]); // État pour les cartes
  const [turns, setTurns] = useState(0); // État pour les tours
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false); // État pour indiquer si le jeu a démarré ou non
  const [audioPlayed, setAudioPlayed] = useState(false); // État pour suivre si l'audio a été joué

  const pairFoundAudio = new Audio(pairFoundSound); // Créer une instance de l'objet Audio pour le son de la paire trouvée
  const backgroundAudio = new Audio(backgroundMusic); // Créer une instance de l'objet Audio pour la musique de fond

  // Gérer la lecture de la musique de fond
  useEffect(() => {
    if (isGameStarted && !audioPlayed) {
      backgroundAudio.loop = true; // Définir la musique de fond en mode boucle
      backgroundAudio.play(); // Démarrer la lecture de la musique de fond
      setAudioPlayed(true); // Mettre à jour l'état pour indiquer que l'audio a été joué
    }
  }, [isGameStarted, audioPlayed]); // Exécuter cette fonction chaque fois que isGameStarted ou audioPlayed change

  // Gestion du clic sur le bouton "Jouer"
  const handlePlayClick = () => {
    const initialCards = originalCardImages.flatMap(image => [image, { ...image, id: Math.random().toString(36).substr(2, 9) }]); // Créer les paires de cartes (original et copie)
    const shuffledCards = shuffle(initialCards); // Mélanger les cartes
    setCards(shuffledCards); // Mettre à jour les cartes avec le nouveau mélange
    setIsGameStarted(true); // Mettre à jour l'état pour indiquer que le jeu a démarré
    setTurns(0); // Réinitialiser les tours
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        pairFoundAudio.play(); // Jouer le son lorsque vous trouvez une paire
        alert("Ces deux cartes font une paire.");
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
      
    }
  }, [choiceOne, choiceTwo]);

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      {(!isGameStarted && <button onClick={handlePlayClick}>Jouer</button>) || (isGameStarted && (
        <div>
          <button onClick={handlePlayClick}>Rejouer</button> {/* Bouton "Rejouer" s'affiche si le jeu a démarré */}
          <div className="card-grid">
            {cards.map((card) => (
              <SingleCard 
                key={card.id} // Utiliser l'ID unique comme clé
                card={card} 
                handleChoice={handleChoice}
                flipped={choiceOne?.id === card.id || choiceTwo?.id === card.id || card.matched}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
