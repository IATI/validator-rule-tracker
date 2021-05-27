import fs from "fs";
import { fetchTextfromGitHub } from "../utils/utils.js";

const VERSIONS = ["2.01", "2.02", "2.03"];

let csv = fs.createWriteStream(`codelists.csv`);
csv.write(
  `ID,Category,Severity,Codelist,Message,Context (Xpath) \n`
);

const writeInfoLine = (version, xpath, ruleType, subRuleType, oneCase) => {
  const { id, category, severity, message } = oneCase.ruleInfo;
  csv.write(
    `${id},${category},${severity},${version},\"${message}\",${xpath},${ruleType},${subRuleType} \n`
  );
};

VERSIONS.forEach(async (version) => {
  const codelistBranch = `v${version}/validatorCodelist`;

  const versCodelistMapping = await fetchTextfromGitHub(
    "IATI-Codelists",
    codelistBranch,
    "mapping.xml"
  );

  // parse XML 
  // print these columns `ID,Category,Severity,Codelist,Message,Context (Xpath) \n`

  console.log(versCodelistMapping)
});
