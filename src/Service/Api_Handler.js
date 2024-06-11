const BASE_URL = import.meta.env.VITE_BASE_URL
console.log(BASE_URL)

export const REGISTER = async(info) => {
    const response = await fetch(`${BASE_URL}/api/v1/user/auth/createUser`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(info)
    })
    return await response.json()
}

export const LOGIN = async(info) => {
    const response = await fetch(`${BASE_URL}/api/v1/user/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(info)
    })
    return await response.json()
}

// export const GETFILETOTEXT = async(file) => {
//     const data = new FormData()
//     data.append("url_pdf", file)
//     const response = await fetch('https://pdf-to-text-extract.p.rapidapi.com/pdf', {
//         method : "POST",
//         headers : {
//             "Content-Type" : "application/json",
//             "X-RapidAPI-Key" : "d32900bd6dmsh24442c9cf33be3ap12f4c6jsn08ffca679bb0",
//             "X-RapidAPI-Host" : "pdf-to-text-extract.p.rapidapi.com"
//         },
//         body : data
//     })
//     return await response.json()
// }

export const GETFILETOTEXT = async(file, authToken) => {
    const data = new FormData()
    data.append('pdf', file)
    const response = await fetch(`${BASE_URL}/api/pdf-to-text/uploaFile`, {
        method : "POST",
        headers : {
            "authToken" : authToken
        },
        body : data
    })
    return await response.json()
}

export const INITIALIZE_CHAT = async(text, authToken) => {
    const data = text+" Read and summerize the content."
    const response = await fetch(`${BASE_URL}/api/v1/model/message/initChat`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "authToken" : authToken
        },
        body : JSON.stringify({content: data})
    })
    return response.json()
}

export const SEND_MESSAGE = async(info, authToken) => {
    const response = await fetch(`${BASE_URL}/api/v1/model/message/sendMessage`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "authToken" : authToken
        },
        body : JSON.stringify(info)
    })
    return await response.json()
}

export const SEND_MESSAGE_WITH_CONTENT = async(content, prompt, authToken) => {
    const response = await fetch(`${BASE_URL}/api/v1/model/message/sendMessageWithContent`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "authToken" : authToken
        },
        body : JSON.stringify({content, prompt})
    })
    return await response.json()
}