/**
 * @file define command
 * @license MIT
 */
const https = require('https');
const fs = require('fs');
const yamlLint = require('yaml-lint');

exports.exec = async (Bastion, message, args) => {
  try {
    if (!args.message || !(parseInt(args.message) < 9223372036854775807)) {
      /**
      * The command was ran with invalid parameters.
      * @fires commandUsage
      */
      return Bastion.emit('commandUsage', message, this.help);
    }

    let channel = message.mentions.channels.first();
    if (!channel) {
      channel = message.channel;
    }

    let citedMessage = await channel.fetchMessage(args.message);

    let yamlFile;
    if (citedMessage.attachments.size) {
      if (citedMessage.attachments.first().filename.includes('.yaml')) {
        let url = citedMessage.attachments.first().url;
        let name = citedMessage.attachments.first().filename;
        const file = fs.createWriteStream(name);
        https.get(url, response => {
          response.pipe(file);
        });
        yamlFile = file;
      }
    }

    if (!yamlFile && !citedMessage.content) {
      return message.channel.send({
        embed: {
          color: Bastion.colors.BLUE,
          author: {
            name: `${citedMessage.author.tag} ${message.channel.id === citedMessage.channel.id ? '' : `in #${citedMessage.channel.name}`}`
          },
          description: '*The message doesn\'t have any content that can be validated.*',
          fields: [
            {
              name: 'Link to Message',
              value: `https://discordapp.com/channels/${citedMessage.guild.id}/${citedMessage.channel.id}/${citedMessage.id}`
            }
          ],
          timestamp: citedMessage.createdAt
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    }

    if (yamlFile) {
      yamlLint.lintFile(yamlFile).then( () => {
        message.channel.send({
          embed: {
            color: Bastion.colors.GREEN,
            title: ':white_check_mark: **test attachments**',
            fields: [
              {
                name: 'Link to YAML',
                value: `https://discordapp.com/channels/${citedMessage.guild.id}/${citedMessage.channel.id}/${citedMessage.id}`
              }
            ]
          }
        }).catch(e => {
          Bastion.log.error(e);
        });
      }).catch((error) => {
        message.channel.send({
          embed: {
            color: Bastion.colors.RED,
            title: ':x: **test attachments**',
            description: `Read the result below to fix your yaml \n ${yamlFile} \n \`\`\` ${error} \`\`\``,
            fields: [
              {
                name: 'Link to YAML',
                value: `https://discordapp.com/channels/${citedMessage.guild.id}/${citedMessage.channel.id}/${citedMessage.id}`
              }
            ]
          }
        }).catch(e => {
          Bastion.log.error(e);
        });
      });
    }
    else {
      yamlLint.lint(citedMessage.content).then( () => {
        message.channel.send({
          embed: {
            color: Bastion.colors.GREEN,
            title: ':white_check_mark: **SUCCESS**',
            description: citedMessage.content,
            fields: [
              {
                name: 'Link to YAML',
                value: `https://discordapp.com/channels/${citedMessage.guild.id}/${citedMessage.channel.id}/${citedMessage.id}`
              }
            ]
          }
        }).catch(e => {
          Bastion.log.error(e);
        });
      }).catch((error) => {
        message.channel.send({
          embed: {
            color: Bastion.colors.RED,
            title: ':x: **INVALID YAML**',
            description: `Read the result below to fix your yaml \n \`\`\` ${error} \`\`\``,
            fields: [
              {
                name: 'Link to YAML',
                value: `https://discordapp.com/channels/${citedMessage.guild.id}/${citedMessage.channel.id}/${citedMessage.id}`
              }
            ]
          }
        }).catch(e => {
          Bastion.log.error(e);
        });
      });
    }
  }
  catch (e) {
    if (e.toString().includes('Unknown Message')) {
      /**
      * Error condition is encountered.
      * @fires error
      */
      Bastion.emit('error', Bastion.strings.error(message.guild.language, 'notFound'), Bastion.strings.error(message.guild.language, 'messageNotFound', true), message.channel);
    }
    else {
      Bastion.log.error(e);
    }
  }
};

exports.config = {
  aliases: [ 'sintax' ],
  enabled: true,
  argsDefinitions: [
    { name: 'message', type: String, defaultOption: true }
  ]
};

exports.help = {
  name: 'yaml',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'yaml <MESSAGE_ID>',
  example: [ 'yaml 221133446677558899' ]
};
