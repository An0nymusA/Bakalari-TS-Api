import { AxiosInstance, AxiosResponse } from 'axios';
declare class ApiConnector {
    /**
     * Instance of the axios library for making HTTP requests
     */
    axiosInstance: AxiosInstance;
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
    constructor(authOptions: AuthOptions);
    private parseVariableRoutes;
    /**
     * Makes a GET request to the provided endpoint.
     *
     * @param endpoint - API endpoint to make the GET request to. Default is '/'.
     * @param payload - The data that will be sent.
     * @returns Promise containing the response from the GET request.
     */
    get(endpoint?: string, config?: object): Promise<AxiosResponse>;
    /**
     * Makes a POST request to the provided endpoint.
     *
     * @param endpoint - API endpoint to make the POST request to. Default is '/'.
     * @param payload - Data or configurations for the POST request. Default is an empty object.
     * @returns Promise containing the response from the POST request.
     */
    post(endpoint?: string, payload?: object, config?: object): Promise<AxiosResponse>;
}
export default ApiConnector;
export { AuthOptions };
interface AuthOptions {
    baseUrl: string;
    suffix?: string;
    headers?: object;
}
