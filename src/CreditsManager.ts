import axios from "axios";

export default class CreditsManager {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";
    
    constructor(customURL: string, token: string | undefined) {
        this.URL = customURL || this.URL;
        this.token = token;
    }

    /**
     * Retrieves the balance of a user with the given ID.
     *
     * @param {number} id - The ID of the user.
     * @return {Promise<number>} The balance of the user.
     */
    async balance(id: number) {
        let req = await axios.get(`${this.URL}/credits/${id}`);
        if (req.status == 404) throw new Error("User not found");
        return req.data.credits;
    }
}