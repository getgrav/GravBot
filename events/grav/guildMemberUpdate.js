/**
 * @file guildMemberUpdate event
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const { updateCounts } = require('./utils/update-users-list');

module.exports = async (oldMember, newMember) => {
    try {
        return updateCounts({ type: 'memberUpdate', oldMember, newMember });
    }
    catch (e) {
        newMember.client.log.error(e);
    }
};
