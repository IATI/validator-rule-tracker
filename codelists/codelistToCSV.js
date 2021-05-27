import fs from "fs";
import { parseStringPromise } from "xml2js";

import { fetchTextfromGitHub } from "../utils/utils.js";

const VERSIONS = ["2.01", "2.02", "2.03"];

let csv = fs.createWriteStream(`codelists.csv`);
csv.write(`id,category,severity,version,message,xpath,codelist \n`);

VERSIONS.forEach(async (version) => {
  const codelistBranch = `v${version}/validatorCodelist`;

  const versCodelistMapping = await fetchTextfromGitHub(
    "IATI-Codelists",
    codelistBranch,
    "mapping.xml"
  );

  // parse XML
  const jsonCodelistMapping = await parseStringPromise(versCodelistMapping);

  // print these columns `ID,Category,Severity,Codelist,Message,Context (Xpath) \n`
  jsonCodelistMapping.mappings.mapping.forEach((mapping) => {
    const codelist = mapping.codelist[0].$.ref;
    const path = mapping.path[0];
    let xpath
    if (mapping.condition) {
      let condition = mapping.condition[0]
      xpath = path.split("/@code")[0] + "[" + condition + "]" + "/@code";
    } else {
      xpath = path
    }
    const { category, id, message, severity } =
      mapping["validation-rules"][0]["validation-rule"][0];
    csv.write(
      `${id[0]},${category[0]},${severity[0]},${version},\"${message[0]}\",${xpath},${codelist} \n`
    );
  });
});
