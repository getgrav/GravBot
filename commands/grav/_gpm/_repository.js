/**
 * @file load repository
 * @author Djamil Legato @ Trilby Media, LLC
 * @license GPL-3.0
 */

const fs = require('fs');
const YAML = require('yaml');

const configurationsFile = fs.readFileSync('./settings/configurations.yaml', 'utf8');
const configurations = YAML.parse(configurationsFile);
const devMode = configurations.dev ? 'dev' : 'prod';

const REPOSITORY = {
    timestamp: fs.statSync(configurations.grav[devMode].gpm.repository).mtime,
    json: JSON.parse(fs.readFileSync(configurations.grav[devMode].gpm.repository))
};

const PROXIES = {
    timestamp: fs.statSync(configurations.grav[devMode].gpm.proxies).mtime,
    json: JSON.parse(fs.readFileSync(configurations.grav[devMode].gpm.proxies))
};

const getRepository = ({ fresh = false } = {}) => {
    const timestamp = fs.statSync(configurations.grav[devMode].gpm.repository).mtime;

    if (fresh || timestamp > REPOSITORY.timestamp) {
        REPOSITORY.timestamp = timestamp;
        REPOSITORY.json = JSON.parse(fs.readFileSync(configurations.grav[devMode].gpm.repository));
        console.log('refreshed');
    }

    return REPOSITORY;
};

const getProxies = ({ fresh = false } = {}) => {
    const timestamp = fs.statSync(configurations.grav[devMode].gpm.proxies).mtime;

    if (fresh || timestamp > PROXIES.timestamp) {
        PROXIES.timestamp = timestamp;
        PROXIES.json = JSON.parse(fs.readFileSync(configurations.grav[devMode].gpm.proxies));
        console.log('refreshed');
    }

    return PROXIES;
};

const getType = ({ slug = null } = {}) => {
    if (!slug) { return false; }

    if (['grav', 'grav-admin', 'grav-update'].includes(slug)) {
        return 'grav';
    }

    if (getStable().plugins[slug] || getTesting().plugins[slug]) {
        return 'plugins';
    }

    if (getStable().themes[slug] || getTesting().themes[slug]) {
        return 'themes';
    }

    if (getStable().skeletons[slug] || getTesting().skeletons[slug]) {
        return 'skeletons';
    }

};

const getStable = ({ type = null, slug = null } = {}) => {
    const repository = getRepository().json;

    if (!slug && !type) { return repository.data['stable']; }
    if (!slug) { return false; }
    if (!type) {
        type = getType(slug);
    }

    return (type === 'grav' ? repository.data['stable'][type] : repository.data['stable'][type][slug]) || { author: {} };
};

const getTesting = ({ type = null, slug = null } = {}) => {
    const repository = getRepository().json;

    if (!slug && !type) { return repository.data['testing']; }
    if (!slug) { return false; }
    if (!type) {
        type = getType(slug);
    }

    return (type === 'grav' ? repository.data['testing'][type] : repository.data['testing'][type][slug]) || { author: {} };
};

const getLinks = ({ type = null, slug = null, isChangelog = false } = {}) => {
    if (!slug) { return false; }
    if (!type) {
        type = getType(slug);
    }

    const links = [];
    const stable = getStable({ type, slug });
    const testing = getTesting({ type, slug });
    const changelog_slug = type === 'grav' ? '' : ':' + (stable.slug || testing.slug);

    if (stable.repository || testing.repository) {
        links.push(`[Repository](${stable.repository || testing.repository})`);
    }
    if (stable.homepage || testing.homepage) {
        links.push(`[Homepage](${stable.homepage || testing.homepage})`);
    }
    if (stable.docs || testing.docs) {
        links.push(`[Docs](${stable.docs || testing.docs})`);
    }
    if (stable.bugs || testing.bugs) {
        links.push(`[Bugs](${stable.bugs || testing.bugs})`);
    }
    if (stable.tag_name || stable.version) {
        links.push(`[${isChangelog ? 'Full ' : ''}Changelog](https://getgrav.org/downloads/${type}/#changelog${changelog_slug})`);
    }

    const linksField = {
        'name': 'Links',
        'value': `${links.join(' • ')}`
    };

    return linksField;
};

exports.getRepository = getRepository;
exports.getProxies = getProxies;
exports.getType = getType;
exports.getStable = getStable;
exports.getTesting = getTesting;
exports.getLinks = getLinks;
