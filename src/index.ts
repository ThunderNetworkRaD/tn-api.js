import CreditsManager from "./CreditsManager.js";
import EventEmitter from 'node:events';
import {IAManager} from "./IAManager.js";

export default class TNC extends EventEmitter {
    token: string | undefined;
    URL = "https://api.thundernetwork.org";
    credits: CreditsManager;
    IA: IAManager;
    id: string | undefined;
    socket: WebSocket | undefined;
    privateSocket: WebSocket | undefined;

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
            if (options.customURL) this.URL = options.customURL;
            if (options.token) this.token = options.token;
        }
        this.credits = new CreditsManager(this.URL, this.token);
        this.IA = new IAManager(this.URL, this.token);
    }

    /**
     * Connects to the server using a WebSocket connection.
     *
     * @return {void} This function does not return any value.
     */
    connect(privateBoolean: boolean = false, secret: string | undefined = undefined) {
        let link = "wss://api.thundernetwork.org/ws";
        if (privateBoolean && secret) {
            link = "wss://api.thundernetwork.org/private";
            console.log("Connecting to private endpoint");
        } else {
            console.log("Connecting to websocket");
        }
        const socket = new WebSocket(link);

        socket.addEventListener("open", () => {
            console.log("Connected to server");

            if (privateBoolean && secret) {
                this.privateSocket = socket;
                console.log("Authenticating");
                socket.send(secret);
            } else {
                this.socket = socket;
            }
        });
        socket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
        });
    }
}