'use client';

import { cn } from '@/lib/utils';
import React, { type ReactNode } from 'react';

type ErrorBoundaryProps = {
	children: ReactNode;
};
type ErrorBoundaryState = {
	hasError: boolean;
	error?: Error;
};

export default class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return {
			hasError: true,
			error,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('💥 Error caught in ErrorBoundary:', error, errorInfo);
	}

	handleReset = () => {
		this.setState({
			hasError: false,
			error: undefined,
		});
	};

	render() {
		if (this.state.hasError) {
			return (
				<ErrorDisplay
					className="h-full w-full flex-col"
					errorMessage={
						this.state.error?.message || 'An unexpected error occurred'
					}
				/>
			);
		}

		return this.props.children;
	}
}

type ErrorDisplayProps = {
	className: string;
	errorMessage: string;
	children?: React.ReactNode;
};

export function ErrorDisplay({
	className,
	errorMessage,
	children,
}: ErrorDisplayProps) {
	return (
		<section
			role="alert"
			aria-label="Error"
			className={cn('flex w-full items-center justify-center', className)}
		>
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 lg:px-6 lg:py-16">
				<h2
					aria-label="Error message"
					className="text-secondary-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl"
				>
					{errorMessage || 'An unexpected error occurred'}
				</h2>

				{children}
			</div>
		</section>
	);
}
