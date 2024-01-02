import { Login } from '../types/login.js';
import { ApiConnector, AuthOptions } from './ApiConnector.js';

async function login(authOptions: BakalariAuthOptions): Promise<Login> {
    const connector = new ApiConnector(authOptions);

    // Makes a POST request to the login endpoint of the Bakalari API
    const response = await connector.post('/api/login', {
        client_id: 'ANDR',
        grant_type: authOptions.password == null ? 'refresh_token' : 'password',
        username: authOptions.username,
        password: authOptions.password,
        refresh_token: authOptions.refreshToken,
    });

    return response.data;
}

class BakalariApiConnector extends ApiConnector {
    declare authOptions: BakalariAuthOptions;

    /**
     * Private constructor ensures that an instance is created only through the provided static methods
     * @param authOptions
     */
    private constructor(authOptions: BakalariAuthOptions) {
        super({
            ...authOptions,
            headers: {
                Authorization: `Bearer ${authOptions.token}`,
                ...authOptions.headers,
            },
        });

        this.initAutoRelogin();
    }

    private initAutoRelogin = (): void => {
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status !== 401 || originalRequest._retry) {
                    return Promise.reject(error);
                }

                originalRequest._retry = true;
                await BakalariApiConnector.login(this.authOptions);

                originalRequest.headers[
                    'Authorization'
                ] = `Bearer ${this.authOptions.token}`;

                return this.axiosInstance(originalRequest);
            },
        );
    };

    /**
     * Static method for logging into the Bakalari API
     * @param authOptions - Authentication options to be used for logging in
     */
    static login = async (authOptions: BakalariAuthOptions): Promise<void> => {
        const loginData = await login(authOptions);

        // Updates the provided authOptions object with the received access token and refresh token
        authOptions.token = loginData.access_token;
        authOptions.refreshToken = loginData.refresh_token;

        if (!authOptions.onLogin) return;

        authOptions.onLogin(loginData.access_token, loginData.refresh_token);
    };

    /**
     * Method for testing api connection and credentials, throws an error if the connection fails
     */
    test = async (): Promise<void> => {
        await this.get('/api/3/webmodule');
    };

    /**
     * Static method to initialize and return an instance of the BakalariApiConnector class
     * @param authOptions - Authentication options to be used for logging in
     * @returns Instance of the BakalariApiConnector class
     */
    static initialize = async (
        authOptions: BakalariAuthOptions,
    ): Promise<BakalariApiConnector> => {
        // Checks if the baseURL is provided
        if (authOptions.baseUrl == null) {
            throw new Error('URL must be set');
        }

        // Checks if either a token pair or a username-password pair is provided
        if (
            (authOptions.username == null || authOptions.password == null) &&
            authOptions.refreshToken == null &&
            authOptions.token == null
        ) {
            throw new Error(
                'Either token or username and password must be set',
            );
        }

        // If no tokens are provided, attempts to login to the Bakalari API using the provided credentials
        if (authOptions.token == null) {
            await BakalariApiConnector.login(authOptions);
        }

        const connector = new BakalariApiConnector(authOptions);

        await connector.test();

        return new BakalariApiConnector(authOptions);
    };
}

export { BakalariApiConnector, BakalariAuthOptions };

interface BakalariAuthOptions extends AuthOptions {
    username?: string;
    password?: string;
    token?: string;
    refreshToken?: string;
    onLogin?: (token: string, refreshToken: string) => void;
    onLoginError?: () => void;
}
