'use client';

import { Input, Label } from '@/components/ui';
import { type FormEvent } from 'react';

type SearchBarProps = {
	value: string;
	onChange: (value: string) => void;
	onSubmit?: (query: string) => void;
};

export default function SearchBar({
	value,
	onChange,
	onSubmit,
}: SearchBarProps) {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit?.(value.trim());
	};

	return (
		<form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl px-4">
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
				value={value}
				onChange={e => onChange(e.target.value)}
			/>
		</form>
	);
}
