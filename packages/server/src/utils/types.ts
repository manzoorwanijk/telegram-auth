export type AuthDataMap = Map<string, string | number>;

/**
 * @link https://core.telegram.org/widgets/login#receiving-authorization-data
 */
export type TelegramUserData = {
	id: number;
	first_name: string;
	last_name?: string;
	photo_url?: string;
	username?: string;
	// Data from web apps
	is_bot?: boolean;
	language_code?: string;
	is_premium?: boolean;
};
