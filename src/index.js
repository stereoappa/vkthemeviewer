import './module'
import './scss/index.scss'
import {VkApi} from "@/core/VkApi";

console.log('ind')


const apiKey = ''
const vk = new VkApi(apiKey)


vk.getComments(134722432,35366383)
    .then(
        items => {
            document.getElementById('app')
                .append(JSON.stringify(items))
        }
    )