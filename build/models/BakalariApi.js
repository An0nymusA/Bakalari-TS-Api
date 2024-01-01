import BakalariApiConnector from './BakalariApiConnector.js';
import ApiConnector from './ApiConnector.js';
const utils = {
    transformIds: (input) => {
        const result = {};
        for (const key in input) {
            const value = input[key];
            if (value.length == 0 ||
                (value[0].Id == null && value[0].DayOfWeek == null)) {
                result[key] = value;
                continue;
            }
            result[key] = value.reduce((acc, curr) => {
                if (curr.Id) {
                    acc[curr.Id] = curr;
                }
                else if (curr.DayOfWeek) {
                    acc[curr.DayOfWeek] = curr;
                }
                return acc;
            }, {});
        }
        return result;
    },
};
const extractFileName = (response) => {
    const header = response.headers['content-disposition'];
    let filename = /name="(.*?)"/.exec(header)[1];
    if (filename.startsWith('=?utf-8?B?')) {
        filename = Buffer.from(filename.slice(10, -2), 'base64').toString('utf8');
    }
    // From "filename*" parameter
    return decodeURIComponent(/filename\*=utf-8''(.*?)(?:;|$)/.exec(header)[1]);
};
/**
 * The BakalariApi class acts as the main entry point for interacting with the Bakalari API
 */
class BakalariApi {
    /**
     * Singleton pattern: Holds a single instance of BakalariApi to ensure only one instance exists at a time
     */
    static instance = null;
    /**
     * Holds a reference to the BakalariApiConnector which manages API requests
     */
    connector = null;
    /**
     * Static method to initialize the BakalariApi. This ensures proper setup before accessing the API
     */
    static initialize = async (authOptions) => {
        // Initializes the BakalariApiConnector with the provided authentication options
        const connector = await BakalariApiConnector.initialize(authOptions);
        // Create and return a new instance of BakalariApi with the initialized connector
        return new BakalariApi(connector);
    };
    /**
     * Getter for retrieving the singleton instance of BakalariApi
     */
    static get getInstance() {
        // Ensure the BakalariApi is initialized before accessing it
        if (BakalariApi.instance == null) {
            throw new Error('BakalariApi is not initialized');
        }
        return BakalariApi.instance;
    }
    /**
     * Constructor initializes the API with the provided BakalariApiConnector instance
     * @param connector - Instance of BakalariApiConnector to be used for API requests
     */
    constructor(connector) {
        this.connector = connector;
        BakalariApi.instance = this;
    }
    /**
     * Get the current user info
     * @returns {Promise<User>}
     */
    async user() {
        return (await this.connector.get(`/api/3/user`)).data;
    }
    /**
     * Get list and info about subjects
     * @returns {Promise<Subjects>}
     */
    async subjects() {
        return (await this.connector.get(`/api/3/subjects`)).data;
    }
    /*
     * Get absence info for the current user
     * @returns {Promise<Absences>}
     */
    async absence() {
        return (await this.connector.get(`/api/3/absence/student`)).data;
    }
    /**
     * Get timetable based on given options
     * @param {string} options.type - Type of timetable to get (actual, permanent)
     * @param {string} options.date - Date of the timetable to get (YYYY-MM-DD)
     * @returns {Promise<Timetable>}
     */
    async timetable(options = {
        type: 'actual',
    }) {
        return utils.transformIds((await this.connector.get(`/api/3/timetable/{type}`, options)).data);
    }
    /**
     * Get all marks for the current user
     * @returns {Promise<Marks>}
     */
    async marks() {
        return (await this.connector.get(`/api/3/marks`)).data;
    }
    /**
     * Get all messages based on given options
     * @param options.noticeboard - Whether to get messages from the noticeboard or not
     * @returns {Promise<Komens>}
     */
    async komens(options = { noticeboard: false }) {
        return (await this.connector.post(`/api/3/komens/messages/{type}`, {
            type: options.noticeboard || false ? 'noticeboard' : 'received',
        })).data;
    }
    async attachment(options) {
        const response = await this.connector.get(`/api/3/komens/attachment/{id}`, {
            ...options,
            responseType: 'stream',
        });
        return { data: response.data, filename: extractFileName(response) };
    }
    static async getMunicipality(city) {
        const connector = new ApiConnector({
            baseUrl: 'http://sluzby.bakalari.cz/api/v1/municipality/',
        });
        return (await connector.get('/{city}', {
            city,
        })).data;
    }
}
export default BakalariApi;
//# sourceMappingURL=BakalariApi.js.map