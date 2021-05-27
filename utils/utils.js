import fetch from 'node-fetch'

const GITHUB_RAW = 'https://raw.githubusercontent.com';

// https://raw.githubusercontent.com/IATI/IATI-Codelists/v2.03/validatorCodelist/codelist_rules.json
export async function fetchJSONfromGitHub(repo, branch, fileName) {
    const res = await fetch(`${GITHUB_RAW}/IATI/${repo}/${branch}/${fileName}`, {
        method: 'GET',
        headers: {
            Accept: 'text/plain',
        },
    });
    return res.json();
}

export async function fetchTextfromGitHub(repo, branch, fileName) {
    const res = await fetch(`${GITHUB_RAW}/IATI/${repo}/${branch}/${fileName}`, {
        method: 'GET',
        headers: {
            Accept: 'text/plain',
        },
    });
    return res.text();
}