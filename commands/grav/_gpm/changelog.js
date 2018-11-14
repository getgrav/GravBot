/**
 * @file info embed command
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const gpm = require('./_repository');

exports.changelogEmbed = ({ slug = false, type = false, args, extras = [] } = {}) => {
    if (!slug) { return false; }
    if (!type) {
        type = gpm.getType({ slug });
    }

    const stable = gpm.getStable({ type, slug });
    const testing = gpm.getTesting({ type, slug });
    const log = (args.testing ? testing : stable).changelog;
    const versions = Object.keys(log);

    if (args.version && !versions.includes(args.version)) {
        return { error: `The version *${args.version}* was not found in *${slug}*'s changelog` };
    }

    const version = args.version || versions.shift();
    const changelog = log[version];
    let changelog_content = changelog.content
        .replace(/1\. /g, '')
        .replace('[](#new)', '\n__New__')
        .replace('[](#bugfix)', '\n__Bugfix__')
        .replace('[](#improved)', '\n__Improved__');

    let embed;
    if (type === 'grav') {
        embed = {
            'title': `Grav Core`,
            'url': `https://getgrav.org/downloads`,
            'color': 8670113,
            'footer': {
                'text': `Changelog Date | ${changelog.date}`
            },
            'thumbnail': {
                'url': `https://github.com/w00fz/fa-svg-png/raw/master/999999/png/128/grav.png`
            },
            'author': {
                'name': 'Team Grav',
                'url': 'https://getgrav.org',
                'icon_url': 'https://github.com/w00fz/fa-svg-png/raw/master/999999/png/128/grav.png'
            },
            'fields': []
        };
    } else {
        embed = {
            'title': `${stable.name || testing.name} (${stable.slug || testing.slug})`,
            'url': `https://getgrav.org/downloads/${type}/${stable.slug || testing.slug}`,
            'color': 8670113,
            'footer': {
                'text': `Changelog Date | ${changelog.date}`
            },
            'thumbnail': {
                'url': `https://github.com/w00fz/fa-svg-png/raw/master/999999/png/128/${stable.icon || testing.icon}.png`
            },
            'author': {
                'name': `${stable.author.name || testing.author.name || 'Team Grav' }`,
                'url': `${stable.author.url || testing.author.url || 'https://getgrav.org'}`,
                'icon_url': 'https://cdn.discordapp.com/embed/avatars/1.png'
            },
            'fields': []
        };
    }


    if (changelog_content.length >= 1024) {
        changelog_content = changelog_content.substr(0, 1020) + '\n...';
    }

    embed.fields.push({
        'name': `Changelog (v${version})`,
        'value': `${changelog_content}`
    });

    extras.forEach((extra) => embed.fields.push(extra));

    return embed;
};
