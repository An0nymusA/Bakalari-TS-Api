import { AxiosResponse } from 'axios';

import BakalariApiConnector, {
    BakalariAuthOptions,
} from './BakalariApiConnector.js';
import ApiConnector from './ApiConnector.js';

import { Kommens, KommensOptions } from '../types/kommens.js';
import { Timetable, TimetableOptions } from '../types/timetable.js';
import { Marks } from '../types/marks.js';
import { Subjects } from '../types/subjects.js';
import { User } from '../types/user.js';
import { City, School } from '../types/municipality.js';
import { Absences } from '../types/absence.js';

const utils = {
    transformIds: (input): object => {
        const result = {};

        for (const key in input) {
            const value = input[key];

            if (
                value.length == 0 ||
                (value[0].Id == null && value[0].DayOfWeek == null)
            ) {
                result[key] = value;

                continue;
            }

            result[key] = value.reduce((acc, curr) => {
                if (curr.Id) {
                    acc[curr.Id] = curr;
                } else if (curr.DayOfWeek) {
                    acc[curr.DayOfWeek] = curr;
                }
                return acc;
            }, {});
        }

        return result;
    },
};

const extractFileName = (response: AxiosResponse<unknown, unknown>): string => {
    const header = response.headers['content-disposition'];

    let filename = /name="(.*?)"/.exec(header)[1];
    if (filename.startsWith('=?utf-8?B?')) {
        filename = Buffer.from(filename.slice(10, -2), 'base64').toString(
            'utf8',
        );
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
    static instance: BakalariApi | null = null;

    /**
     * Holds a reference to the BakalariApiConnector which manages API requests
     */
    connector: BakalariApiConnector | null = null;

    /**
     * Static method to initialize the BakalariApi. This ensures proper setup before accessing the API
     */
    static initialize = async (
        authOptions: BakalariAuthOptions,
    ): Promise<BakalariApi> => {
        // Initializes the BakalariApiConnector with the provided authentication options
        const connector = await BakalariApiConnector.initialize(authOptions);

        // Create and return a new instance of BakalariApi with the initialized connector
        return new BakalariApi(connector);
    };

    /**
     * Getter for retrieving the singleton instance of BakalariApi
     */
    static get getInstance(): BakalariApi {
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
    constructor(connector: BakalariApiConnector) {
        this.connector = connector;

        BakalariApi.instance = this;
    }

    /**
     * Get the current user info
     * @returns {Promise<User>}
     */
    async user(): Promise<User> {
        return (await this.connector.get(`/api/3/user`)).data;
    }

    /**
     * Get list and info about subjects
     * @returns {Promise<Subjects>}
     */
    async subjects(): Promise<Subjects> {
        return (await this.connector.get(`/api/3/subjects`)).data;
    }

    /*
     * Get absence info for the current user
     * @returns {Promise<Absences>}
     */
    async absence(): Promise<Absences> {
        return (await this.connector.get(`/api/3/absence/student`)).data;
    }

    /**
     * Get timetable based on given options
     * @param {string} options.type - Type of timetable to get (actual, permanent)
     * @param {string} options.date - Date of the timetable to get (YYYY-MM-DD)
     * @returns {Promise<Timetable>}
     */
    async timetable(
        options: TimetableOptions = {
            type: 'actual',
        },
    ): Promise<Timetable> {
        return utils.transformIds(
            (await this.connector.get(`/api/3/timetable/{type}`, options)).data,
        );
    }

    /**
     * Get all marks for the current user
     * @returns {Promise<Marks>}
     */
    async marks(): Promise<Marks> {
        return (await this.connector.get(`/api/3/marks`)).data;
    }

    /**
     * Get all messages based on given options
     * @param options.noticeboard - Whether to get messages from the noticeboard or not
     * @returns {Promise<Kommens>}
     */
    async kommens(
        options: KommensOptions = { noticeboard: false },
    ): Promise<Kommens> {
        return (
            await this.connector.post(`/api/3/komens/messages/{type}`, {
                type: options.noticeboard || false ? 'noticeboard' : 'received',
            })
        ).data;
    }

    async attachment(options: { id: string }): Promise<{
        data: unknown;
        filename: string;
    }> {
        const response = await this.connector.get(
            `/api/3/komens/attachment/{id}`,
            {
                ...options,
                responseType: 'stream',
            },
        );

        return { data: response.data, filename: extractFileName(response) };
    }

    /**
     * Gets list of schools
     */
    static getMunicipality(): Promise<City[]>;

    /**
     * Get list of websites for City / City part
     * @param city - City / City part name
     */
    static getMunicipality(city: string): Promise<School[]>;

    static async getMunicipality(city?: string): Promise<City[] | School[]> {
        const connector = new ApiConnector({
            baseUrl: 'http://sluzby.bakalari.cz/api/v1/municipality/',
        });

        return (
            await connector.get('/{city}', {
                city,
            })
        ).data;
    }
}

export default BakalariApi;
