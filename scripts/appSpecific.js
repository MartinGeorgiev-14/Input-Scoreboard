import * as basic from "./basicFunctions.js"

export function errorMsgPopup(parent, element, txt){
    const msg = basic.createElement("p")

    basic.setClassAttribute(msg, "error-msg")

    basic.setInnerHTML(msg, `${element} ${txt}`)

    basic.append(parent, msg)
}
