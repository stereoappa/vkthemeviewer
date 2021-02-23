const VK_HOST = 'https://vk.com'
const USERLINK_REGEX = /\[(id{1}\d+)(.*)\|(.*)\]/g

export function createPage(response = [], pageNumber, pagesAmount){
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

    return `
        <div class="vkthemeviewer-header">
             <div class="vkthemeviewer-header-counter">
                  <span>${pageNumber} из ${pagesAmount}</span>
             </div>
             ${createPagination()}
        </div>
        
        <div class="vkthemeviewer-posts">
            ${vkReplaceUserLinks(html)}
        </div>
        ${createPagination()}
    `
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

function createPagination() {
    return `
            <div class="vkthemeviewer-pagination">
               <a data-action="back-btn" title="Назад">
                    <div data-action="back-btn" class="pg_in">«</div>
               </a>
                <a data-action="next-btn" title="Вперёд">
                    <div data-action="next-btn" class="pg_in">»</div>
               </a>
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


