export function unique_generator<Callback extends (...args: never[]) => unknown>(gen: Callback, ...args: Parameters<Callback>): () => ReturnType<Callback> {
	const nums = new Set<ReturnType<Callback>>();

	return (): ReturnType<Callback> => {
		// Type assertion is needed to prevent TS from complaining about the type of the return value of gen.
		let num = gen(...args) as ReturnType<Callback>;

		while (nums.has(num as ReturnType<Callback>))
			num = gen(...args) as ReturnType<Callback>;

		nums.add(num);

		return num;
	};
}
