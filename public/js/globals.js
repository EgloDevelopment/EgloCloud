const e = React.createElement

let globalKey = 0

function getKey() {
    globalKey++
    return `globalKey_${ globalKey }`
}
