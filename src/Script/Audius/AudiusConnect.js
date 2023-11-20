//------------------------------------API-Key

/**
 * devuelve el token de la api de audius
 * @returns {Promise} retorna una promesa con el token
 */
function getToken() {
  return new Promise((resolve) => {
    const audiusSdk = window.audiusSdk({
      apiKey: 'b93e4682ceb0196e408b128bfa8e4a927d65d23a', //objeto ApiKEY
    });
    resolve(audiusSdk)
  })
}

//--------------------------------Tracks

/**
 * busca una cancion por su id
 * @param {*} id de la cancion
 * @returns {Promise} retorna una promesa con la cancion
 */
async function searchTrackById(id) {
  const audiusSdk = await getToken()
  const result = await audiusSdk.tracks.getTrack({
    trackId: id
  });

  return result;
}
/**
 * este metodo devolvera la url de la cancion a partir de su id
 * @param {*} id id de la cancion
 * @returns {Promise} retorna una promesa con la url de la cancion
 */
async function getStreamUrl(id) {
  const audiusSdk = await getToken()
  const url = await audiusSdk.tracks.streamTrack({
    trackId: id,
  });
  return url
}
/**
 * obtiene una lista de canciones por el titulo
 * @param {*} filterWord palabra clave para filtrar
 * @returns {Promise} retorna una promesa con la lista de canciones
 */
async function getTrackByTitle(filterWord) {
  const audiusSdk = await getToken()
  return await audiusSdk.tracks.searchTracks({
    query: `${filterWord}`,
  });
}
//---------------------------------------Auth-----
/*var sdk;

function init() {
  sdk = window.audiusSdk({
    appName: "My Demo App"
  });
}

window.onload = async function () {
  init();
  sdk.oauth.init({
    successCallback: function (profile) {
      document.getElementById(
        "content"
      ).innerHTML = `You're logged in as ${profile.handle}!`;
      document.getElementById("error").innerHTML = "";
    },
    errorCallback: function (errorMessage) {
      document.getElementById(
        "error"
      ).innerHTML = `Whoops, there was an error: ${errorMessage}`;
    }
  });
  sdk.oauth.renderButton({
    element: document.getElementById("audius-login-button")
  });
};*/
