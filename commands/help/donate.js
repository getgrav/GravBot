/**
 * @file donate command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = (Bastion, message) => {
  message.channel.send({
    embed: {
      color: Bastion.colors.DARK_PURPLE,
      title: 'Support Grav\'s development',
      url: 'https://opencollective.com/grav',
      description: '**Share your appreciation and get cool rewards!**' +
                   '\nDonate to support the development of Grav and keep it running forever.' +
                   '\n\nYou can donate via the methods below and get the rewards as mentioned in our tiers.',
      fields: [
        {
          name: 'Open Collective',
          value: 'You can pledge $2+/month here:'
            + '\nhttps://opencollective.com/grav/order/1152'
        },
        {
          name: 'Sponsors',
          value: 'Become a sponsor and get your logo on our README on Github with a link to your site.'
              + '\nhttps://opencollective.com/grav/order/1153'
        }
      ],
      footer: {
        text: 'If everyone using Grav gave $1, we could keep Grav thriving for months to come. Want to read more?'
      }
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
  name: 'donate',
  description: 'Instructions on how to financially support the development of Grav.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'donate',
  example: []
};
