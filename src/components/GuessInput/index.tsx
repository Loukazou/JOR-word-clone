import { ChangeEvent } from "react"

interface GuessInputProps {
   guess: string
   inputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function GuessInput({guess, inputChange}: GuessInputProps) {
	return (
		<>
			<label htmlFor="guess-input">Enter guess:</label>
			<input
				value={guess}
				onChange={inputChange}
				required
				minLength={5}
				maxLength={5}
				pattern="[a-zA-Z]{5}"
				title="Please enter a guess of 5 letters"
				type="text"
				name="guess"
				id="guess-input"
			/>
		</>
	)
}
