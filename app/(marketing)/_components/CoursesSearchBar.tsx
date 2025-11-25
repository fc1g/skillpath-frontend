'use client';

import { SearchBar } from '@/components/common';
import { APP_ROUTES } from '@/constants/routes';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CoursesSearchBar() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const initialQuery = searchParams.get('search') ?? '';
	const [query, setQuery] = useState(initialQuery);
	const debouncedQuery = useDebouncedValue(query);

	useEffect(() => {
		if (debouncedQuery === initialQuery) return;
		if (debouncedQuery && debouncedQuery.length < 3) return;

		const params = new URLSearchParams(searchParams.toString());

		if (debouncedQuery) {
			params.set('search', debouncedQuery);
		} else {
			params.delete('search');
		}
		params.delete('page');

		router.push(`${APP_ROUTES.COURSES}?${params.toString()}`);
	}, [debouncedQuery, initialQuery, router, searchParams]);

	return <SearchBar value={query} onChange={setQuery} />;
}
