import fs from "fs";
import { fetchJSONfromGitHub } from "../utils/utils.js";

const VERSIONS = ["2.01", "2.02", "2.03"];

let csv = fs.createWriteStream(`rulesets.csv`);
csv.write(
  `id,category,severity,version,message,xpath,rule type, sub rule type,guidance \n`
);

const writeInfoLine = (version, xpath, ruleType, subRuleType, oneCase) => {
  const { id, category, severity, message, link } = oneCase.ruleInfo;
  let guidance = '';
  if (typeof link === 'object' && 'url' in link) {
    guidance = link.url
  }
  if (typeof link === 'object' && 'path' in link) {
    guidance = link.path
  }
  csv.write(
    `${id},${category},${severity},${version},\"${message}\",${xpath},${ruleType},${subRuleType},${guidance} \n`
  );
};

await VERSIONS.reduce(async (memo, version) => {
  await memo;
  const rulesetBranch = `version-${version}`;

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
}, undefined);
