import fs from "fs";
import { fetchJSONfromGitHub } from "../utils/utils.js";

const VERSIONS = ["2.01", "2.02", "2.03"];

let csv = fs.createWriteStream(`rulesets.csv`);
csv.write(
  `id,category,severity,version,message,xpath,rule type, sub rule type \n`
);

const writeInfoLine = (version, xpath, ruleType, subRuleType, oneCase) => {
  const { id, category, severity, message } = oneCase.ruleInfo;
  csv.write(
    `${id},${category},${severity},${version},\"${message}\",${xpath},${ruleType},${subRuleType} \n`
  );
};

VERSIONS.forEach(async (version) => {
  const rulesetBranch = `v${version}/validatorV2`;

  const versRuleset = await fetchJSONfromGitHub(
    "IATI-Rulesets",
    rulesetBranch,
    "rulesets/standard.json"
  );

  Object.keys(versRuleset).forEach((xpath) =>
    Object.keys(versRuleset[xpath]).forEach((ruleType) => {
      versRuleset[xpath][ruleType].cases.forEach((oneCase) => {
        if (ruleType === "loop") {
          Object.keys(oneCase.do).forEach((subRuleType) => {
            oneCase.do[subRuleType].cases.forEach((subCase) => {
              writeInfoLine(version, xpath, ruleType, subRuleType, subCase);
            });
          });
        } else {
          writeInfoLine(version, xpath, ruleType, "", oneCase);
        }
      });
    })
  );
});
