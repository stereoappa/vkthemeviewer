import {VkClient} from "@/core/VkClient";
import {createPage} from "@/components/Paging/paging.template";

export class Paging {
    constructor($root, options) {
        //this.containerName = 'vkthemeviewer-page'
        //this.$root = document.querySelector('.' + this.containerName)
        debugger
        this.$root = document.querySelector($root)
        this.groupId = options.groupId
        this.topicId = options.topicId
        this.countOnPage = options.countOnPage ?? 20
        this.sort = options.sort ?? 'asc'

        this.vk = new VkClient()
        this.mediator = options.mediator

        this.onClick = this.onClick.bind(this)
        this.$root.addEventListener('click', this.onClick)
    }

    async getPageHtml(pageNumber) {
        const offset = pageNumber * this.countOnPage

        const comments = await this.vk.getComments(this.groupId, this.topicId, offset)

        return this.toHtml(comments.items)
    }

    onClick(event) {
        debugger
        const target = event.target
        console.log(target)

        this.mediator.emit('paging:next')
    }

    toHtml(comments){
        return createPage(comments)
    }
}