/**
 * @file info embed command
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const filesize = require('filesize');
const gpm = require('./_repository');

exports.infoEmbed = ({ slug = false, type = false, args, extras = [] } = {}) => {
    if (!slug) { return false; }
    if (!type) {
        type = gpm.getType({ slug });
    }

    const stable = gpm.getStable({ type, slug });
    const testing = gpm.getTesting({ type, slug });
    const screenshot = !args.quiet && (stable.screenshot || testing.screenshot);
    let embed;

    if (type === 'grav') {
        embed = {
            'title': `Grav • ${stable.version ? 'v' + stable.version + ' (stable)' : ''} ${testing.version ? (stable.version ? ' / ' : '') + 'v' + testing.version + ' (testing)' : ''}`,
            'description': `Grav ${stable.min_php ? 'v' + stable.version + ' requires PHP v' + stable.min_php : ''} ${testing.min_php ? (stable.min_php ? '\n' : '') + `Grav v${testing.version} requires PHP v${testing.min_php}` : ''}`,
            'url': `https://getgrav.org/downloads`,
            'color': 8670113,
            'timestamp': `${stable.date || testing.date}`,
            'footer': {
                'text': 'Last Update'
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

        // grav core
        if (stable.assets.grav.download) {
            embed.fields.push({
                'name': 'Grav Core (stable)',
                'value': `[Download [${filesize(stable.assets.grav.size)}]](${stable.assets.grav.download})`,
                'inline': true
            });
        }
        if (testing.assets.grav.download) {
            embed.fields.push({
                'name': 'Grav Core (testing)',
                'value': `[Download [${filesize(testing.assets.grav.size)}]](${testing.assets.grav.download})`,
                'inline': true
            });
        }

        // grav admin
        if (stable.assets['grav-admin'].download) {
            embed.fields.push({
                'name': 'Grav Core + Admin (stable)',
                'value': `[Download [${filesize(stable.assets['grav-admin'].size)}]](${stable.assets['grav-admin'].download})`,
                'inline': true
            });
        }
        if (testing.assets['grav-admin'].download) {
            embed.fields.push({
                'name': 'Grav Core + Admin (testing)',
                'value': `[Download [${filesize(testing.assets['grav-admin'].size)}]](${testing.assets['grav-admin'].download})`,
                'inline': true
            });
        }

        // grav update
        if (stable.assets['grav-update'].download) {
            embed.fields.push({
                'name': 'Grav Update (stable)',
                'value': `[Download [${filesize(stable.assets['grav-update'].size)}]](${stable.assets['grav-update'].download})`,
                'inline': true
            });
        }
        if (testing.assets['grav-update'].download) {
            embed.fields.push({
                'name': 'Grav Update (testing)',
                'value': `[Download [${filesize(testing.assets['grav-update'].size)}]](${testing.assets['grav-update'].download})`,
                'inline': true
            });
        }

        embed.fields.push({
            'name': 'Manual GPM Update',
            'value': `\`bin/gpm selfupgrade -f\``
        });
    } else {
        embed = {
            'title': `${stable.name || testing.name} (${stable.slug || testing.slug}) • ${stable.tag_name ? 'v' + stable.tag_name + ' (stable)' : ''} ${testing.tag_name ? (stable.tag_name ? ' / ' : '') + 'v' + testing.tag_name + ' (testing)' : ''}`,
            'description': `${stable.description || testing.description}`,
            'url': `https://getgrav.org/downloads/${type}/${stable.slug || testing.slug}`,
            'color': 8670113,
            'timestamp': `${stable.date || testing.date}`,
            'footer': {
                'text': 'Last Update'
            },
            'thumbnail': {
                'url': `https://github.com/w00fz/fa-svg-png/raw/master/999999/png/128/${stable.icon || testing.icon}.png`
            },
            'image': {
                'url': `${screenshot ? 'https://getgrav.org/user/pages/images/' + screenshot : ''}`
            },
            'author': {
                'name': `${stable.author.name || testing.author.name }`,
                'url': `${stable.author.url || testing.author.url || 'https://getgrav.org'}`,
                'icon_url': 'https://cdn.discordapp.com/embed/avatars/1.png'
            },
            'fields': []
        };

        embed.fields.push({
            'name': 'Name',
            'value': `${stable.name || testing.name}`,
            'inline': true
        });

        embed.fields.push({
            'name': 'Slug',
            'value': `${stable.slug || testing.slug}`,
            'inline': true
        });

        if (stable.zipball_url) {
            embed.fields.push({
                'name': 'Download (stable)',
                'value': `[v${stable.tag_name}](${stable.zipball_url})`,
                'inline': true
            });
        }
        if (testing.zipball_url) {
            embed.fields.push({
                'name': 'Download (testing)',
                'value': `[v${testing.tag_name}](${testing.zipball_url})`,
                'inline': true
            });
        }

        embed.fields.push({
            'name': 'Manual GPM Install',
            'value': `\`bin/gpm install ${stable.slug || testing.slug}\``
        });
    }

    extras.forEach((extra) => embed.fields.push(extra));

    return embed;
};
