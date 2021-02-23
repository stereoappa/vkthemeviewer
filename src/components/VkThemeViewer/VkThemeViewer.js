import {createViewer} from "@/components/VkThemeViewer/vkthemeviewer.template"
import {Paging} from "@/components/Paging/Paging"

export class VkThemeViewer {
    constructor($root, options) {
        this.$root = document.querySelector($root)

        this.paging = new Paging($root, options)

        this.init()
    }

    init(){
        this.onClick = this.onClick.bind(this)
        this.$root.addEventListener('click', this.onClick)
    }

    async start() {
        const pageHtml = await createViewer(await this.paging.getPageHtml(0))
        this.$root.innerHTML = pageHtml
    }

    async onClick(event) {
        let pageHtml

        if (event.target.dataset.action === 'next-btn'){
            pageHtml = await this.paging.getNextPage()
        }
        else if (event.target.dataset.action === 'back-btn') {
            pageHtml = await this.paging.getPreviousPage()
        } else
            return

        if (!pageHtml) {
            return
        }

        const viewerHtml = createViewer(pageHtml)
        this.$root.innerHTML = viewerHtml
    }

    destroy() {
        this.$root.removeEventListener('click', this.onClick)
    }
}