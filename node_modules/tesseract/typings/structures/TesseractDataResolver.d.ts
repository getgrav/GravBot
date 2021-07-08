import * as discord from "discord.js";
export default class TesseractDataResolver {
    client: discord.Client;
    constructor(client: discord.Client);
    resolveChannel(channel: discord.ChannelResolvable, channels: discord.Collection<discord.Snowflake, discord.Channel>): discord.Channel;
    resolveGuild(guild: discord.GuildResolvable): discord.Guild;
    resolveGuildMember(guild: discord.GuildResolvable, user: discord.UserResolvable): discord.GuildMember;
    resolveRole(guild: discord.GuildResolvable, role: discord.RoleResolvable): discord.Role;
    resolveUser(user: discord.UserResolvable): discord.User;
}
//# sourceMappingURL=TesseractDataResolver.d.ts.map