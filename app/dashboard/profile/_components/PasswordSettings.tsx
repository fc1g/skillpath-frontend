import { User } from '@/types/auth';
import SetPassword from './SetPassword';
import ChangePassword from './ChangePassword';

type PasswordSettingsProps = {
	user: User;
};

export default function PasswordSettings({ user }: PasswordSettingsProps) {
	if (user.hasPassword) {
		return <ChangePassword user={user} />;
	}

	return <SetPassword user={user} />;
}
