import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getUser } from '@/services/getUser';
import { ApolloProvider, AuthBootstrap } from '@/app/providers';
import { Footer, Header } from '@/components/features';

export default async function AppLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value;

	const user = await getUser(accessToken);

	return (
		<ApolloProvider>
			<AuthBootstrap user={user} />

			<div className="wrapper">
				<Header />

				<main className="flex-auto">{children}</main>

				<Footer />
			</div>
		</ApolloProvider>
	);
}
