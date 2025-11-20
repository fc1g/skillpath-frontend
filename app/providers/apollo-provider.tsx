'use client';

import { ReactNode } from 'react';
import { ApolloNextAppProvider } from '@apollo/client-integration-nextjs';
import { makeClient } from '@/services/graphql/makeClient';

export function ApolloProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
}
