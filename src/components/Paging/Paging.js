import {VkClient} from "@/core/VkClient";
import {createPage} from "@/components/Paging/paging.template";

export class Paging {
    constructor($root, options) {
        this.groupId = options.groupId
        this.topicId = options.topicId
        this.countOnPage = options.countOnPage ?? 20
        this.sort = options.sort ?? 'asc'

        this.vk = new VkClient()
    }

    async getPageHtml(pageNumber) {
        let offset = pageNumber * this.countOnPage
        if (offset < 0)
            offset = 0

        let response = await this.vk.getComments(this.groupId, this.topicId, offset, true)

        return this.toHtml(response)
    }

    toHtml(response){
        return createPage(response)
    }
}