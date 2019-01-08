/**
 * @file users command
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
    try {
        const permissions = ['Admin', 'Grav Core Team', 'Pro'];
        if (!message.member.roles.filter(role => permissions.includes(role.name)).size) {
            return Bastion.log.info(Bastion.i18n.error(message.guild.language, 'lowerRole'));
        }

        const role = message.guild.roles.find(role => role.name === 'Gravitator');
        if (!role) {
            /**
            * Error condition is encountered.
            * @fires error
            */
           return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'roleNotFound'), message.channel);
        }

        const members = message.guild.members
            .filter(m => !m.user.bot && !message.member.roles.filter(role => role.name === 'Gravitator').size);

        members.map(member => member.addRole(role));
        message.channel
        .send(`**${message.author.username}**, role **${role.name}** was added to ${members.size} members`)
        .catch(e => {
            Bastion.log.error(e);
        });

        let reason = 'No reason given';

        /**
        * Logs moderation events if it is enabled
        * @fires moderationLog
        */
        Bastion.emit('moderationLog', message, this.help.name, message.author, reason, {
            role: role
        });
    }
    catch (e) {
        Bastion.log.error(e);
    }
};

exports.config = {
    aliases: [],
    enabled: true
};

exports.help = {
    name: 'gravitateAll',
    description: 'Adds the Gravitator role to all uers!',
    botPermission: 'MANAGE_ROLES',
    userTextPermission: 'MANAGE_ROLES',
    userVoicePermission: '',
    usage: 'gravitateAll',
    example: ['agravitateAll']
};
