import pdf from './pdfmake-custom'
import printDoc from './browser'

export default {
  install (Vue) {
    Vue.pdfMake = pdf.pdfMake
    Vue.printDoc = printDoc

    Vue.prototype.pdfMake = pdf.pdfMake
    Vue.prototype.printDoc = printDoc
  }
}
