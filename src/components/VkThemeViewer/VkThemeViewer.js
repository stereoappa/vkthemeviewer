import {createViewer} from "@/components/VkThemeViewer/vkthemeviewer.template";
import {Paging} from "@/components/Paging/Paging"

export class VkThemeViewer {
    constructor($root, options) {
        this.$root = document.querySelector($root)

        this.paging = new Paging($root, options)
        this.pageNumber = 0

        this.onClick = this.onClick.bind(this)
        this.$root.addEventListener('click', this.onClick)
    }

    async start() {
        await this.renderPage()
    }

    async renderPage(){
        const pageHtml = createViewer(await this.paging.getPageHtml(this.pageNumber))
        this.$root.innerHTML = pageHtml
    }

    async onClick(event) {
        if (event.target.dataset.action === 'next-btn'){
            this.pageNumber++
        }
        else if (event.target.dataset.action === 'back-btn' && this.pageNumber > 0) {
            this.pageNumber--
        } else
            return

        await this.renderPage()
    }

    destroy() {
        this.$root.removeEventListener('click', this.onClick)
    }
}