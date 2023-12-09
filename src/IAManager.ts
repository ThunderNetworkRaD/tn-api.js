import axios from "axios";

export default class IAManager {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";
    
    constructor(customURL: string, token: string | undefined) {
        this.URL = customURL || this.URL;
        this.token = token;
    }

    async get(id: number) {
        let req = await axios.get(`${this.URL}/IA/${id}`);
        if (req.status == 404) throw new Error("User not Found");
        return req.data;
    }
}