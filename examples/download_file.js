module.exports = function downloadBlob(fileName, data) {
    var a = document.createElement("a")
    document.body.appendChild(a)
    a.style = "display: none"
    var blob = new Blob([data], {type: "application/octet-binary"})
    var url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
}
