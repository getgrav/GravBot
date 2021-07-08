"use strict";
/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const TesseractClientUtils_1 = require("./TesseractClientUtils");
class TesseractClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        if (typeof options !== "object") {
            throw new TypeError("A TesseractOptions object needs to be passed.");
        }
        if ('settingsDirectory' in options) {
            this.settingsDirectory = path.resolve(options.settingsDirectory);
            let configurationsFilePath = path.join(this.settingsDirectory, 'configurations.yaml');
            let configurationsFile = fs.readFileSync(configurationsFilePath, 'utf8');
            this.configurations = YAML.parse(configurationsFile);
            let credentialsFilePath = path.join(this.settingsDirectory, 'credentials.yaml');
            let credentialsFile = fs.readFileSync(credentialsFilePath, 'utf8');
            this.credentials = YAML.parse(credentialsFile);
        }
        else {
            throw new ReferenceError("`settingsDirectory` property wasn't found in the TesseractOptions object.");
        }
        this.options = options;
        this.utils = new TesseractClientUtils_1.default(this);
    }
    reloadSettings() {
        let configurationsFilePath = path.join(this.settingsDirectory, 'configurations.yaml');
        let configurationsFile = fs.readFileSync(configurationsFilePath, 'utf8');
        this.configurations = YAML.parse(configurationsFile);
        let credentialsFilePath = path.join(this.settingsDirectory, 'credentials.yaml');
        let credentialsFile = fs.readFileSync(credentialsFilePath, 'utf8');
        this.credentials = YAML.parse(credentialsFile);
    }
    login(token) {
        if (token) {
            this.credentials.token = token;
        }
        return super.login(this.credentials.token);
    }
    toString() {
        return "Tesseract";
    }
}
exports.default = TesseractClient;
//# sourceMappingURL=TesseractClient.js.map