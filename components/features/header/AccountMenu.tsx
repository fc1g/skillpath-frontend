'use client';

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Spinner,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { useProfile } from '@/hooks/queries';
import { useLogout } from '@/hooks/mutations';

export default function AccountMenu() {
	const {
		isPending: isPendingProfile,
		isError: isErrorProfile,
		data,
	} = useProfile();
	const { mutate, isPending: isPendingLogout } = useLogout();

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
			{isPendingProfile || isPendingLogout ? (
				<DropdownMenuContent>
					<DropdownMenuItem disabled>
						<Spinner />
						<span>Loading...</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			) : (
				<DropdownMenuContent>
					{data && !isErrorProfile ? (
						<>
							{data.username && !(data.username.length > 15) && (
								<>
									<DropdownMenuLabel>{data.username}</DropdownMenuLabel>
									<DropdownMenuSeparator />
								</>
							)}
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

							<DropdownMenuItem onClick={() => mutate()}>
								Logout
							</DropdownMenuItem>
						</>
					) : (
						<>
							<DropdownMenuSeparator />

							<DropdownMenuItem asChild>
								<Link href={APP_ROUTES.LOGIN}>Login</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href={APP_ROUTES.SIGNUP}>Sign up</Link>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}
