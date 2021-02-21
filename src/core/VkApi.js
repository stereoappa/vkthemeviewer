import fetchJsonp from 'fetch-jsonp'

export class VkApi {
    constructor(apiKey) {
        this.apiKey = apiKey
        this.baseUrl = 'https://api.vk.com/method'
        this.apiVer = '5.52'
    }

    async getComments(group_id, topic_id) {
        const method = 'board.getComments'

        await this.execute(method, {group_id, topic_id})
            .then(result => {
                return result
            })
    }

    async execute(methodName, args){
        let argsStr = ''
        args = Object.keys(args).forEach(k => {
            argsStr += `${k}=${args[k]}&`
        })

        const url = `${this.baseUrl}/${methodName}?${argsStr}access_token=${this.apiKey}&v=${this.apiVer}`

        return await fetchJsonp(url, {
            method: 'GET',
            mode: 'no-cors',
        }).then(response => response.json())
    }
}