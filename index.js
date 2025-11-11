import bcd from '@mdn/browser-compat-data' with { type: 'json' };

const dataTargets = ['api',
    'css',
    'html',
    'http',
    'javascript',
    'manifests',
    'mathml',
    'svg',
    'webassembly'
];

dataTargets.forEach((target) => {
    const bcdDatasByTarget = Object.values(bcd[target]);
    bcdDatasByTarget.forEach(bcdDataByTarget => {
        console.log(bcdDataByTarget?.__compat?.support);
    })
    const supportedData = bcd[target]?.__compat;
    if (supportedData) {
        console.log(supportedData);
    }
});