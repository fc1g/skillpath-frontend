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
import { useAuth } from '@/hooks';
import { useIsAuthenticated, useUser } from '@/store/useAuthStore';
import Link from 'next/link';

export default function AccountMenu() {
	const isAuthenticated = useIsAuthenticated();
	const user = useUser();

	const { logout } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="icon-lg" variant="ghost">
					<svg className="size-6">
						<use href="/icons/sprite.svg#account-menu" />
					</svg>
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
							<Link href="/login">Login</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/signup">Signup</Link>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
