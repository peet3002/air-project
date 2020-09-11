import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from '../fonts/font/thsarabunNew'

async function print (dataGet) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs
  pdfMake.fonts = {
    thsarabunNew: {
      normal: 'THSarabunNew.ttf',
      bold: 'THSarabunNew-Bold.ttf',
      italics: 'THSarabunNew-Italic.ttf',
      bolditalics: 'THSarabunNew-BoldItalic.ttf'
    }
  }

  const mainColor = '#393264'
  const dataTable = []
  for (let i = 0; i < 12; i++) {
    dataTable.push({
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: [60, 180, 60, 80, 40, 60.8],
        body: [
          [{
            text: '',
            style: 'tableData',
            alignment: 'center',
            border: [false, false, true, true]
          },
          {
            text: '',
            style: 'tableData',
            alignment: 'center',
            border: [false, false, true, true]
          },
          {
            text: '',
            style: 'tableData',
            alignment: 'center',
            border: [false, false, true, true]
          },
          {
            text: '',
            style: 'tableData',
            alignment: 'center',
            border: [false, false, true, true]
          },
          {
            text: '',
            style: 'tableData',
            alignment: 'center',
            border: [false, false, true, true]
          },
          {
            text: ' ',
            style: 'tableData',
            alignment: 'center',
            border: [false, false, true, true]
          }
          ]
        ]
      },
      margin: [0.3, -0.3, 0, 0],
      layout: {
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
        }
      }
    })
  }

  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    background: [],
    content: [
      {
        text: 'เล่มที่',
        style: 'textNormal',
        alignment: 'left'
      },
      {
        text: 'เลขที่',
        style: 'textNormal',
        alignment: 'center',
        margin: [300, -19.5, 0, 0]
      },
      {
        text: 'T&T',
        style: 'logo',
        alignment: 'left',
        margin: [0, -15, 0, 0]
      },
      {
        text: 'บริษัท  บุษยารัตน์  แอร์  เซอร์วิส  จำกัด',
        style: 'textHeader',
        alignment: 'left',
        margin: [145, -98, 0, 0]
      },
      {
        text: 'สำนักงานใหญ่',
        style: 'textNormal',
        alignment: 'left',
        margin: [145, 0, 0, 0],
        bold: true
      },
      {
        text: '71/311 หมู่ที่ 5 ต.ลาดสวาย อ.ลำลูกกา จ.ปทุมธานี 12150\nTel. 091-593-1625',
        style: 'textNormal',
        alignment: 'left',
        margin: [220, -20.6, 0, 0]
      },
      {
        text: 'เลขประจำตัวผู้เสียภาษีอากร 0135562022931',
        style: 'textNormal',
        alignment: 'left',
        bold: true,
        margin: [312, -20.9, 0, 0]
      },
      {
        text: 'ใบกำกับภาษี/ใบเสร็จรับเงิน',
        style: 'textHeader',
        alignment: 'center',
        margin: [0, 5, 0, 0],
        bold: true
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 340,
            h: 60,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'right',
        margin: [0, 10, 0, 0]
      },
      {
        text: 'วันที่.................. เดือน.............................................. พ.ศ.............................',
        style: 'textNormal',
        alignment: 'center',
        margin: [200, -50, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 536,
            h: 330,
            r: 5,
            lineColor: mainColor,
            color: '#b9bedc'
          }
        ],
        alignment: 'center',
        margin: [0, 35, 0, 0]
      },
      {
        style: 'tableExample',
        table: {
          headerRows: 1,
          widths: [60, 180, 60, 80, 40, 61],
          body: [
            [{
              text: 'ลำดับ\nItem',
              style: 'tableHeader',
              alignment: 'center',
              border: [false, false, true, true]
            },
            {
              text: 'รายการ\nDescription',
              style: 'tableHeader',
              alignment: 'center',
              border: [false, false, true, true]
            },
            {
              text: 'จำนวน\nQuantity',
              style: 'tableHeader',
              alignment: 'center',
              border: [false, false, true, true]
            },
            {
              text: 'ราคา\nUnit Price',
              style: 'tableHeader',
              alignment: 'center',
              border: [false, false, true, true]
            },
            {
              text: 'ส่วนลด\nDiscount',
              style: 'tableHeader',
              alignment: 'center',
              border: [false, false, true, true]
            },
            {
              text: 'จำนวนเงิน\nAmount',
              style: 'tableHeader',
              alignment: 'center',
              border: [false, false, false, true]
            }
            ]
          ]
        },
        margin: [0, -330, 0, 0],
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
          }
        }
      },
      dataTable,
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 340,
            h: 25,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'left',
        margin: [0, 12, 0, 0]
      },
      {
        text: 'การแก้ไขใดๆ ในใบกำกับภาษีให้ทำได้ภายใน 7 วันหากเกินกำหนด บริษัทฯ จะไม่รับผิดชอบใดๆ ทั้งสิ้น',
        color: mainColor,
        fontSize: 10,
        margin: [7, -17, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 190,
            h: 127,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'right',
        margin: [0, -21, 0, 0]
      },
      {
        text: 'รวม / Total',
        alignment: 'left',
        bold: 'true',
        color: mainColor,
        margin: [347, -122, 0, 0]
      },
      {
        style: 'tableExample',
        margin: [466, -21, 0, 0],
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
          },
          paddingTop: function (i, node) { return 4 },
          paddingBottom: function (i, node) { return 4 }
        },
        table: {
          headerRows: 1,
          widths: [60],
          body: [
            [{
              text: '12121',
              style: 'tableHeader',
              alignment: 'center',
              margin: [0, 0, 0, 0],
              border: [true, false, false, true]
            }]
          ]
        }
      },
      {
        style: 'tableExample',
        margin: [466, 0, 0, 0],
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
          },
          paddingTop: function (i, node) { return 4 },
          paddingBottom: function (i, node) { return 4 }
        },
        table: {
          headerRows: 1,
          widths: [60],
          body: [
            [{
              text: '12121',
              style: 'tableHeader',
              alignment: 'center',
              border: [true, false, false, true]
            }]
          ]
        }
      },
      {
        style: 'tableExample',
        margin: [466, 0, 0, 0],
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
          },
          paddingTop: function (i, node) { return 4 },
          paddingBottom: function (i, node) { return 4 }
        },
        table: {
          headerRows: 1,
          widths: [60],
          body: [
            [{
              text: '12121',
              style: 'tableHeader',
              alignment: 'center',
              border: [true, false, false, true]
            }]
          ]
        }
      },
      {
        style: 'tableExample',
        margin: [466, 0, 0, 0],
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
          },
          paddingTop: function (i, node) { return 4 },
          paddingBottom: function (i, node) { return 4 }
        },
        table: {
          headerRows: 1,
          widths: [60],
          body: [
            [{
              text: '12121',
              style: 'tableHeader',
              alignment: 'center',
              border: [true, false, false, true]
            }]
          ]
        }
      },
      {
        style: 'tableExample',
        margin: [466, 0, 0, 0],
        layout: {
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? mainColor : 'mainColor'
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? mainColor : 'mainColor'
          },
          paddingTop: function (i, node) { return 4 },
          paddingBottom: function (i, node) { return 4 }
        },
        table: {
          headerRows: 1,
          widths: [60],
          body: [
            [{
              text: ' 12121',
              style: 'tableHeader',
              alignment: 'center',
              margin: [0, 0, 0, 0],
              border: [true, false, false, false]
            }]
          ]
        }
      },
      {
        text: 'ส่วนลด / Discount',
        alignment: 'left',
        bold: 'true',
        color: mainColor,
        margin: [347, -98, 0, 0]
      },
      {
        text: 'มูลค่าสินค้า / Value Amount',
        alignment: 'left',
        bold: 'true',
        color: mainColor,
        margin: [347, 11, 0, 0]
      },
      {
        text: 'ภาษีมูลค่าเพิ่ม / Vat 7%',
        alignment: 'left',
        bold: 'true',
        color: mainColor,
        margin: [347, 9, 0, 0]
      },
      {
        text: 'สุทธิ / Net Amount',
        alignment: 'left',
        bold: 'true',
        color: mainColor,
        margin: [347, 10, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 340,
            h: 60,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'left',
        margin: [0, -91, 0, 0]
      },
      {
        text: 'ชำระโดย',
        color: mainColor,
        margin: [5, -59, 0, 0]
      },
      {
        text: 'PAID BY',
        color: mainColor,
        margin: [5, -5, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 15,
            h: 15,
            r: 2,
            lineColor: 'white',
            color: '#b9bedc'
          }
        ],
        alignment: 'left',
        margin: [50, -21.5, 0, 0]
      },
      {
        text: 'เงินสด',
        color: mainColor,
        margin: [66.5, -20, 0, 0]
      },
      {
        text: 'CASH',
        color: mainColor,
        margin: [66.5, -5, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 15,
            h: 15,
            r: 2,
            lineColor: 'white',
            color: '#b9bedc'
          }
        ],
        alignment: 'left',
        margin: [115, -21.5, 0, 0]
      },
      {
        text: 'เช็ค',
        color: mainColor,
        margin: [132, -20, 0, 0]
      },
      {
        text: 'CHQ',
        color: mainColor,
        margin: [132, -5, 0, 0]
      },
      {
        text: 'ธนาคาร  /  BANK ................................................................ สาขา  /  BRANCH ........................................',
        color: mainColor,
        margin: [5, 0, 0, 0]
      },
      {
        text: 'เลขที่  /  CHEQUE  NO : .................................................... วันที่  /  DATE ...............................................',
        color: mainColor,
        margin: [5, 0, 0, 0]
      },
      {
        text: 'ตัวอักษร',
        color: mainColor,
        margin: [5, 8, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 330,
            h: 15,
            lineColor: 'white',
            color: '#b9bedc'
          }
        ],
        alignment: 'left',
        margin: [5, -5, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 340,
            h: 30,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'left',
        margin: [0, -25.5, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 230,
            h: 50,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'left',
        margin: [0, 4, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 146,
            h: 50,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'left',
        margin: [235, -50, 0, 0]
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 0,
            w: 150,
            h: 50,
            r: 5,
            lineColor: mainColor
          }
        ],
        alignment: 'left',
        margin: [386, -50, 0, 0]
      },
      {
        text: 'กรณีชำระเงินด้วยเช็ค\nใบเสร็จรับเงินนี้จะสมบูรณ์ก็ต่อเมื่อได้รับเงินตามเช็คเรียบร้อยแล้ว\nTHIS RECEIPT WILL BE VALID ONLY\nWHEN THE CHEQUE HAS BEEN HONOURED.',
        color: mainColor,
        alignment: 'center',
        fontSize: 10,
        lineHeight: 0.8,
        margin: [-300, -45, 0, 0]
      },
      {
        text: '.......................................................................',
        color: mainColor,
        alignment: 'center',
        fontSize: 10,
        lineHeight: 0.8,
        margin: [80, -35, 0, 0]
      },
      {
        text: 'ผู้รับเงิน RECEIVED BY',
        color: mainColor,
        alignment: 'center',
        fontSize: 10,
        margin: [80, 0, 0, 0]
      },
      {
        text: '...................../............................/...................',
        color: mainColor,
        alignment: 'center',
        fontSize: 10,
        margin: [80, 0, 0, 0]
      },
      {
        text: '................................................................................',
        color: mainColor,
        alignment: 'center',
        fontSize: 10,
        margin: [386, -27, 0, 0]
      },
      {
        text: 'ผู้มีอำนาจลงนาม Authorized by : ',
        color: mainColor,
        alignment: 'center',
        fontSize: 10,
        margin: [386, -2, 0, 0]
      }
    ],
    styles: {
      textNormal: {
        fontSize: 16,
        color: mainColor
      },
      textHeader: {
        fontSize: 24,
        color: mainColor,
        bold: true
      },
      tableHeader: {
        fontSize: 12,
        color: mainColor,
        bold: true
      },
      tableData: {
        fontSize: 14,
        fillColor: 'white'
      },
      logo: {
        fontSize: 100,
        bold: true,
        color: mainColor
      }
    }
  }
  return docDefinition
}

export default {
  print,
  data () {
    return {
    }
  }
}
