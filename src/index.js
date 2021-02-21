import './scss/index.scss'
import {VkClient} from "@/core/VkClient";
import {CommentsPage} from "@/components/CommentsPage/CommentsPage";


new CommentsPage('#app', {
    groupId: 134722432,
    topicId: 35366383
}).getRoot()

