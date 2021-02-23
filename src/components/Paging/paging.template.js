const VK_HOST = 'https://vk.com'
const USERLINK_REGEX = /\[(id{1}\d+)(.*)\|(.*)\]/g

export function createPage(response = []){
    let html = ''

    for (let i=0; i < response.items.length; i++) {
        if (response.items[i].from_id < 0) {
            html += createGroupComment(
                response.items[i],
                response.groups.find(g => g.id === Math.abs(response.items[i].from_id)))
        } else {
            html += createComment(
                response.items[i],
                response.profiles.find(p => p.id === response.items[i].from_id)
            )
        }
    }

    return vkReplaceUserLinks(html)
}

function createComment(comment, profile){
    return `
    <div class="post">
         <a target="_blank" class="post_image" href="${VK_HOST}/id${profile.id}">
            <img src="${profile.photo_50}" 
                 class="post_img" 
                 alt="${profile.first_name} ${profile.last_name}">
         </a>
         <div class="post-content">
            <div class="post_author">
                <a target="_blank" class="author" href="${VK_HOST}/id${profile.id}">${profile.first_name} ${profile.last_name}</a>
            </div>
            <div class="post-text">${comment.text}</div>
        </div>
    </div>
    `
}

function createGroupComment(comment, group) {
   return `
    <div class="post">
         <a target="_blank" class="post_image" href="${VK_HOST}/id${group.id}">
            <img src="${group.photo_50}" 
                 class="post_img" 
                 alt="${group.name}">
         </a>
         <div class="post-content">
            <div class="post_author">
                <a target="_blank" class="author" href="${VK_HOST}/id${group.id}">${group.name}</a>
            </div>
            <div class="post-text">${comment.text}</div>
        </div>
    </div>
    `
}


function vkReplaceUserLinks(str) {
    return str.replace(USERLINK_REGEX, ((match, id, _, userName) => {
        return `
            <a href="${VK_HOST}/${id}">${userName}</a>
    `
    }))
}


