#!/usr/bin/env node
/**
 * This script is executed by the 'npm run report' step and augments the cucumber report 
 * files of failed features with screenshots and snapshots. Mechanism was inspired by:
 * https://github.com/jcundill/cypress-cucumber-preprocessor/blob/master/fixJson.js
 * It also leverages the multiple-cucumber-html-reporter library to generate a HTML 
 * report based on the augmented cucumber report files.
 */

const report = require('multiple-cucumber-html-reporter')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const cucumberJsonDir = './cypress/cucumber-json'
const cucumberReportFileMap = {}
const cucumberReportMap = {}
const jsonIndentLevel = 2
const htmlReportDir = './reports/'
const screenshotsDir = './cypress/screenshots'
const videosDir =  './cypress/videos';

getCucumberReportMaps()
addScreenshots()
generateReport()

function getCucumberReportMaps() {
  const files = fs.readdirSync(cucumberJsonDir).filter(file => {
    return file.indexOf('.json') > -1
  })
  files.forEach(file => {
    const json = JSON.parse(
      fs.readFileSync(path.join(cucumberJsonDir, file))
    )
    if (!json[0]) { return }
    const [feature] = json[0].uri.split('/').reverse()
    cucumberReportFileMap[feature] = file
    cucumberReportMap[feature] = json
  })
}

function addScreenshots() {
  /* Credits: 
    https://gist.github.com/kethinov/6658166#gistcomment-3178557
    https://gist.github.com/Phenomite/038c57cdaf95b8b8383a0fd522919662
  */
  // Prepend the given path segment
  const prependPathSegment = pathSegment => location => path.join(pathSegment, location)
  // fs.readdir but with relative paths
  const readdirPreserveRelativePath = location => fs.readdirSync(location).map(prependPathSegment(location))
  // Recursive fs.readdir but with relative paths
  const readdirRecursive = location => readdirPreserveRelativePath(location)
    .reduce((result, currentValue) => fs.statSync(currentValue).isDirectory()
      ? result.concat(readdirRecursive(currentValue))
      : result.concat(currentValue), [])
  const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(file => {
    return file.indexOf('.png') > -1
  })
  // Extract feature list from screenshot list
  const featuresList = Array.from(new Set(screenshots.map(x => x.match(/[\w-_.]+\.feature/g)[0])))
  featuresList.forEach(feature => {
    screenshots.forEach(screenshot => {
      // regex to parse 'I can use scenario outlines with examples' from either of these:
      //   - Getting Started -- I can use scenario outlines with examples (example #1) (failed).png
      //   - Getting Started -- I can use scenario outlines with examples (failed).png
      //   - Getting Started -- I can use scenario outlines with examples.png 
      const regex = /(?<=--\ ).+?((?=\ \(example\ #\d+\))|(?=\ \(failed\))|(?=\.\w{3}))/g
	  //const regex = /(?<=\ --\ ).*?((?=\ \(example\ \#\d+\))|(?=\ \(failed\)))/g
      const [scenarioName] = screenshot.match(regex)
      console.info(chalk.blue('\n    Adding screenshot to cucumber-json report for'))
      console.info(chalk.blue(`    '${scenarioName}'`))
      // Find all scenarios matching the scenario name of the screenshot.
      // This is important when using the scenario outline mechanism
      const myScenarios = cucumberReportMap[feature][0].elements.filter(
        e => scenarioName.includes(e.name)
      )
      if (!myScenarios) { return }
      let foundFailedStep = false
      myScenarios.forEach(myScenario => {
        if (foundFailedStep) {
          return
        }
        let myStep
        if (screenshot.includes('(failed)')) {
          myStep = myScenario.steps.find(
            step => step.result.status === 'failed'
          )
        } else {
          myStep = myScenario.steps.find(
            step => step.name.includes('screenshot')
          )
        }
        if (!myStep) {
          return
        }
        const data = fs.readFileSync(
          path.resolve(screenshot)
        )
        if (data) {
          const base64Image = Buffer.from(data, 'binary').toString('base64').replace(' ', '_')
          if (!myStep.embeddings) {
            myStep.embeddings = []
            myStep.embeddings.push({ data: base64Image, mime_type: 'image/png' })
            foundFailedStep = true
          }
        }
      })
      //Write JSON with screenshot back to report file.
      fs.writeFileSync(
        path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
        JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
      )
    })
  })
}


function generateReport() {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn(chalk.yellow(`WARNING: Folder './${cucumberJsonDir}' not found. REPORT CANNOT BE CREATED!`))
  } else {
    report.generate({
      jsonDir: cucumberJsonDir,
      reportPath: htmlReportDir,
      displayDuration: true,
      displayReportTime: true,
      pageTitle: 'AUTOMATISATION DES TEST DIGISAP',
      reportName: `AUTOMATISATION DES TESTS PROJET BACKOFFICE- ${new Date().toLocaleString()}`,
      storeScreenshots: true,
metadata: {
"Test Environment": "PREPROD",
browser: {
name: "chrome",
version: "91",
},
device: "Local test machine",
platform: {
name: "WINDOWS",
version: "10",
},
},
    })
  }
}