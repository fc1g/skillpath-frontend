'use client';

import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
import { NEXT_PUBLIC_API_URL } from '@/config/env';

export function makeClient() {
	const httpLink = new HttpLink({
		uri: `${NEXT_PUBLIC_API_URL}/courses/graphql`,
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: httpLink,
	});
}
