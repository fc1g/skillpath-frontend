'use client';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks';
import { useHasAuthHydrated, useIsAuthenticated } from '@/store';
import Link from 'next/link';

export default function AccountMenu() {
	const isAuthenticated = useIsAuthenticated();
	const hasAuthHydrated = useHasAuthHydrated();

	const { logout } = useAuth();

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
				<DropdownMenuItem asChild>
					<Link href={APP_ROUTES.MY_COURSES}>My Courses</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={APP_ROUTES.PROFILE}>Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href={APP_ROUTES.AI_ASSISTANT}>Ai Assistant</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				{hasAuthHydrated && isAuthenticated && (
					<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
				)}

				{hasAuthHydrated && !isAuthenticated && (
					<>
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
