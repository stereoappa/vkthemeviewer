
export function createPage(comments = []){
return `
      <div class="vkthemeviewer-page">
        ${comments.map(c => createComment(c)).join('')}
        ${createButtons()}
      </div>
    `
}

function createComment(comment){
    return `
        <div class="comment">
            ${comment.text}
        </div>
    `
}


function createButtons() {
    return `
        <div>
            <button data-action="next-btn"> >> </button>
            <button data-action="back-btn"> << </button>
        </div>
    `
}