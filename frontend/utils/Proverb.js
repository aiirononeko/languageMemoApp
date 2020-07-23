import axios from 'axios'
import { randInteger } from './number'

const DEFAULT_CONTENT = "Done is better than perfect."
const DEFAULT_EXPLANATION = "完璧を目指すよりまず終わらせろ"
const DEFAULT_SPEAKER = "マーク・ザッカーバーグ"

const PROVERB_CSV_LINK = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAqD8bUT9qVMQVkyP_Aq-elMCovI8RwLJgy5C6KVyk67FCSOWX90t2RshNVpEP3X5cFln8JRDTyaSA/pub?gid=0&single=true&output=csv"

/**
 * @returns { String }
 */
const getDataFromCSV = async () => {
  const { data } = await axios.get(PROVERB_CSV_LINK)

  return data
}

/**
 *
 * @param {String} csvData
 * @returns {Array<Array>}
 */
const CSVtoObject = (csvData) => {
  // 生のrow
  const rawRows = csvData.split(/\r\n|\n|\r/).slice(1)

  return rawRows.map((row) => CSVtoArray(row))
}

/**
 * Return array of string values, or NULL if CSV string not well formed.
 *
 * https://www.it-swarm-ja.tech/ja/javascript/%e3%83%87%e3%83%bc%e3%82%bf%e3%81%ab%e3%82%ab%e3%83%b3%e3%83%9e%e3%81%8c%e5%90%ab%e3%81%be%e3%82%8c%e3%81%a6%e3%81%84%e3%82%8bjavascript%e3%81%a7csv%e6%96%87%e5%ad%97%e5%88%97%e3%82%92%e8%a7%a3%e6%9e%90%e3%81%99%e3%82%8b%e3%81%ab%e3%81%af%e3%81%a9%e3%81%86%e3%81%99%e3%82%8c%e3%81%b0%e3%82%88%e3%81%84%e3%81%a7%e3%81%99%e3%81%8b%ef%bc%9f/941161507/
 */
const CSVtoArray = (text) => {
  const re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/
  const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g
  // Return NULL if input string is not well formed CSV string.
  if (!re_valid.test(text)) return null
  const a = []                     // Initialize array to receive values.
  text.replace(re_value, // "Walk" the string using replace with callback.
      function(m0, m1, m2, m3) {
          // Remove backslash from \' in single quoted values.
          if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"))
          // Remove backslash from \" in double quoted values.
          else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'))
          else if (m3 !== undefined) a.push(m3)
          return '' // Return empty string.
      })
  // Handle special case of empty last value.
  if (/,\s*$/.test(text)) a.push('')
  return a
}

class Proverb {
  constructor() {
    this.setDefault()
  }

  setDefault() {
    this.content = DEFAULT_CONTENT
    this.explanation = DEFAULT_EXPLANATION
    this.speaker = DEFAULT_SPEAKER
  }

  async setRandom() {
    try {
      const csvData = await getDataFromCSV()
      const proverbObj = CSVtoObject(csvData)
      const randObj = proverbObj[randInteger(proverbObj.length - 1)]

      this.content = randObj[0]
      this.explanation = randObj[1]
      this.speaker = randObj[2]
    } catch(e) {
      this.setDefault()
    }
  }
}

export default Proverb
