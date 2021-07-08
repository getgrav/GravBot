import * as discord from "discord.js";
import * as lzutf8 from "lzutf8";

import TesseractDataResolver from "./TesseractDataResolver";

/**
 * Utility class to help with common tasks.
 */
export default class TesseractClientUtils {
  client: discord.Client;
  resolver: TesseractDataResolver;

  // TODO: Use TesseractClient
  constructor(client: discord.Client) {
    this.client = client;

    this.resolver = new TesseractDataResolver(this.client);
  }

  /**
   * Compresses the given input string, with LZUTF8 encoding, and returns the
   * compressed binary string.
   */
  compressString(string: string): Promise<string> {
    return new Promise((resolve, reject) => {
      lzutf8.compressAsync(string.toString(), { outputEncoding: "StorageBinaryString" }, (res: string, err: Error) => {
        if (err) return reject(err);
        return resolve(res);
      });
    })
  }

  /**
   * Decompresses the given input BinaryString, encoded with LZUTF8 encoding,
   * and returns the original string.
   */
  decompressString(string: string): Promise<string> {
    return new Promise((resolve, reject) => {
      lzutf8.decompressAsync(string.toString(), { inputEncoding: "StorageBinaryString" }, (res: string, err: Error) => {
        if (err) return reject(err);
        return resolve(res);
      });
    })
  }

  /**
   * Fetches a user from Discord and then fetches their membership in a guild.
   */
  async fetchMember(guild: discord.Guild, id: discord.Snowflake, cache: boolean = true): Promise<discord.GuildMember> {
    let user = await this.client.fetchUser(id, cache);
    return guild.fetchMember(user, cache);
  }
};
