import * as discord from "discord.js";

/**
 * The TesseractDataResolver identifies different objects and tries to resolve
 * a specific piece of information from them.
 */
export default class TesseractDataResolver {
  client: discord.Client;

  // TODO: Use TesseractClient
  constructor(client: discord.Client) {
    this.client = client;
  }

  /**
   * Resolves a ChannelResolvable to a Channel object.
   */
  resolveChannel(channel: discord.ChannelResolvable, channels: discord.Collection<discord.Snowflake, discord.Channel>): discord.Channel {
    if (!channels) channels = this.client.channels;

    if (channel instanceof discord.Channel) return channel;

    if (typeof channel === "string")
      return channels.get(channel)
        || channels.filter(c => c.type === "category" || c.type === "text" || c.type === "voice")
            .find((c: discord.CategoryChannel | discord.TextChannel | discord.VoiceChannel) => c.name === channel)
        || null;

    if (channel instanceof discord.Message) return channel.channel;
    if (channel instanceof discord.Guild) return channel.channels.get(channel.id) || null;
    return null;
  }

  /**
   * Resolves a GuildResolvable to a Guild object.
   */
  resolveGuild(guild: discord.GuildResolvable): discord.Guild {
    if (guild instanceof discord.Guild) return guild;
    if (typeof guild === "string") return this.client.guilds.get(guild) || this.client.guilds.find(g => g.name === guild) || null;
    return null;
  }

  /**
   * Resolves a GuildMemberResolvable to a GuildMember object.
   */
  resolveGuildMember(guild: discord.GuildResolvable, user: discord.UserResolvable): discord.GuildMember {
    if (user instanceof discord.GuildMember) return user;
    guild = this.resolveGuild(guild);
    user = this.resolveUser(user);
    if (!guild || !user) return null;
    return guild.members.get(user.id) || null;
  }

  /**
   * Resolves a RoleResolvable to a Role object.
   */
  resolveRole(guild: discord.GuildResolvable, role: discord.RoleResolvable): discord.Role {
    if (role instanceof discord.Role) return role;
    guild = this.resolveGuild(guild);
    if (!guild) return null;
    if (typeof role === "string") return guild.roles.get(role) || guild.roles.find(r => r.name === role);
    return null;
  }

  /**
   * Resolves a UserResolvable to a User object.
   */
  resolveUser(user: discord.UserResolvable): discord.User {
    if (user instanceof discord.User) return user;
    if (user instanceof discord.GuildMember) return user.user;
    if (user instanceof discord.Message) return user.author;
    if (user instanceof discord.Guild) return user.owner.user;
    if (typeof user === "string") return this.client.users.get(user) || null;
    return null;
  }
};
