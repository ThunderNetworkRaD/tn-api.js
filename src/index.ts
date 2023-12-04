import { io } from "socket.io-client";
import CreditsManager from "./CreditsManager.js";
import EventEmitter from 'node:events';

export default class TNC extends EventEmitter {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";
    credits: CreditsManager;
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
    }

    /**
     * Connects to the server using a WebSocket connection.
     *
     * @return {void} This function does not return any value.
     */
    connect() {
        const socket = io(this.URL);
        socket.on("connect", () => {
            console.log(socket.id);
            this.id = socket.id;
        });
        socket.on("verify", () => {
            console.log("send verification")
            socket.emit("verify", this.token);
        });
        socket.on("ready", (data) => {
            console.log(`Logged in as ${data}`);
            this.emit("ready");
        });

        socket.on("event", (data) => {
            this.emit(data);
        });
    }
}