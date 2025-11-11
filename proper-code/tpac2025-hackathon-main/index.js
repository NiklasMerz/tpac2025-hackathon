// Imports the node file system to write out data later.
import * as fs from 'node:fs';

// Import the raw bcd data.
import bcd from '@mdn/browser-compat-data' with { type: 'json' };

// These are the categories we want to look though.
const allowedCategoryTargets = [
    'api',
    'css',
    'html',
    'http',
    'javascript',
    'manifests',
    'mathml',
    'svg',
    'webassembly',
];

// These are the only platforms we want to display
const supportedPlatforms = [
    'chrome_android',
    'webview_android',
    'safari_ios',
    'webview_ios',
];

// Results will be saved into this object
const versionCounts = {};

// Loop though the bdc data.
for (const categoryKey of Object.keys(bcd)) {
    // Skip the categories we dont want to include.
    if (!allowedCategoryTargets.includes(categoryKey)) continue;

    // The category data
    const category = bcd[categoryKey];

    // Each category has a list of features stored in key "AbortPaymentEvent"
    for (const featureKey of Object.keys(category)) {
        // We only care for the supported data from each feature.
        const support = category[featureKey]?.__compat?.support || {};

        // Loop the supported data to find out when each platform introduced the feature.
        for (const [platform, info] of Object.entries(support)) {
            // We arnt going to display for all platforms so we will skip...
            if (!supportedPlatforms.includes(platform)) continue;

            // If there is no version data skip.
            const version = info.version_added;
            if (!version) continue;

            // If platform does not exist in the results, add empty place holder.
            if (!versionCounts[platform]) versionCounts[platform] = {};
            // If the version also does no exist, add 0.
            if (!versionCounts[platform][version]) versionCounts[platform][version] = 0;

            // Increment the count.
            versionCounts[platform][version]++;
        }
    }
}

// Finally write out the data that will be fetched from frontend.
fs.writeFileSync('data.json', JSON.stringify(versionCounts), 'utf8');

console.log('New Data Set Created');
