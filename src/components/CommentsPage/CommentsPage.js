import {VkClient} from "@/core/VkClient";
import {createPage} from "@/components/CommentsPage/commentsPage.template";

export class CommentsPage {
    constructor($root, options) {
        this.$root = document.querySelector($root)
        this.groupId = options.groupId
        this.topicId = options.topicId
        this.pageCount = options.pageCount ?? 20
        this.sort = options.sort ?? 'asc'

        this.vk = new VkClient()
        this.comments =  {}
    }

    async prepare() {
        this.comments = await this.vk.getComments(this.groupId, this.topicId)
    }

    async getRoot() {
        await this.prepare()

        this.$root.innerHTML = createPage(this.comments)
    }
}