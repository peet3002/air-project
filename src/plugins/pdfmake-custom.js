import pdfMake from 'pdfmake/build/pdfmake.min.js'
import pdfFonts from '../fonts/font/cordiaUPC'

pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.fonts = {
  cordia_upc: {
    normal: 'CordiaUPC.ttf',
    bold: 'CordiaUPC-Bold.ttf',
    italics: 'CordiaUPC-Italic.ttf',
    bolditalics: 'CordiaUPC-BoldItalic.ttf'
  }
}
// Original
const createPdf = (layout = {}, option = {}) => pdfMake.createPdf(getDocument(layout, option))

const createPdfToDataUrl = async (layout = {}, option = {}) => {
  return new Promise((resolve, reject) => {
    const styles = []

    // const copyObj = (obj) => {
    //   const copy = {}
    //   if (Array.isArray(obj)) return obj.map(item => typeof item === 'object' ? copyObj(item) : item)
    //   for (const key in obj) copy[key] = typeof obj[key] === 'object' ? copyObj(obj[key]) : obj[key]
    //   return copy
    // }

    const deepCopy = (obj, output = (Array.isArray(obj) ? [...obj] : { ...obj })) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          output[key] = Array.isArray(obj[key]) ? [...obj[key]] : { ...obj[key] }
          deepCopy(obj[key], output[key])
        }
      })
      return output
    }

    const replaceWord = (word) => {
      return word.replace(/่ำ/g, 'ํ่า').replace(/้ำ/g, 'ํ้า').replace(/๊ำ/g, 'ํ๊า').replace(/๋ำ/g, 'ํ๋า')
    }

    const mapObjectDeep = (obj, callback, index) => {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          mapObjectDeep(obj[key], callback, index)
        } else {
          obj[key] = callback(key, obj[key], index) || obj[key]
        }
      })
    }

    const cb = (key, val, index) => {
      if (typeof val === 'string') return layout instanceof Array && key === 'style' ? `${val}_${index}` : replaceWord(val)

      if (typeof val === 'function') {
        return (...param) => {
          const tmpResult = val(...param)
          if (typeof tmpResult === 'string') return replaceWord(tmpResult)
          mapObjectDeep(tmpResult, cb, index)
          return tmpResult
        }
      }
    }

    const doc = getDocument(layout, option)
    let copyDoc

    if (layout instanceof Array) {
      layout.forEach((item, index) => {
        const createStyle = {}
        const syt = []

        if (item.styles) {
          // Generating about mapObjectDeep and cb
          Object.keys(item.styles).forEach((key) => {
            const newKey = `${key}_${index}`
            createStyle[newKey] = item.styles[key]
            syt.push(newKey)
          })

          if (syt.length) styles[index] = styles.concat(syt)
        }

        const copyItem = deepCopy(item)
        mapObjectDeep(copyItem, cb, index)

        if (index !== 0) doc.content.push({ text: '', pageBreak: 'after' })
        if (copyItem.header) doc.header = copyItem.header
        if (copyItem.footer) doc.footer = copyItem.footer
        if (copyItem.background) doc.background = copyItem.background
        if (copyItem.pageBreakBefore) doc.pageBreakBefore = copyItem.pageBreakBefore
        doc.content = doc.content.concat(copyItem.content)
        Object.assign(doc.styles, createStyle)
        Object.assign(doc.images, copyItem.images)
      })
      copyDoc = deepCopy(doc)
    } else {
      copyDoc = deepCopy(doc)
      mapObjectDeep(copyDoc, cb)
    }

    pdfMake.createPdf(copyDoc).getDataUrl(async (dataUrl) => {
      resolve(dataUrl)
    })
  })
}

const addFont = (font, vfs) => {
  Object.assign(pdfMake.fonts, font)
  Object.assign(pdfMake.vfs, vfs)
}

const getDocument = (layout, option) => {
  option = {
    // title, author, subject, keywords
    info: {
      author: 'Core Solutions Co.,Ltd.',
      keywords: 'project 3'
    },
    pageSize: option.size || 'A4',
    pageOrientation: option.orientation || 'portrait',
    pageMargins: option.margin || [20, 20, 20, 20],
    defaultStyle: { font: option.font || 'cordia_upc' },
    ...option
  }

  return {
    ...option,
    header: {},
    footer: {},
    content: [],
    background: {},
    pageBreakBefore: {},
    images: {},
    styles: {},
    ...layout
  }
}

export default {
  pdfMake: {
    ...pdfMake,
    vfs: pdfFonts.pdfMake.vfs,
    fonts: {
      cordia_upc: {
        normal: 'CordiaUPC.ttf',
        bold: 'CordiaUPC-Bold.ttf',
        italics: 'CordiaUPC-Italic.ttf',
        bolditalics: 'CordiaUPC-BoldItalic.ttf'
      }
    },
    createPdf,
    createPdfToDataUrl,
    addFont
  }
}
