'use client';

import { Button } from '@/components/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type CoursesFilterChipProps = {
	label: string;
	fieldKey: string;
};

export default function CoursesFilterChip({
	label,
	fieldKey,
}: CoursesFilterChipProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const value = searchParams.get(fieldKey);
	let isSelected = label.toLowerCase() === value;
	if (!value && label.toLowerCase() === 'all') {
		isSelected = true;
	}

	const handleClick = () => {
		const params = new URLSearchParams(searchParams.toString());
		if (label.toLowerCase() === 'all') {
			params.delete(fieldKey);
		} else {
			params.set(fieldKey, label.toLowerCase());
		}
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isSelected}
			variant={isSelected ? 'ghost' : 'outline'}
			className="capitalize"
		>
			{label}
		</Button>
	);
}
