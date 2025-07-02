class PDFUtility {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.arguments = [];
    }
    combine(pdfPaths,output) {
        this.arguments.push("-i")
        var pdfs=null;
        for (const a of pdfPaths){
            if (!pdfs) {
                pdfs = a;
            } else {
                pdfs +=';'+ a;
            }
        }
        this.arguments.push(pdfs);
        this.arguments.push("-n");
        this.arguments.push("0");
        this.arguments.push("-o");
        this.arguments.push(output);
        console.log(this.arguments);
        return this.wrapper.executeCommand(this.arguments);
    }
}
module.exports = {
    PDFUtility
};