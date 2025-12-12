'use client';

import { Separator } from '@/components/ui';
import { useOAuth } from '@/hooks';
import { ProviderType } from '@/types/auth';
import OAuthButton from './OAuthButton';

export default function OAuthSection() {
	const { startOAuth } = useOAuth();

	return (
		<div className="flex flex-col justify-center gap-4">
			<div className="flex flex-col items-center space-y-1">
				<span className="text-sm">Or continue with</span>
				<Separator />
			</div>

			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				<OAuthButton
					icon="google"
					className="size-52 fill-black md:size-48 dark:fill-white"
					onClick={() => startOAuth(ProviderType.GOOGLE)}
				/>

				<OAuthButton
					icon="github"
					className="size-24 dark:fill-white"
					onClick={() => startOAuth(ProviderType.GITHUB)}
				/>
			</div>
		</div>
	);
}
