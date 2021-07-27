# validator-rule-tracker

## General
This repository takes the Codelist Mapping (mapping.xml) used by the Validator V2 from [IATI-Codelists](https://github.com/IATI/IATI-Codelists) and extracts them to .csv format for easier viewing. 

It does the same for Ruleset JSON Rules (ruleset/standard.json) from [IATI-Rulesets](https://github.com/IATI/IATI-Rulesets).

`application.csv` are rules that are coded into the validator and aren't part of codelist or ruleset rules.

## Automation
The `buildcsv.yml` GitHub Actions workflow will run when changes are pushed to IATI-Codelists `mapping.xml` or IATI-Rulesets `ruleset/standard.json` to ensure the .csv's are updated when their source documents are changed.
