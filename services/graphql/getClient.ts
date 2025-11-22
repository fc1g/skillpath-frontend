import {
	ApolloClient,
	InMemoryCache,
	registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { HttpLink } from '@apollo/client';
import { INTERNAL_API_URL } from '@/config/env';

export const { query, PreloadQuery } = registerApolloClient(async () => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: `${INTERNAL_API_URL}/graphql`,
		}),
	});
});
