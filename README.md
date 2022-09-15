# validator-rule-tracker

## General
This repository hosts 3 CSVs that show all of the possible validation messages from the IATI validator that IATI controls.

### Application `application.csv`
Rules that are coded into the validator and aren't part of codelist or ruleset rules. Also contains refrence to schema error messages that are not controlled by IATI.

### Codelist `codelist.csv`
Uses Codelist Mapping (mapping.xml) used by the Validator V2 from [IATI-Validator-Codelists](https://github.com/IATI/IATI-Validator-Codelists) and extracts them to .csv format for easier viewing. 

### Ruleset `ruleset.csv`
It does the same for Ruleset JSON Rules (ruleset/standard.json) from [IATI-Rulesets](https://github.com/IATI/IATI-Rulesets).


## Automation
The `buildcsv.yml` GitHub Actions workflow will run when changes are pushed to IATI-Codelists `mapping.xml` or IATI-Rulesets `ruleset/standard.json` to ensure the .csv's are updated when their source documents are changed.
