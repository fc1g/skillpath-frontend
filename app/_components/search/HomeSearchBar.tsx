'use client';

import { APP_ROUTES } from '@/constants/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SearchBar } from '@/components/common';

export default function HomeSearchBar() {
	const [query, setQuery] = useState('');
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSubmit = (query: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (query) {
			params.set('search', query);
			params.delete('page');
		} else {
			params.delete('search');
		}

		router.push(`${APP_ROUTES.COURSES}?${params.toString()}`);
	};

	return (
		<SearchBar value={query} onChange={setQuery} onSubmit={handleSubmit} />
	);
}
