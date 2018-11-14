/**
 * @file users command
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const gpm = require('./_gpm/_repository');
const { infoEmbed } = require('./_gpm/info');
const { versionEmbed } = require('./_gpm/version');
const { changelogEmbed } = require('./_gpm/changelog');

exports.exec = async (Bastion, message, args) => {
    if (!args.command || !args._unknown) { return Bastion.emit('commandUsage', message, this.help); }

    const slugs = args._unknown;
    switch (args.command) {
        case 'info':
            if (!slugs.length) { return Bastion.emit('commandUsage', message, this.help); }

            slugs.forEach((slug) => {
                const type = gpm.getType({ slug });
                if (!type) { return Bastion.emit('error', '', `The slug *${slug}* was not found in the GPM Repository`, message.channel); }

                const links = gpm.getLinks({ type, slug });
                const changelog = { 'name': 'Changelog', 'value': `Type: \`.gpm changelog ${slug} [--testing]\`` };

                const embed = infoEmbed({ slug, type, args, extras: [ links, changelog ] });
                message.channel.send({embed}).catch(e => Bastion.log.error(e));
            });

            break;

        case 'version':
            if (!slugs.length) { return Bastion.emit('commandUsage', message, this.help); }

            const versions = [];
            slugs.forEach((slug) => {
                const type = gpm.getType({ slug });
                if (!type) { return Bastion.emit('error', '', `The slug *${slug}* was not found in the GPM Repository`, message.channel); }

                versions.push(`**${slug}**: ${versionEmbed({ type, slug })}`);
            });

            message.channel.send(versions.join(', ')).catch(e => Bastion.log.error(e));

            break;

        case 'changelog':
            if (!slugs.length) { return Bastion.emit('commandUsage', message, this.help); }

            slugs.forEach((slug) => {
                const type = gpm.getType({ slug });
                if (!type) { return Bastion.emit('error', '', `The slug *${slug}* was not found in the GPM Repository`, message.channel); }

                const embed = changelogEmbed({ slug, type, args });

                if (embed.error) { return Bastion.emit('error', '', embed.error, message.channel); }

                embed.fields.push(gpm.getLinks({ type, slug, isChangelog: true }));
                message.channel.send({embed}).catch(e => Bastion.log.error(e));
            });

            break;
    }
};

exports.config = {
    aliases: [],
    enabled: true,
    argsDefinitions: [
        {name: 'command', type: String, defaultOption: true},
        {name: 'quiet', type: Boolean, alias: 'q', defaultValue: false},
        {name: 'testing', type: Boolean, defaultValue: false},
        {name: 'version', type: String, defaultValue: false}
    ]
};

exports.help = {
    name: 'gpm',
    description: 'Your best friend GPM. Perform GPM commands',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'gpm',
    example: [
        'gpm info admin quark rtfm-site [--quiet]',
        'gpm version admin git-sync',
        'gpm changelog admin [--version 1.8.0] [--testing]'
    ]
};
