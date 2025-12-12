'use client';

import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { getApiUrl } from '@/services/utils';

export function makeClient() {
	const httpLink = new HttpLink({
		uri: `${getApiUrl()}/courses/graphql`,
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
	});
}
