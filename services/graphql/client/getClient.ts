'use server';

import { HttpLink } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { getApiUrl } from '@/services/utils';

export const { getClient, query, PreloadQuery } = registerApolloClient(
	async () => {
		return new ApolloClient({
			cache: new InMemoryCache(),
			link: new HttpLink({
				uri: `${getApiUrl()}/courses/graphql`,
			}),
		});
	},
);
