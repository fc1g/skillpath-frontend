import { useEffect } from 'react';

export const useSpotlightEffect = () => {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const cards = document.querySelectorAll<HTMLElement>('.spotlight-card')!;

		const handleMove = (e: MouseEvent) => {
			const target = e.currentTarget as HTMLElement;
			const react = target.getBoundingClientRect();
			const x = e.clientX - react.left;
			const y = e.clientY - react.top;

			target.style.setProperty('--mouse-x', `${x}px`);
			target.style.setProperty('--mouse-y', `${y}px`);
		};

		for (const card of cards) {
			card.addEventListener('mousemove', handleMove);
		}

		return () => {
			for (const card of cards) {
				card.removeEventListener('mousemove', handleMove);
			}
		};
	}, []);
};
