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
     * Sets the credit number for a given ID.
     *
     * @param {string|number} id - The ID of the user.
     * @param {number} number - The new credit number.
     */
    async set(id: string|number, number: number) {
        let req = await axios.post(`${this.URL}/credits/${id}`, { number }, { headers: { Authorization: `Bearer ${this.token}` } });
        if (req.status == 403) throw new Error("No Permission");
        if (req.status == 404) throw new Error("User not Found");
    }

    /**
     * Verifies the given transaction.
     *
     * @param {number} code - The code of the transaction to be verified.
     * @return {void} - This function does not return anything.
     */
    async verifyTransaction(code: number) {
        let req = await axios.post(`${this.URL}/credits/verify/${code}`, {}, { headers: { Authorization: `Bearer ${this.token}` } });
        if (req.status == 403) throw new Error("No Permission");
        if (req.status == 404) throw new Error("Transaction not Found");
    }

    /**
     * Retrieves a transaction by its code.
     *
     * @param {number} code - The code of the transaction.
     * @return {Promise<object>} The transaction object.
     */
    async getTransaction(code: number) {
        let req = await axios.get(`${this.URL}/credits/verify/${code}`);
        if (req.status == 404) throw new Error("Transaction not Found");
        return req.data.transaction;
    }

    /**
     * Sends a payment request to the specified user.
     *
     * @param {number} id - The ID of the user making the payment.
     * @param {number} toPayID - The ID of the user to whom the payment is being made.
     * @param {number} amount - The amount of the payment.
     * @return {void}
     */
    async pay(id: number, toPayID: number, amount: number) {
        if (amount < 0) throw new Error("Invalid Amount");

        let req = await axios.patch(`${this.URL}/credits/${id}`, { amount, to: toPayID }, { headers: { Authorization: `Bearer ${this.token}` } }).catch();
        if (req.data.error == "TOO_MANY_CREDITS") throw new Error("Not Enought Credits");
        if (req.data.error == "NO_NEGATIVE_AMOUNT") throw new Error("Invalid Amount");
        else if (req.status == 403) throw new Error("No Permission");
        if (req.status == 404) throw new Error("User not Found");
    }
}