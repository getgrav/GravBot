/**
 * @file users command
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message) => {
    try {
        const total_users = message.guild.members.filter(m => !m.user.bot).size;
        const online_users = message.guild.members.filter(m => !m.user.bot && m.presence.status !== 'offline').size;
        message.channel.send({
            embed: {
                color: Bastion.colors.BLUE,
                author: {
                    name: message.guild.name
                },
                title: 'Users Count',
                description: `Total Users: ${total_users}`,
                fields: [
                    {
                        name: 'Online Users',
                        value: `*${online_users}*`,
                        inline: true
                    },
                    {
                        name: 'Offline Users',
                        value: `*${total_users - online_users}*`,
                        inline: true
                    }
                ],
                thumbnail: {
                    url: message.guild.icon ? message.guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(message.guild.nameAcronym)}`
                },
                image: {
                    url: message.guild.splash ? message.guild.splashURL : null
                }
            }
        }).catch(e => {
            Bastion.log.error(e);
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
    name: 'users',
    description: 'Shows the users count.',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'users',
    example: []
};
