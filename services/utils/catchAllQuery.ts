'use server';

import { ApolloClient } from '@apollo/client';

export const catchAllQuery = async <T>(
	options: ApolloClient.QueryOptions,
	client: Promise<ApolloClient>,
): Promise<T> => {
	try {
		const apolloClient = await client;
		const { data } = await apolloClient.query(options);
		return data as T;
	} catch (err) {
		console.error('💥 Failed to fetch data: ', err);

		if (err instanceof Error) {
			throw new Error(err.message || 'Failed to fetch data');
		}

		throw new Error(
			'Something went wrong while fetching data. Please try again later.',
		);
	}
};
