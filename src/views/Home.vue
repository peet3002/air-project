<template>
  <div class="home">
    <v-layout class="header">
      <v-flex xs2 pl-5>
       <div class="logo">T & T</div>
       <div class="pg-name">โปรแกรมพิมพ์ใบเสร็จรับเงิน</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
        <v-btn color="success" @click="print">พิมพ์</v-btn>
    </v-layout>
  </div>
</template>

<script>
import Bill from '@/pdf/Bill'
import getFunctionPDF from '@/plugins/pdfmake-custom'

export default {
  name: 'Home',
  methods: {
    async print () {
      const option = { margin: [40, 20, 20, 10], font: 'thsarabunNew' }
      const result = this.result
      const dataSend = await Bill.print(result)
      if (dataSend != null) {
        const pdf = await getFunctionPDF.pdfMake.createPdfToDataUrl(dataSend, option)
        this.printDoc(pdf)
      }
    }
  }
}
</script>

<style lang="scss">
  .home {
    margin-left: '10%'
  }
  .header {
    background-color: #5e3792;
  }
  .logo {
    color: white;
    font-size: 50px;
    font-weight: bold;
  }
</style>
