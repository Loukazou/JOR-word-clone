import { ChangeEvent, FormEvent, useState } from "react"
import { initialState } from "../../App"
import { NUM_OF_GUESSES_ALLOWED } from "../../constants"
import { checkGuess } from "../../game-helpers"
import Banner from "../Banner"
import GuessInput from "../GuessInput"

export type Guess = {
	letter: string
	status: string
}[]

interface GameProps {
	addGuessToList: (guess: Guess, attempt: number) => void
	resetGuessList: () => void
	answer: string
	initialGuess?: string
}

function Game({
	addGuessToList,
	resetGuessList,
	answer,
	initialGuess = "",
}: GameProps) {
	const [guess, setGuess] = useState(initialGuess)
	const [status, setStatus] = useState(initialState.status)
	const [attempt, setAttempt] = useState(initialState.count)

	const handleWin = () => setStatus("win")
	const handleLose = () => setStatus("lose")
	const handleReset = () => {
		setGuess(initialGuess)
		setStatus(initialState.status)
		setAttempt(initialState.count)
		resetGuessList()
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const validGuess = guess.length === 5
		if (!validGuess) return

		const result = checkGuess(guess, answer)
		if (!result) return

		const everyLetterIsCorrect = result.every(
			(letter) => letter.status === "correct",
		)
		const maxAttemptReached = attempt === NUM_OF_GUESSES_ALLOWED - 1

		addGuessToList(result, attempt)
		setAttempt(attempt + 1)

		if (everyLetterIsCorrect) handleWin()
		else if (maxAttemptReached) handleLose()

		// Reset input
		setGuess(initialGuess)
	}

	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const guess = e.target.value
			.replace(/[^a-zA-Z]/g, "")
			.slice(0, 6)
			.toUpperCase()
		setGuess(guess)
	}
	return (
		<>
			<form className="guess-input-wrapper" onSubmit={handleSubmit}>
				{status === "play" ? (
					<GuessInput guess={guess} inputChange={inputChange} />
				) : (
					<Banner
						answer={answer}
						attempt={attempt}
						handleReset={handleReset}
					/>
				)}
			</form>
		</>
	)
}

export default Game
