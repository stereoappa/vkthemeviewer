import './scss/index.scss'
import {VkClient} from "@/core/VkClient";
import {VkThemeViewer} from "@/components/VkThemeViewer/VkThemeViewer";


new VkThemeViewer('#app', {
    groupId: 134722432,
    topicId: 35366383
}).start()

