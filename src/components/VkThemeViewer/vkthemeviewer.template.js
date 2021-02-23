export function createViewer(pageHtml){
    const v =
    `<div class="vkthemeviewer">
        <div class="vkthemeviewer-header">
            ${createPagination()}
        </div>
        
        <div class="vkthemeviewer-posts">
            ${pageHtml}
        </div>
        ${createPagination()}
    </div>
    `
    return v
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