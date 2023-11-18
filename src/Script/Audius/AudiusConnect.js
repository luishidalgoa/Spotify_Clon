let track;
let url;

function getToken() {
  return new Promise((resolve) => {
    const audiusSdk = window.audiusSdk({
      apiKey: "b93e4682ceb0196e408b128bfa8e4a927d65d23a", //objeto ApiKEY
    });
    resolve(audiusSdk)
  })
}


async function searchTrackById(id) {
  const audiusSdk = await getToken()
  const result = await audiusSdk.tracks.getTrack({
    trackId: id
  });

  return result;
}

async function getStreamUrl(id) {
  const audiusSdk = await getToken()
  const url = await audiusSdk.tracks.streamTrack({
    trackId: id,
  });
  return url
}
//[28-10-2023] Obtener una lista de canciones en base a la busqueda
async function getTracks(filterWord) {
  const audiusSdk = await getToken()
  return await audiusSdk.tracks.searchTracks({
    query: `${filterWord}`,
  });
}

function buildCard(track, url) {
  return `<div>
            <h2>${track.title}</h2>
            <img src="${track.artwork._150x150}">
            <audio controls><source src="${url}"></audio>
        </div>`
}
