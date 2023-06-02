
export const shortAddress = (address, first = 6, last = -4) => {
    return `${address.slice(0, first)}...${address.slice(last)}`
}

export const parseModelName = (model) => {
    let name
    switch (model) {
        case "chat":
            name = "ChatGPT"
            break
        case "image":
            name = "Stable Difussion"
            break
        default:
            name = "Unknown"
    }
    return name
}