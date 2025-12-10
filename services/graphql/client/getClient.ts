'use server';

import { INTERNAL_API_URL } from '@/config/env';
import { HttpLink } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from '@apollo/client-integration-nextjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(
	async () => {
		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new HttpLink({
				uri: `${INTERNAL_API_URL}/courses/graphql`,
			}),
		});
	},
);
