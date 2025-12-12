'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';
import { useRateCourse } from '@/hooks';

const STARS_COUNT = 5;

type LeaveRatingProps = {
	courseId: string;
	initialRating: number | null;
};

export default function LeaveRating({
	courseId,
	initialRating,
}: LeaveRatingProps) {
	const [rating, setRating] = useState<number>(initialRating ?? 0);
	const [hovered, setHovered] = useState<number>(0);
	const { rateCourse, loading, error } = useRateCourse();

	return (
		<div className="bg-muted/50 border-border rounded-lg border p-3">
			<div className="mb-2 text-center">
				<span className="text-foreground text-md font-medium">
					Leave a rating
				</span>
			</div>
			<div className="flex items-center justify-center gap-1">
				{Array.from({ length: STARS_COUNT }, (_, i) => {
					const starValue = i + 1;

					const isActive = (hovered || rating) >= starValue;

					return (
						<Button
							key={starValue}
							variant="ghost"
							size="icon-sm"
							onMouseEnter={() => setHovered(starValue)}
							onMouseLeave={() => setHovered(0)}
							onClick={() => setRating(starValue)}
						>
							<svg
								className={`size-6 transition-colors ${isActive ? 'fill-yellow-600 text-yellow-600 dark:fill-yellow-300 dark:text-yellow-300' : 'text-muted-foreground/40 fill-none'}`}
							>
								<use href="/icons/sprite.svg#star" />
							</svg>
						</Button>
					);
				})}
			</div>

			<Button
				disabled={
					rating === 0 || loading || !!error || initialRating === rating
				}
				onClick={async () => {
					await rateCourse({
						courseId,
						rating,
					});
				}}
				className="mt-3 w-full"
				size="sm"
				variant="default"
			>
				Submit Rating
			</Button>
		</div>
	);
}
