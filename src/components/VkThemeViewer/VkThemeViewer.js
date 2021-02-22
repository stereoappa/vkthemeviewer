import {createViewer} from "@/components/VkThemeViewer/vkthemeviewer.template";
import {Paging} from "@/components/Paging/Paging"
import {Mediator} from "@/core/Mediator"

export class VkThemeViewer {
    constructor($root, options) {
        this.$root = document.querySelector($root)

        this.mediator = new Mediator()

        this.paging = new Paging($root,{
                ...options,
                mediator: this.mediator})

        this.registerMediator()
    }

    async start(startPage = 1) {
        await this.renderPage(startPage)
    }

    registerMediator() {
        this.unsubscribers = []

        this.onNextClick = this.onNextClick.bind(this)
        this.onBacktClick = this.onBackClick.bind(this)

        this.unsubscribers.push(
            this.mediator.subscribe('paging:next', this.onNextClick)
        )

        this.unsubscribers.push(
            this.mediator.subscribe('paging:back', this.onBackClick))
    }

    async renderPage(number){
        const viewehtml = createViewer(await this.paging.getPageHtml(number))
        this.$root.innerHTML = viewehtml
    }

    onNextClick(){
        console.log('next click')
        this.renderPage(2)
    }

    onBackClick(){
        console.log('back click')
        this.renderPage(1)
    }


    destroy() {
        this.unsubscribers.forEach(unsub => unsub())
    }
}