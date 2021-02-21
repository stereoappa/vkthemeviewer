export function createPage(comments = {}){
    return comments.items.map(c => createComment(c)).join('')
}

function createComment(comment){
    return `
        <div class="comment">
            ${comment.text}
        </div>
    `
}