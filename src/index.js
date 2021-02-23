import './scss/index.scss'
import {VkThemeViewer} from "@/components/VkThemeViewer/VkThemeViewer";

export async function run ($root, options) {
    await new VkThemeViewer($root, options).start()
}