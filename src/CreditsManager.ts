import axios from "axios";
import { validateStatus } from "./index.js";

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
        let req = await axios.get(`${this.URL}/inav/${id}/credits`, { validateStatus });
        if (req.status == 404) throw new Error("User not Found");
        return req.data.credits as number;
    }

    /**
     * Sets the credit number for a given ID.
     *
     * @param {string|number} id - The ID of the user.
     * @param {number} number - The new credit number.
     */
    async set(id: string|number, number: number) {
        let req = await axios.post(
            `${this.URL}/inav/${id}/credits`,
            { number },
            { headers: { Authorization: `Bearer ${this.token}`}, validateStatus}
        );
        if (req.status == 403) throw new Error("No Permission");
        if (req.status == 404) throw new Error("User not Found");
    }
}