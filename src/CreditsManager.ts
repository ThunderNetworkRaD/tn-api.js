import axios from "axios";

export default class CreditsManager {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";
    
    constructor(customURL: string, token: string | undefined) {
        this.URL = customURL || this.URL;
        this.token = token;
    }

    /**
     * Retrieves the balance for a given user ID.
     *
     * @param {string|number} id - The ID of the user.
     * @return {Promise<number>} The balance of the user.
     */
    async balance(id: string|number) {
        let req = await axios.get(`${this.URL}/credits/${id}`);
        if (req.status == 404) throw new Error("User not Found");
        return req.data.credits;
    }

    /**
     * Sets the ID for the function.
     *
     * @param {number} id - The ID to set.
     * @return {Promise<number>} - The credits of the user.
     */
    async set(id: number) {
        let req = await axios.post(`${this.URL}/credits/${id}`);
        if (req.status == 404) throw new Error("User not Found");
        return req.data.credits;
    }
}