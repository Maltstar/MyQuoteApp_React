// see https://docs.web3js.org/guides/smart_contracts/infer_contract_types/

const fs = require('fs')
const path = require('path')

//read destination directory submitted as first param
var destination = process.argv.slice(2)[0];

//read all contract artifacts from artifacts.json which should be in the directory from where script should be executed
const artifactContent = fs.readFileSync('./public/contracts/artifacts.json', 'utf-8');

const artifacts: string[] = JSON.parse(artifactContent);

(async function () {
  for (const artifact of artifacts) {
    let content;
    try {
      //try to import from node_modules
      content = JSON.stringify(await import(artifact));
    } catch (e) {
      //try to read as path on disc
      content = fs.readFileSync(artifact, 'utf-8');
    }
    const filename = path.basename(artifact, '.json');
    //create and write typescript file
    fs.writeFileSync(path.join(destination, filename + '.ts'), `const artifact = ${content.trimEnd()} as const; export default artifact;`);
  }
})();

//node -r ts-node/register <script name>.ts <destination>
// Note - you need to create the destination folder before running the script
//e.g:  node -r ts-node/register ./src/scripts/gen-artifact-types.ts ./src/app/gen/artifacts/infos_contract.ts