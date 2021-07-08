/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
import { Client, ClientOptions } from "discord.js";
import TesseractClientUtils from "./TesseractClientUtils";
declare class TesseractClient extends Client {
    settingsDirectory: TesseractOptions["settingsDirectory"];
    configurations: ClientConfigurations;
    credentials: ClientCredentials;
    utils: TesseractClientUtils;
    constructor(options: TesseractOptions);
    reloadSettings(): void;
    login(token?: string): Promise<string>;
    toString(): string;
}
interface TesseractOptions extends ClientOptions {
    settingsDirectory: string;
}
interface ClientConfigurations extends Object {
    prefix: string | string[];
}
interface ClientCredentials extends Object {
    token: string;
}
export default TesseractClient;
//# sourceMappingURL=TesseractClient.d.ts.map