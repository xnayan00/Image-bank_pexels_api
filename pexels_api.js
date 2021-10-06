var api = new XMLHttpRequest()
var imgCardContent = document.getElementById('imgCardContent')

/*****   Pexels API GET photos   *****/
api.open('GET', 'https://api.pexels.com/v1/search?query=office&per_page=16')
api.setRequestHeader(
    "Authorization",
    "563492ad6f917000010000018bf00f1cdc874994bd214ddf5cdd6235"
);
api.onreadystatechange = function setPhotosObj() {
    if(api.readyState === 4){        
        let photosObj = JSON.parse(api.responseText)

        /*****   insert images dynamically   *****/
        photosObj.photos.map(photo => {
            imgCardContent.innerHTML +=
                `<div class="c-image-card"><img src="${photo.src.tiny}"></div>`
        })
    }
}
api.send()