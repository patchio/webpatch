const fsPromises = require('fs').promises
const diff = require('diff')

async function calcDiffData(fileA, fileB) {
  const fileAPath = fileA
  const fileBPath = fileB

  const [oldData, newData] = await Promise.all([fsPromises.readFile(fileAPath, 'utf-8'), fsPromises.readFile(fileBPath, 'utf-8')])

  const difference = diff.diffArrays(oldData, newData)

  return difference
}

module.exports = calcDiffData