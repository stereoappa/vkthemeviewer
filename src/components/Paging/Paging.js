import {VkClient} from "@/core/VkClient"
import {createPage} from "@/components/Paging/paging.template"

export class Paging {
    constructor($root, options) {
        this.groupId = options.groupId
        this.topicId = options.topicId
        this.sort = options.sort ?? 'asc'

        this.pageNumber = 0
        this.postsCount = 0
        this.perPageCount = options.perPageCount ?? 20

        this.vk = new VkClient(options.apiKey)

    }

    async getNextPage() {
        return await this.getPageHtml(this.pageNumber + 1)
    }

    async getPreviousPage() {
        return await this.getPageHtml(this.pageNumber - 1)
    }

    async getPageHtml(pageNumber) {
        if (!this.isPageExists(pageNumber)) {
            return
        }

        this.pageNumber = pageNumber

        let offset = pageNumber * this.perPageCount
        if (offset < 0)
            offset = 0

        let response = await this.vk.getComments(this.groupId, this.topicId, offset, true)
        this.postsCount = response.count

        return createPage(response)
    }

    isPageExists(pageNumber) {
        if (pageNumber === 0 && this.postsCount === 0) {
            return true
        }

        return pageNumber < Math.ceil(this.postsCount / this.perPageCount)
    }
}