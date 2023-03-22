export const sample = (arr: string[]) => {
	return arr[Math.floor(Math.random() * arr.length)]
}

export const range = (start: number, end: number, step = 1) => {
	let output = []
	if (typeof end === "undefined") {
		end = start
		start = 0
	}
	for (let i = start; i < end; i += step) {
		output.push(i)
	}
	return output
}

export const myRange =  (length: number, start: number, step = 1) => {
  return Array.from({length: length}, (_, index) => {
      if (index === 0) return index + start
      return (step * index) + start
  })
}
