import { RoleType } from '@/types/auth/role';
import { ProviderType } from '@/types/auth/oauth-account';

export type User = {
	id: string;
	email: string;
	name: string | null;
	roles: RoleType[];
	providers: ProviderType[];
	hasPassword: boolean;
};
