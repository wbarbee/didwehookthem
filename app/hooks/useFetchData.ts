import { useEffect, useState } from 'react';
import { FormattedGameData, TeamInfo } from '../types';

const useFetchData = <
	T extends FormattedGameData | FormattedGameData[] | TeamInfo | null
>(
	endpoint: string,
	processData: (json: any) => T
) => {
	const [formattedData, setFormattedData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		const fetchData = async () => {
			try {
				const response = await fetch(endpoint, { signal });
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const json = await response.json();
				setFormattedData(processData(json));
			} catch (error) {
				if (!signal.aborted) {
					setError(error as Error);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [endpoint, processData]);

	return { data: formattedData, loading, error };
};

export default useFetchData;
