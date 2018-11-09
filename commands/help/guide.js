/**
 * @file guide command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = (Bastion, message) => {
  message.channel.send({
    embed: {
      color: Bastion.colors.GOLD,
      title: 'Installing Grav',
      url: 'https://getgrav.org/downloads',
      description: 'Need help installing and setting up Grav? No worries, we have made an amazing guide to help you out on that. And if you don\'t understand that or you need any more help or maybe if you just have a simple question, just ask!',
      fields: [
        {
          name: 'Grav - Documentation',
          value: 'https://learn.getgrav.org/webservers-hosting'
        }
      ]
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'guide',
  description: 'Shows you the guide on how to setup and install Private Bastion Bot. And links to the Bastion HQ.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'guide',
  example: []
};
