import ApiConnector, { AuthOptions } from './ApiConnector.js';
declare class BakalariApiConnector extends ApiConnector {
    authOptions: BakalariAuthOptions;
    /**
     * Private constructor ensures that an instance is created only through the provided static methods
     * @param authOptions
     */
    private constructor();
    private initAutoRelogin;
    /**
     * Static method for logging into the Bakalari API
     * @param authOptions - Authentication options to be used for logging in
     */
    static login: (authOptions: BakalariAuthOptions) => Promise<void>;
    /**
     * Method for testing api connection and credentials, throws an error if the connection fails
     */
    test: () => Promise<void>;
    /**
     * Static method to initialize and return an instance of the BakalariApiConnector class
     * @param authOptions - Authentication options to be used for logging in
     * @returns Instance of the BakalariApiConnector class
     */
    static initialize: (authOptions: BakalariAuthOptions) => Promise<BakalariApiConnector>;
}
export default BakalariApiConnector;
export { BakalariAuthOptions };
interface BakalariAuthOptions extends AuthOptions {
    username?: string;
    password?: string;
    token?: string;
    refreshToken?: string;
    onLogin?: (token: string, refreshToken: string) => void;
    onLoginError?: () => void;
}
