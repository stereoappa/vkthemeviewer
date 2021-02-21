import fetchJsonp from 'fetch-jsonp'

export class VkClient {
    constructor() {
        this.apiKey = '6e3a4eb96e3a4eb96e3a4eb90e6e4cc73d66e3a6e3a4eb90e086282dcfd0328ef122627'
        this.baseUrl = 'https://api.vk.com/method'
        this.apiVer = '5.52'
    }

    async getComments(group_id, topic_id) {
        const method = 'board.getComments'

        const resJson = await this.execute(method, {group_id, topic_id})
        return resJson.response
    }

    async execute(methodName, args){
        let argsStr = ''
        args = Object.keys(args).forEach(k => {
            argsStr += `${k}=${args[k]}&`
        })

        const url = `${this.baseUrl}/${methodName}?${argsStr}access_token=${this.apiKey}&v=${this.apiVer}`

        let response = await fetchJsonp(url, {
            method: 'GET',
            mode: 'no-cors',
        })

        return await response.json()
    }
}