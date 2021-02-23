import fetchJsonp from 'fetch-jsonp'

export class VkClient {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error('VK API KEY is empty. It should be given through apiKey property')
        }

        this.apiKey = apiKey
        this.baseUrl = 'https://api.vk.com/method'
        this.apiVer = '5.52'
    }

    async getComments(group_id, topic_id, offset, withProfiles = false) {
        const method = 'board.getComments'

        const resJson = await this.execute(method, {group_id, topic_id, offset, extended: +withProfiles })
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