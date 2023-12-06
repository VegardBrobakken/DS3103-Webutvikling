import React, { useState, useEffect } from 'react';
import DriverGameModule from '../../modules/DriverGameModule';
import { IGameState } from '../../interfaces/IGameState';

const DriverGame: React.FC = () => {
    // Setter default gamestate som bruker IGameState interfacet
    const [gameState, setGameState] = useState<IGameState>({
        score: 0,
        highScore: parseInt(localStorage.getItem('highScore') || "0"),
        currentDriver: null,
        driverOptions: [],
    });

    // Behandler det som brukeren klikker på. "some" sjekker om det brukeren valgte matcher en av alternativene som er blitt presentert
    const handleUserClick = (selectedDriver: string) => {
        const isCorrect = gameState.driverOptions.some(
            (driverOption) => driverOption.name === selectedDriver && driverOption.correct
        );

        // Hvis brukeren svarer riktig, øker scoren med 1 i forhold til den gamle scoren i state
        if (isCorrect) {
                setGameState((prevState) => ({
                ...prevState,
                score: prevState.score + 1,
            }));
        } else {
        
        // Sjekker om siste score var høyere enn highscore. Hvis den er høyere, settes ny score til highscore
        if (gameState.score > gameState.highScore) {
            setGameState((prevState) => ({
            ...prevState,
            highScore: prevState.score,
        }));
        
        // Lagrer så highscore i localstorage
        localStorage.setItem('highScore', String(gameState.score));
        }

        // Bestemmer hva slags tilbakemeldig brukeren skal få basert på resultatet
        if (gameState.score <= gameState.highScore) {
            alert(`Feil svar. Din poengsum: ${gameState.score}`);
        } else {
            alert(`Feil svar. Men gratulerer med ny rekord! Den nye rekorden er: ${gameState.score}`)
        }
        initializeGame();
    }
    generateNewDrivers();
  };

  // Oppdaterer spillets tilstand og setter score til 0. 
  const initializeGame = () => {
    setGameState((prevState) => ({
      ...prevState,
      score: 0,
    }));
    generateNewDrivers();
  };

  // Genererer nye drivers til spillet. 
    const generateNewDrivers = () => {  
        const allDrivers = DriverGameModule.getAll();   // Henter alle drivers fra module
        const shuffledDrivers = allDrivers.sort(() => Math.random() - 0.5);   // Genererer tilfeldige tall mellom -0.5 og 0.5
        const correctDriverIndex = Math.floor(Math.random() * 3);   // Genererer tilfeldig tall mellom 0 og 2
        const currentDriver = shuffledDrivers[correctDriverIndex];   // Velger driveren fra det stokkede arrayet ved hjelp av det tilfeldige tallet fra "correctDriverIndex" variablen

        // Opretter et nytt array som inneholder den riktige driveren (currentDriver) først i arrayet
        const driverOptions = [
            currentDriver,
            ...shuffledDrivers    // Legger til to drivers til fra shuffledDrivers arrayet
            .filter((driver) => driver !== currentDriver)   // Filtrerer ut den korrekte driveren 
            .slice(0, 2), // velger de første to gjenværende driversa i det shuffla arrayet etter filtrering
            ].map((driver) => ({  // mapper hvert element i driverOptions til et nytt objekt 
                name: driver.name,
                image: `../images/driversForModule/${driver.image}`,
                correct: driver === currentDriver,
            }));

        // Oppdaterer staten på spillet. Gjør så rekkefølgen på svaralternativene er tilfeldig for hver spillrunde
        setGameState((prevState) => ({  
            ...prevState,
            currentDriver: currentDriver.name,
            driverOptions: driverOptions.sort(() => Math.random() - 0.5),
        }));
    };

    // useEffect sørger for at initializeGame blir kalt på for den første spillrunden.
    useEffect(() => {
        initializeGame();
    }, []);

    return (
    <div className='game-container'>
        <h1 className='text-center custom-font'>Driver Guessing Game</h1>
        <p className="game-info">Spillet går ut på at du får et navn på en kjent formel 1 sjåfør, så er det din oppgave å trykke på rett person. For vært riktig trykk, får du ett poeng. Velger du feil blir scoren din resatt. </p>
        <p className='fs-4'>Score: {gameState.score}</p>
        <p>Trykk på: <span className='fw-bold'>{gameState.currentDriver}</span></p>
        <div className='driver-boxes'>
            {gameState.driverOptions.map((driverOption) => (
            <img className='driver-image'
                key={driverOption.name}
                src={`${driverOption.image}`}
                alt={`Foto. Image of driver: ${driverOption.name}`}
                onClick={() => handleUserClick(driverOption.name)}
            ></img>
            ))}
        </div>
        <p><span className='fw-bold'>Din rekord:</span> {gameState.highScore}</p>
    </div>
    );
};

export default DriverGame;
