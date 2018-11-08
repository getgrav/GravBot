/**
 * @file support command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = (Bastion, message) => {
  message.channel.send({
    embed: {
      color: Bastion.colors.GOLD,
      title: 'Grav Community',
      url: 'https://discord.gg/amBAjn7',
      description: 'Need help or support with Grav?\nJoin the Support Server for any help you need.\nhttps://discord.gg/amBAjn7',
      fields: [
        {
          name: 'Website',
          value: 'https://getgrav.org/'
        }
      ]
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'ss' ],
  enabled: true
};

exports.help = {
  name: 'support',
  description: 'Sends the invite link to Grav Community.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'support',
  example: []
};
