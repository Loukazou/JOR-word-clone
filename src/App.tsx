import { useState } from "react"
import Game, { Guess } from "./components/Game"
import Header from "./components/Header"

import { NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS_ALLOWED } from "./constants"
import { WORDS } from "./data"
import "./reset.css"
import "./styles.css"
import { sample } from "./utils"

// TODO update README!

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
					<div className="guess-results">
						{guessList.map(({ guess, id }) => {
							return (
								<p className="guess" key={id}>
									{guess.length > 0
										? guess.map(({ letter, status }, i) => {
												return (
													<span
														className={`cell ${status || ""}`}
														key={i}
													>
														{letter}
													</span>
												)
										  })
										: Array.from({
												length: NUM_OF_LETTERS_ALLOWED,
										  }).map((_, i) => {
												return (
													<span className="cell" key={i}></span>
												)
										  })}
								</p>
							)
						})}
					</div>
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
