const Browser = {
  // Firefox 1.0+
  isFirefox: () => {
    return typeof InstallTrigger !== 'undefined'
  },
  // Internet Explorer 6-11
  isIE: () => {
    return navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode
  },
  // Edge 20+
  isEdge: () => {
    return !Browser.isIE() && !!window.StyleMedia
  },
  // Chrome 1+
  isChrome: () => {
    return !!window.chrome && !!window.chrome.webstore
  },
  // At least Safari 3+: "[object HTMLElementConstructor]"
  isSafari: () => {
    return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
            navigator.userAgent.toLowerCase().indexOf('safari') !== -1
  }
}

const dataURItoDataURL = (dataURI, blobOption) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab], blobOption)
  return (window.URL || window.webkitURL).createObjectURL(bb)
}

export default (pdfURI) => {
  let dataURL = dataURItoDataURL(pdfURI, { type: 'application/pdf' })

  // window.open(dataURL, '_blank')

  if (!Browser.isChrome()) {
    if (document.getElementById('pdfPrint')) document.getElementById('pdfPrint').remove()

    let printFrame = document.createElement('iframe')
    printFrame.setAttribute('style', 'padding: 0px; margin: 0px; width:0; height:0; border:0;')
    printFrame.setAttribute('id', 'pdfPrint')
    printFrame.setAttribute('src', dataURL)
    window.document.getElementsByTagName('body')[0].appendChild(printFrame)
    // let iframeElement = document.getElementById("pdfPrint")
    printFrame.onload = () => {
      printFrame.focus()
      printFrame.contentWindow.print()
    }
  } else {
    if (document.getElementById('pdfPrint')) document.getElementById('pdfPrint').remove()

    let printFrame = document.createElement('iframe')
    printFrame.setAttribute('style', 'padding: 0px; margin: 0px; width:0; height:0; border:0;')
    printFrame.setAttribute('id', 'pdfPrint')
    printFrame.setAttribute('src', dataURL)
    window.document.getElementsByTagName('body')[0].appendChild(printFrame)
    // let iframeElement = document.getElementById("pdfPrint")
    printFrame.onload = () => {
      printFrame.focus()
      printFrame.contentWindow.print()
    }
  }
}
