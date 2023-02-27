import { constants } from "constant"
import fileDownload from 'js-file-download'



export const fileSize = (bytes, si=false, dp=1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) 
        return bytes + ' B'

    const units = si? 
        ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
        :
        ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10**dp;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
}

export const dateTimeFormat = (date) => {
    if(!date) return ""
    return `${new Date(date).toISOString().split('T')[0]} ${new Date(date).toTimeString().split(' ')[0]}`
}

export const filesResolve = (consultation, side)=>{
    const files = side===constants.ADMIN_SIDE? consultation?.files?.admin : consultation?.files?.client
    return files
}

export const downloadBlob = (blob, filename)=>{
    fileDownload(blob, filename)
    // const blob = new Blob([response.data], { type: 'application/pdf' })
    // const link = document.createElement('a')
    // link.href = (window.URL || window.webkitURL).createObjectURL(blob)
    // link.download = `${filename}-${+new Date()}.pdf`
    // link.click()
}
