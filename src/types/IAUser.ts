import { IALanguage } from "./IALanguage.js"

export class IAUser {
    id: string;
    username: string;
    permission: string[];
    credits: number;
    language: IALanguage;

    constructor(options: { id: string, username: string, permissions: string[], credits: number, language: string }) {
        this.id = options.id;
        this.username = options.username;
        this.permission = options.permissions;
        this.credits = options.credits;
        switch (options.language) {
            case "en":
                this.language = IALanguage.EN;
                break;
            default:
                this.language = IALanguage.EN;
        }
    }
}