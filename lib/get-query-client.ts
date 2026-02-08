import {
	QueryClient,
	defaultShouldDehydrateQuery,
	isServer,
} from '@tanstack/react-query';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 10,
				retry: 1,
				refetchOnWindowFocus: false,
				refetchOnReconnect: true,
			},
			dehydrate: {
				shouldDehydrateQuery: query =>
					defaultShouldDehydrateQuery(query) ||
					query.state.status === 'pending',
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient();
	}
	if (!browserQueryClient) {
		browserQueryClient = makeQueryClient();
	}
	return browserQueryClient;
}
