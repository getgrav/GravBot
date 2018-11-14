/**
 * @file ready event
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const fs = require('fs');
const YAML = require('yaml');
const { diff } = require('deep-diff');

const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const configurations = YAML.parse(configurationsFile);
const devMode = configurations.dev ? 'dev' : 'prod';

module.exports = async Bastion => {
    const server = Object.values(configurations.grav[devMode].servers).shift();
    const guild = Bastion.guilds.find(guild => guild.id === server);
    const total = guild.members.filter(m => !m.user.bot);
    const online = guild.members.filter(m => !m.user.bot && m.presence.status !== 'offline');

    const counts = {
        total: total.size,
        online: online.size
    };

    const members = [];
    online.forEach(member => members.push({
        username: member.user.username,
        nickname: member.nickname || member.user.username,
        status: member.presence.status,
        roles: member.roles.map(role => role.name.replace(/ +/g, '-').toLowerCase()),
        avatar_url: member.user.avatarURL.replace(/size=\d+$/, 'size=64'),
        avatar: member.user.avatar,
        id: member.id
    }));

    // refresh counts
    fs.writeFileSync(configurations.grav[devMode].counts, JSON.stringify(counts));

    // refresh members
    fs.writeFileSync(configurations.grav[devMode].members, JSON.stringify({ members }));
};
