'use server';

import { ApolloClient } from '@apollo/client';

export const catchAllQuery = async <T>(
	options: ApolloClient.QueryOptions,
	client: Promise<ApolloClient>,
): Promise<T | null> => {
	try {
		const apolloClient = await client;
		const { data } = await apolloClient.query(options);
		return data as T;
	} catch (err) {
		console.error('💥 Failed to fetch data: ', err);
		return null;
	}
};
