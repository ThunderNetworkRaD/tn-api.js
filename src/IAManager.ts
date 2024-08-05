import axios from "axios";
import {IAUser} from "./types/IAUser.js";
import {Identifier} from "./utils/IdentifierConstructor.js";

export class IAManager {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";

    /**
     * Constructor for IAManager class.
     *
     * @param {string} customURL - The custom URL to use.
     * @param {string | undefined} token - The token to authenticate.
     */
    constructor(customURL: string, token: string | undefined) {
        this.URL = customURL || this.URL;
        this.token = token;
    }

    /**
     * Asynchronously retrieves the number of users from the IA API.
     *
     * @return {Promise<number>} The number of users.
     * @throws {Error} If the API request fails or returns a 404 status.
     */
    async userNumber() {
        let req = await axios.get(`${this.URL}/IA`);
        if (req.status == 404) throw new Error("Something went wrong");
        return parseInt(req.data.number);
    }

    /**
     * Retrieves a user from the IA API.
     *
     * @param {string|number} id - The ID of the user.
     * @return {Promise<IAUser>} The user object.
     * @throws {Error} If the API request fails or returns a 404 status.
     */
    async get(id: string|number) {
        let req = await axios.get(`${this.URL}/IA/${id}`);
        if (req.status == 404) throw new Error("User not Found");
        return new IAUser({
            id: req.data.id,
            username: req.data.username,
            permissions: req.data.permissions,
            credits: req.data.credits,
            language: req.data.language
        });
    }

    /**
     * Searches for a user by their identifier.
     *
     * @param {Identifier} identifier - The identifier to search for.
     * @return {Promise<string>} The ID of the user.
     * @throws {Error} If the API request fails or returns a 404 status.
     */
    async search(identifier: Identifier) {
        let req = await axios.get(`${this.URL}/IA?searchByIdentifier=${identifier.asString()}`);
        if (req.status == 404) throw new Error("Something went wrong");
        return String(req.data.id);
    }

    /**
     * Asynchronously creates a new user in the IA API.
     *
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @param {Identifier} identifier - The identifier of the user.
     * @return {string} The ID of the newly created user.
     */
    async create(username: string, password: string, identifier: Identifier) {
        let req = await axios.post(`${this.URL}/IA}`,
            {
                username,
                password,
                identifier
            });
        return req.data.id;
    }
}