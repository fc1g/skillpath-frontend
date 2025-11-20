import type { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getUser } from '@/services/getUser';
import AuthBootstrap from '@/app/providers/auth-bootstrap';
import { Footer, Header } from '@/components/features';
import { ApolloProvider } from '@/app/providers/apollo-provider';

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
