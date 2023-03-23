import { useState } from "react"

import Game, { Guess } from "./components/Game"
import Header from "./components/Header"
import { NUM_OF_GUESSES_ALLOWED } from "./constants"
import { WORDS } from "./data"
import { sample } from "./utils"

import GuessResult from "./components/GuessResult"
import "./reset.css"
import "./styles.css"

export interface GameState {
	guessList: () => {
		guess: Guess
		id: number
	}[]
	count: number
	status: "play" | "win" | "lose"
}

export const initialState: Readonly<GameState> = {
	guessList: () =>
		Array.from({ length: NUM_OF_GUESSES_ALLOWED }, (_, i) => {
			return {
				guess: [],
				id: i + 1,
			}
		}),
	count: 0,
	status: "play",
}

function App() {
	const [answer, setNewAnswer] = useState(() => sample(WORDS))

	const [guessList, setGuessList] = useState(initialState.guessList())

	const addGuessToList = (guess: Guess, attempt: number) => {
		if (attempt > 5) return
		const newState = [...guessList]
		newState[attempt] = { ...newState[attempt], guess }
		setGuessList(newState)
	}

	const resetGuessList = () => {
		setGuessList(initialState.guessList())
		setNewAnswer(sample(WORDS))
	}

	return (
		<>
			<div className="wrapper">
				<Header />
				<div className="game-wrapper">
					<GuessResult guessList={guessList}/>
					<Game
						addGuessToList={addGuessToList}
						resetGuessList={resetGuessList}
						answer={answer}
					/>
				</div>
			</div>
		</>
	)
}

export default App
