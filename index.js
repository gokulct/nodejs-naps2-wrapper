const NAPS2 = require('./naps/NAPS2');
const { PDFUtility } = require('./naps/PDFUtility');
const { MODES, SOURCES } = require('./naps/ScanBuilder');
const path = require('path')

async function example() {
    const naps2 = new NAPS2();
    try {
        // const devices = await naps2.listDevices('twain');
        // await naps2.scan('output.pdf');
        // const result = await naps2.createScanBuilder()
        //     .withDevice(devices[0])
        //     .withDpi(300)
        //     .withMode(MODES.COLOR)
        //     .withSource(SOURCES.GLASS)
        //     .withPDFOptions({
        //         title: 'My Scan',
        //         author: 'User',
        //         keywords: 'scan,document'
        //     })
        //     .withDeskewEnabled(true)
        //     .forceFileWrite(true)
        //     .withOCRenabled(true,'en')
        //     .execute('output 1.pdf');
            
        // console.log('Scan completed:', result);
        const pdfutils = new PDFUtility(naps2);
        pdfutils.combine(['C:\\Users\\Dell\\Downloads\\Inventory - Basic - Schema.pdf', 'C:\\Users\\Dell\\Downloads\\50 page sample PDF.indd.pdf'], 'C:\\Users\\Dell\\Downloads\\out.pdf').then((resp) => {
            console.log(resp);
        })
    } catch (error) {
        console.error('Scan failed:', error);
    }
}
example();