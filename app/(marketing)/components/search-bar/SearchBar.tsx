'use client';

import { Input, Label } from '@/components/ui';
import { useState } from 'react';

export default function SearchBar() {
	const [query, setQuery] = useState('');

	return (
		<fieldset className="relative mx-auto max-w-2xl px-4">
			<Label htmlFor="search-bar">
				<svg className="text-muted-foreground absolute top-1/2 left-9 size-6 -translate-1/2 transform">
					<use href="/icons/sprite.svg#search" />
				</svg>
			</Label>
			<Input
				className="h-12 pl-10"
				id="search-bar"
				type="text"
				placeholder="Search for courses..."
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
		</fieldset>
	);
}
