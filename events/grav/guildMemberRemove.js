/**
 * @file guildMemberRemove event
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const { updateCounts } = require('./utils/update-users-list');

module.exports = async member => {
    try {
        return updateCounts({ type: 'memberRemove', member });
    }
    catch (e) {
        member.client.log.error(e);
    }
};
