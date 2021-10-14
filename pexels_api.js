const api = new XMLHttpRequest()
const imgCardContent = document.getElementById('imgCardContent')
var photosObj = []
var nextPage = ''
var prevPage = ''

function getPhotos(value, page) {
    imgCardContent.innerHTML = ""

    if(!value){
        value = 'house'
    }

    if(nextPage !== '' && page === 'next'){
        api.open('GET', nextPage)
    } else if(prevPage !== '' && page === 'prev'){
        api.open('GET', prevPage)
    } else {
        api.open('GET', `https://api.pexels.com/v1/search?query=${value}`)
    }
    api.setRequestHeader(
        "Authorization",
        "563492ad6f917000010000018bf00f1cdc874994bd214ddf5cdd6235"
    )
    api.onreadystatechange = () => {
        if(api.readyState === 4){ // verify if the request state is equal 4 (done)
            photosObj = JSON.parse(api.responseText)
            if(photosObj.page > 1){
                nextPage = photosObj.next_page
                prevPage = photosObj.prev_page
            } else {
                nextPage = photosObj.next_page
            }
            /*****   insert images dynamically   *****/
            return photosObj.photos.map(photo => {
                imgCardContent.innerHTML +=
                    `<div class="c-gallery-image"><img src="${photo.src.tiny}"></div>`
            })
        }
    }
    api.send() // send the request
}
getPhotos() // Initialize with some photos