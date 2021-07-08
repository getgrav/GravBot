import * as discord from "discord.js";
import TesseractDataResolver from "./TesseractDataResolver";
export default class TesseractClientUtils {
    client: discord.Client;
    resolver: TesseractDataResolver;
    constructor(client: discord.Client);
    compressString(string: string): Promise<string>;
    decompressString(string: string): Promise<string>;
    fetchMember(guild: discord.Guild, id: discord.Snowflake, cache?: boolean): Promise<discord.GuildMember>;
}
//# sourceMappingURL=TesseractClientUtils.d.ts.map