import { SidebarProvider, Toaster } from '@/components/ui';
import { NEXT_PUBLIC_SITE_URL } from '@/config/env';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import {
	ApolloProvider,
	ReactQueryProvider,
	ThemeProvider,
} from './_providers';
import './globals.css';

export const metadata: Metadata = {
	title: {
		default: 'SkillPath',
		template: '%s | SkillPath',
	},
	description:
		'A course-based programming learning platform with interactive lessons & coding challenges, progress tracking, and AI-powered assistance.',
	applicationName: 'SkillPath',
	metadataBase: new URL(NEXT_PUBLIC_SITE_URL),
	icons: {
		icon: '/favicon.ico',
		// 	apple: '/apple-touch-icon.png',
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		siteName: 'SkillPath',
		title: 'SkillPath',
		description:
			'A course-based programming learning platform with interactive lessons & coding challenges, progress tracking, and AI-powered assistance.',
		// 	images: [
		// 		{
		// 			url: '/og-image.png',
		// 			width: 1200,
		// 			height: 630,
		// 			alt: 'SkillPath - Learn programming through interactive courses',
		// 		},
		// 	],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SkillPath',
		description:
			'A course-based programming learning platform with interactive lessons & coding challenges, progress tracking, and AI-powered assistance.',
		// 	images: ['/og-image.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html className="h-full" lang="en" suppressHydrationWarning>
			<body className="h-full">
				<ReactQueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<ApolloProvider>
							<>
								<SidebarProvider
									style={{
										['--sidebar-width' as string]: '20rem',
									}}
								>
									{children}
								</SidebarProvider>

								<Toaster />
							</>
						</ApolloProvider>
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
