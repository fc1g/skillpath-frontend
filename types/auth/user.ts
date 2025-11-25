import { ProviderType, RoleType } from '@/types/auth';
import { AbstractEntity } from '@/types/base';

export type User = {
	email: string;
	name: string | null;
	roles: RoleType[];
	providers: ProviderType[];
	hasPassword: boolean;
} & AbstractEntity;
