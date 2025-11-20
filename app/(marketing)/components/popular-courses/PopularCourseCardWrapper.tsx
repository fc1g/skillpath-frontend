'use client';

import type { ReactNode } from 'react';
import { useSpotlightEffect } from '@/hooks/useSpotlightEffect';

export default function PopularCourseCardWrapper({
	children,
}: {
	children: ReactNode;
}) {
	useSpotlightEffect();
	return children;
}
