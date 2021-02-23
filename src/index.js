import './scss/index.scss'
import {VkThemeViewer} from "@/components/VkThemeViewer/VkThemeViewer"

let Instance

export async function run ($root, options) {
    this.Instance = new VkThemeViewer($root, options)
    await this.Instance.start()
}

export async function destroy () {
    if (this.Instance) {
        this.Instance.destroy()
    }
}

