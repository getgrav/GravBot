/**
 * @file presenceUpdate event
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const { updateCounts } = require('./utils/update-users-list');

module.exports = async (oldMember, newMember) => {
    try {
        return updateCounts({ type: 'presence', oldMember, newMember });
    }
    catch (e) {
        newMember.client.log.error(e);
    }
};
