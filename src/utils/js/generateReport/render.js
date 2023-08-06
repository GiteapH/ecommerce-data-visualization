const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { saveAs } = require('file-saver')
const ImageModule = require('docxtemplater-image-module-free')
const Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/;
var width = 200,height = 100
const imageOpts = {
    getImage(tag) {
        return base64Parser(tag);
    },
    getSize() {
        return [width,height];
    }
}



export function getBase64(charts, option = {
    maxWidth: 200,
    maxHeight: 100
}) {
    return new Promise((resolve, reject) => {
        let png = charts.getDataURL({
            pixelRatio: 25
        })
        resizeBase64(png,option.maxWidth, option.maxHeight).then(base64 => {
            resolve(base64)
        }).catch(err => {
            
        })
    })

}


export const render = (templateFile, options = {
    sex: "男",
    address: "Doe",
    age: "0652455478",
    consumption: "New Website",
    recency: 5,
    frequency: 5,
    activeTimeCount: 2,
    activePriceCount: 1,
    view: 1,
    buy: 1,
    cart: 1,
    comment: 1,
    complain: 1,
    consult: 1,
    rfm: '重要价值客户',
    clv: '高价值用户',
    status: '正常交易中',
    userId: 1,
    RingImg: null,
    actionDescribtioon:'',
    ActionImg:null,
    userActionTable:[{
        actionName:'',
        actionDate:''
    }],
    forecast:[]
},loading) => {
    loading.setText('分析模板文件...')
    getFileBinaryString(templateFile).then(templateData => {
        const zip = new PizZip(templateData);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            modules: [new ImageModule(imageOpts)]
        })
        doc.render(options)
        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        })
        loading.setText('分析完成,生成文件中...')
        saveAs(out, '用户报告.docx');
    }).catch(err => {
        
    })
}



export function resizeBase64(base64, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        var image = new Image();
        //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
        image.src = base64;
        // 用于设定图片的宽度和高度
        var tempWidth;
        var tempHeight;
        image.onload = () => {
            if (image.width > 0 && image.height > 0) {
                //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
                if (image.width / image.height >= maxWidth / maxHeight) {
                    if (image.width > maxWidth) {
                        tempWidth = maxWidth;
                        // 按原图片的比例进行缩放
                        tempHeight = (image.height * maxWidth) / image.width;
                    } else {
                        // 按原图片的大小进行缩放
                        tempWidth = image.width;
                        tempHeight = image.height;
                    }
                } else {// 原图片的高度必然 > 宽度
                    if (image.height > maxHeight) {
                        tempHeight = maxHeight;
                        // 按原图片的比例进行缩放
                        tempWidth = (image.width * maxHeight) / image.height;
                    } else {
                        // 按原图片的大小进行缩放
                        tempWidth = image.width;
                        tempHeight = image.height;
                    }
                }
                height = tempHeight
                width = tempWidth
                resolve(imagetoCanvas(image, tempHeight, tempWidth).toDataURL())
            } else {
                reject(null)
            }
        }
    })
}



function imagetoCanvas(image, height, width) {
    var cvs = document.createElement("canvas");
    var ctx = cvs.getContext('2d');
    cvs.width = width
    cvs.height = height;
    ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
    return cvs;
}


function base64Parser(dataURL) {
    if (
        typeof dataURL !== "string" ||
        !Regex.test(dataURL)
    ) {
        return false;
    }
    const stringBase64 = dataURL.replace(Regex, "");

    const binaryString = window.atob(stringBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        const ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes.buffer;
}


function getFileBinaryString(templateFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target.result);
        }
        reader.onerror = reject;
        reader.readAsBinaryString(templateFile);
    });
}

