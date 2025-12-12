'use client';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Spinner,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks';
import { useHasHydratedAuthStore, useStatus, useUser } from '@/store';
import Link from 'next/link';

export default function AccountMenu() {
	const hasHydrated = useHasHydratedAuthStore();
	const status = useStatus();
	const user = useUser();

	const { logout } = useAuth();

	if (hasHydrated && status === 'loading')
		return (
			<Button disabled variant="outline">
				<Spinner />
				<span>Loading...</span>
			</Button>
		);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<>
						<svg className="size-6">
							<use href="/icons/sprite.svg#account-menu" />
						</svg>
						<span>
							<strong>Account</strong>
						</span>
					</>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{hasHydrated && status === 'authenticated' && user ? (
					<>
						<DropdownMenuItem asChild>
							<Link href={APP_ROUTES.PROFILE}>Profile</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={APP_ROUTES.MY_COURSES}>My Courses</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={APP_ROUTES.AI_ASSISTANT}>Ai Assistant</Link>
						</DropdownMenuItem>

						<DropdownMenuSeparator />

						<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuSeparator />

						<DropdownMenuItem asChild>
							<Link href={APP_ROUTES.LOGIN}>Login</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href={APP_ROUTES.SIGNUP}>Signup</Link>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
