'use client';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks';
import { useIsAuthenticated, useUser } from '@/store';
import Link from 'next/link';

export default function AccountMenu() {
	const isAuthenticated = useIsAuthenticated();
	const user = useUser();

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
				<DropdownMenuLabel>{user?.name ?? user?.email}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{isAuthenticated && (
					<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
				)}

				{!isAuthenticated && (
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
