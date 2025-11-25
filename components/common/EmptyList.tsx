type EmptyListProps = {
	message: string;
};

export default function EmptyList({ message }: EmptyListProps) {
	return (
		<div className="mt-4 flex h-full items-center justify-center">
			<p className="text-custom-black text-[clamp(1.5rem,5vw,2rem)] font-bold">
				{message}
			</p>
		</div>
	);
}
