export interface School {
    /**
     * The ID of the school
     */
    id: string;
    /**
     * The name of the school
     */
    name: string;
    /**
     * The URL for bakalari
     */
    schoolUrl: string;
}
export interface City {
    /**
     * The name of city, e.g. "Praha", "Brno - Bystrc"
     */
    name: string;
    /**
     * Number of schools in the city / part
     */
    schoolCount: number;
}
