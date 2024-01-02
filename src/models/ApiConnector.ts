import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define the ApiConnector class to manage API requests
class ApiConnector {
    /**
     * Instance of the axios library for making HTTP requests
     */
    axiosInstance: AxiosInstance; //
    /**
     * Authentication options to be used for API requests
     */
    authOptions: AuthOptions;

    /**
     * Constructor of the ApiConnector class.
     * Initializes the axiosInstance with base configurations.
     *
     * @param authOptions - Authentication configuration including baseURL.
     */
    constructor(authOptions: AuthOptions) {
        this.axiosInstance = axios.create({
            baseURL: authOptions.baseUrl, // Setting the base URL for API requests
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Setting content type header for requests
                Accepts: 'application/json',
                ...authOptions.headers,
            },
        });

        this.authOptions = authOptions; // Storing authentication options for future use
    }

    private parseVariableRoutes(
        endpoint: string = '/',
        payload: object = {},
    ): [string, object] {
        for (const key in payload) {
            if (endpoint.includes(`{${key}}`) && payload[key] != null) {
                endpoint = endpoint.replace(`{${key}}`, payload[key]);
                delete payload[key];
            }
        }

        //Remove any remaining (blank) placeholders
        endpoint = endpoint.replaceAll(/\{.+\}/g, '');

        return [endpoint, payload];
    }

    /**
     * Makes a GET request to the provided endpoint.
     *
     * @param endpoint - API endpoint to make the GET request to. Default is '/'.
     * @param payload - The data that will be sent.
     * @returns Promise containing the response from the GET request.
     */
    async get(
        endpoint: string = '/',
        config: object = {},
    ): Promise<AxiosResponse> {
        // Replace placeholders in the endpoint with actual values from the payload
        return this.axiosInstance.get(
            ...this.parseVariableRoutes(endpoint, config),
        );
    }

    /**
     * Makes a POST request to the provided endpoint.
     *
     * @param endpoint - API endpoint to make the POST request to. Default is '/'.
     * @param payload - Data or configurations for the POST request. Default is an empty object.
     * @returns Promise containing the response from the POST request.
     */
    async post(
        endpoint: string = '/',
        payload: object = {},
        config: object = {},
    ): Promise<AxiosResponse> {
        return this.axiosInstance.post(
            ...this.parseVariableRoutes(endpoint, payload),
            config,
        );
    }
}

export { ApiConnector, AuthOptions };

interface AuthOptions {
    baseUrl: string;
    suffix?: string;
    headers?: object;
}
