/*!
 * @file TesseractClient Class
 * @author Sankarsan Kampa (a.k.a. k3rn31p4nic)
 * @license GPL-3.0
 * @copyright 2018 - The Bastion Bot Project
 */

import { Client, ClientOptions } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import * as YAML from "yaml";

import TesseractClientUtils from "./TesseractClientUtils";

/**
 * The TesseractClient is the starting point of all Discord bots.
 */
class TesseractClient extends Client {
  settingsDirectory: TesseractOptions["settingsDirectory"];
  configurations: ClientConfigurations;
  credentials: ClientCredentials;
  utils: TesseractClientUtils;

  constructor(options: TesseractOptions) {
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

    // Utility methods
    this.utils = new TesseractClientUtils(this);
  }

  /**
   * Reload the Tesseract Bot Settings with new values.
   */
  reloadSettings(): void {
    let configurationsFilePath = path.join(this.settingsDirectory, 'configurations.yaml');
    let configurationsFile = fs.readFileSync(configurationsFilePath, 'utf8');
    this.configurations = YAML.parse(configurationsFile);

    let credentialsFilePath = path.join(this.settingsDirectory, 'credentials.yaml');
    let credentialsFile = fs.readFileSync(credentialsFilePath, 'utf8');
    this.credentials = YAML.parse(credentialsFile);
  }

  /**
   * Logs the client in, establishing a websocket connection to Discord.
   */
  login(token?: string): Promise<string> {
    if (token) {
      this.credentials.token = token;
    }
    return super.login(this.credentials.token);
  }

  // Method override for toString()
  toString(): string {
    return "Tesseract";
  }
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
