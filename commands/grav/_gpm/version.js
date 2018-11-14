/**
 * @file version embed command
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const gpm = require('./_repository');

exports.versionEmbed = ({ slug = false, type = false, args } = {}) => {
    if (!slug) { return false; }
    if (!type) {
        type = gpm.getType({ slug });
    }

    const stable = gpm.getStable({ type, slug });
    const testing = gpm.getTesting({ type, slug });

    let version = '';
    const tag_name = {
        stable: stable.tag_name || stable.version,
        testing: testing.tag_name || testing.version
    };
    if (tag_name.stable) {
        version += `__${tag_name.stable}__`;
    }

    if (tag_name.testing) {
        version = tag_name.stable ? version + ` (stable) / __${tag_name.testing}__ (testing)` : `__${tag_name.testing}__`;
    }

    return version;
};
