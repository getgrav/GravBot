/**
 * @file store members count/status on the site
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const fs = require('fs');
const YAML = require('yaml');
const { diff } = require('deep-diff');

const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const configurations = YAML.parse(configurationsFile);
const devMode = configurations.dev ? 'dev' : 'prod';

exports.updateCounts = ({ type, member, oldMember, newMember }) => {
    const servers = Object.values(configurations.grav[devMode].servers);
    const user = member || newMember;
    const guildID = user.guild.id;

    // event not happened in the allowed servers
    if (!servers.includes(guildID)) {
        return false;
    }

    if (type === 'presence' || type === 'memberUpdate') {
        const changes = (diff(oldMember, user) || [])[0];

        // do not care about no changes or in_game presence status updates
        if (!changes || (changes.path[0] === 'frozenPresence' && !diff(oldMember.presence.status, user.presence.status))) { return false; }
    }

    const counts = {
        total: user.guild.members.filter(m => !m.user.bot).size,
        online: user.guild.members.filter(m => !m.user.bot && m.presence.status !== 'offline').size
    };

    // update counts
    fs.writeFileSync(configurations.grav[devMode].counts, JSON.stringify(counts));
    const members = JSON.parse(fs.readFileSync(configurations.grav[devMode].members)).members;
    const memberIndex = members.findIndex(member => member.id === user.id);

    if (type === 'memberRemove' || user.presence.status === 'offline') {
        if (memberIndex > -1) {
            members.splice(memberIndex, 1);
        }
    } else {
        const member = {
            username: user.user.username,
            nickname: user.nickname || user.user.username,
            status: user.presence.status,
            roles: user.roles.map(role => role.name.replace(/ +/g, '-').toLowerCase()),
            avatar_url: user.user.avatar ? user.user.avatarURL.replace(/size=\d+$/, 'size=64') : 'https://cdn.discordapp.com/embed/avatars/1.png',
            id: user.id
        };

        if (memberIndex === -1) {
            members.push(member);
        } else {
            members[memberIndex] = member;
        }
    }

    fs.writeFileSync(configurations.grav[devMode].members, JSON.stringify({ members }));
};
