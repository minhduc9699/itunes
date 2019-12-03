const rootUrl = 'https://itunes.apple.com/us/rss'
const topSongsUrl = rootUrl + '/topsongs/all'
const topAlbumsUrl = rootUrl + '/topalbums/all/limit=20/json'


async function getData (quantity) {
  const songContainer = document.getElementById('songs-content')
  songContainer.innerHTML = ''
  const request = await fetch(topSongsUrl + `/limit=${quantity}/json`)
  let data = await request.json()
  console.log(data)
  data = data.feed.entry
  for (let i=0; i<data.length; i++) {
    const songName = data[i]['im:name'].label
    const artistName = data[i]['im:artist'].label
    const image = data[i]['im:image'][0].label
    const audio = data[i].link[1].attributes.href
    songContainer.innerHTML += `
    <div class="song">
      <img src='${image}'>
      <p>${songName}</p>
      <p>${artistName}</p>
      <audio src='${audio}' class='song-play'></audio>
    </div>
    `
  }


  const songElement = document.getElementsByClassName('song')
  for (let i=0; i<songElement.length; i++) {
    songElement[i].addEventListener('click', function (event) {
      for (let j=0; j<songElement.length; j++) {
        songElement[j].children[3].pause()
      }
      const audioElement = event.target.parentNode.children[3]
      if (audioElement.paused) {
        audioElement.play()
      }
    })
  }

}

const quantityOption = document.getElementById('quantity')
quantityOption.addEventListener('change', function(event){ // change event use for select tag
  getData(event.target.value);
})

getData(20)