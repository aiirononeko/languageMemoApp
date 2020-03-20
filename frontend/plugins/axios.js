import axios from 'axios'
export default axios.create({
 baseURL: process.env.baseUrl
})

// const Cookie = process.client ? require('js-cookie') : undefined

// export default function({$axios}) {
//     $axios.interceptors.request.use( config => {
//         console.log(config)
//         config.headers.common["access-token"] = Cookie.get("access-token")
//         config.headers.common["client"] = Cookie.get("client")
//         config.headers.common["uid"] = Cookie.get("uid")
//         return config
//     })
// }