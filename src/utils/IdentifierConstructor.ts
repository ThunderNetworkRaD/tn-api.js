import { IdentifierType } from "../types/IdentifierType";

export class Identifier {
    type: IdentifierType;
    value: string;
    constructor(type: IdentifierType, value: string) {
        this.type = type;
        this.value = value;
    }
    /**
     * Concatenates the type and value of the Identifier.
     * This make the Identifier readable from the API parser
     *
     * @return {string} The concatenated type and value.
     */
    asString () {
        return `${this.type}:${this.value}`;
    }
}