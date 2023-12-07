import { io } from "socket.io-client";
import CreditsManager from "./CreditsManager.js";
import EventEmitter from 'node:events';
import IAManager from "./IAManager.js";

export default class TNC extends EventEmitter {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";
    credits: CreditsManager;
    IA: IAManager;
    id: string | undefined;

    /**
     * Constructor for the class.
     *
     * @param {Object} options - Optional parameters for the constructor.
     * @param {string} options.customURL - Custom URL for the constructor.
     * @param {string} options.token - Token for the constructor.
     */
    constructor(options?: { customURL?: string, token?: string }) {
        super();
        if (options) {
            this.URL = options.customURL || this.URL;
            this.token = options.token;
        }
        this.credits = new CreditsManager(this.URL, this.token);
        this.IA = new IAManager(this.URL, this.token);
    }

    /**
     * Connects to the server using a WebSocket connection.
     *
     * @return {void} This function does not return any value.
     */
    connect() {
        const socket = io(this.URL);
        socket.on("connect", () => {
            this.id = socket.id;
        });
        socket.on("verify", () => {
            socket.emit("verify", this.token);
        });
        socket.on("ready", (data) => {
            this.emit("ready", data);
        });
        socket.on("discord_verification", (data) => {
            let d = JSON.parse(JSON.stringify(data));
            this.emit("discord_verification", d.id);
        });
    }
}