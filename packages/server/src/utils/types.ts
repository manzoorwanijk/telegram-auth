/**
 * Shape of the data to be passed AuthDataValidator.validate().
 */
export type AuthDataMap = Map<string, string | number>;

/**
 * The expected user data from Telegram.
 *
 * @see https://core.telegram.org/widgets/login#receiving-authorization-data
 */
export interface TelegramUserData {
	id: number;
	first_name: string;
	last_name?: string;
	photo_url?: string;
	username?: string;
	// Data from web apps
	is_bot?: boolean;
	language_code?: string;
	is_premium?: boolean;
}
