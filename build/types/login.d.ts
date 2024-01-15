export interface Login {
    /**
     * The version of the API
     */
    'bak:ApiVersion': string;
    /**
     * The version of the app
     */
    'bak:AppVersion': string;
    /**
     * The ID of the user
     */
    'bak:UserId': string;
    /**
     * Acces token for the API
     */
    access_token: string;
    /**
     * Refresh token for the API
     */
    refresh_token: string;
    id_token: string;
    /**
     * Auth token type (Bearer)
     */
    token_type: string;
    /**
     * Token expire date
     */
    expires_in: number;
    /**
     * Token access scope
     */
    scope: string;
}
