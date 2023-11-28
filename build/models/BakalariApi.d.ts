import { Kommens, KommensOptions } from '../types/kommens.js';
import { Marks } from '../types/marks.js';
import { Subjects } from '../types/subjects.js';
import { Timetable, TimetableOptions } from '../types/timetable.js';
import { User } from '../types/user.js';
import BakalariApiConnector, { BakalariAuthOptions } from './BakalariApiConnector.js';
import { City, School } from '../types/municipality.js';
/**
 * The BakalariApi class acts as the main entry point for interacting with the Bakalari API
 */
declare class BakalariApi {
    /**
     * Singleton pattern: Holds a single instance of BakalariApi to ensure only one instance exists at a time
     */
    static instance: BakalariApi | null;
    /**
     * Holds a reference to the BakalariApiConnector which manages API requests
     */
    connector: BakalariApiConnector | null;
    /**
     * Static method to initialize the BakalariApi. This ensures proper setup before accessing the API
     */
    static initialize: (authOptions: BakalariAuthOptions) => Promise<BakalariApi>;
    /**
     * Getter for retrieving the singleton instance of BakalariApi
     */
    static get getInstance(): BakalariApi;
    /**
     * Constructor initializes the API with the provided BakalariApiConnector instance
     * @param connector - Instance of BakalariApiConnector to be used for API requests
     */
    constructor(connector: BakalariApiConnector);
    /**
     * Get the current user info
     * @returns {Promise<User>}
     */
    user(): Promise<User>;
    /**
     * Get list and info about subjects
     * @returns {Promise<Subjects>}
     */
    subjects(): Promise<Subjects>;
    /**
     * Get timetable based on given options
     * @param {string} options.type - Type of timetable to get (actual, permanent)
     * @param {string} options.date - Date of the timetable to get (YYYY-MM-DD)
     * @returns {Promise<Timetable>}
     */
    timetable(options?: TimetableOptions): Promise<Timetable>;
    /**
     * Get all marks for the current user
     * @returns {Promise<Marks>}
     */
    marks(): Promise<Marks>;
    /**
     * Get all messages based on given options
     * @param options.noticeboard - Whether to get messages from the noticeboard or not
     * @returns {Promise<Kommens>}
     */
    kommens(options?: KommensOptions): Promise<Kommens>;
    attachment(options: {
        id: string;
    }): Promise<{
        data: unknown;
        filename: string;
    }>;
    /**
     * Gets list of schools
     */
    static getMunicipality(): Promise<City[]>;
    /**
     * Get list of websites for City / City part
     * @param city - City / City part name
     */
    static getMunicipality(city: string): Promise<School[]>;
}
export default BakalariApi;
