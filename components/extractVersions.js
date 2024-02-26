// versionFetcher.js

const fetch = require('node-fetch');

async function fetchMarkdownContent(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching Markdown content:', error);
        return null;
    }
}

function extractVersions(markdownText) {
    // Since the network name is always 'mainnet', it's directly included in the regex
    const regex = /mainnet\s*\|\[v([\d.]+)\]\(https?:\/\/[^)]+\)\|\[v([\d.]+)\]\(https?:\/\/[^)]+\)/i;
    const match = markdownText.match(regex);

    if (match) {
        return {
            nodeVersion: match[1],
            proverVersion: match[2]
        };
    } else {
        return {
            nodeVersion: "Not found",
            proverVersion: "Not found"
        };
    }
}

async function getVersionInfo(url) {
    
    const markdownContent = await fetchMarkdownContent(url);
    if (markdownContent) {
        return extractVersions(markdownContent);
    } else {
        return { nodeVersion: 'Error fetching content', proverVersion: 'Error fetching content' };
    }
}


module.exports = getVersionInfo;
