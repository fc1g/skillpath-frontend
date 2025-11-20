type CourseRatingProps = {
	rating: number;
};

export default function CourseRating({ rating }: CourseRatingProps) {
	return (
		<div className="flex items-center gap-1">
			<svg className="size-5 text-yellow-500 dark:text-yellow-300">
				<use href="/icons/sprite.svg#star" />
			</svg>
			<span className="font-bold">{rating}</span>
		</div>
	);
}
