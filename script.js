const searchBar = document.querySelector('.search-bar');
const publicationsGrid = document.querySelector('.publications-grid');
const createPlaylistButton = document.querySelector('.create-playlist-btn');
const sidebarPlaylist = document.querySelector('.sidebar ul.library-list');

const API_KEY = 'AIzaSyDdtVzUVruHqaBODPxW2yPX5I1nXaA2lBw'; 
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

let playlists = JSON.parse(localStorage.getItem('playlists')) || [];

// Función para buscar videos en YouTube
function searchVideos(query) {
    const url = `${BASE_URL}?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderVideos(data.items);
        })
        .catch(error => {
            console.error('Error al buscar videos:', error);
        });
}

// Renderizar videos en la sección de publicaciones
function renderVideos(videos) {
    publicationsGrid.innerHTML = ''; 
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'card';
        videoCard.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
            <h3>${video.snippet.title}</h3>
            <button class="add-to-playlist" data-video-id="${video.id.videoId}" data-title="${video.snippet.title}">+ Add to Playlist</button>
            <button class="play-video" data-video-id="${video.id.videoId}">Play Video</button> <!-- Nuevo botón para reproducir -->
        `;
        publicationsGrid.appendChild(videoCard);
    });

     document.querySelectorAll('.add-to-playlist').forEach(button => {
        button.addEventListener('click', addToPlaylist);
    });

    document.querySelectorAll('.play-video').forEach(button => {
        button.addEventListener('click', playVideo);
    });
}
// Función para reproducir un video
function playVideo(event) {
    const videoId = event.target.dataset.videoId;
    const videoPlayer = document.getElementById('video-player');
    const videoSource = document.getElementById('video-source');

 
    videoSource.src = `https://www.youtube.com/watch?v=${pZ1NdE69VTs}`; 
    videoPlayer.load(); // Recargar el reproductor
    videoPlayer.play(); // Reproducir el video
}

// Agregar un video a la playlist
function addToPlaylist(event) {
    const videoId = event.target.dataset.videoId;
    const title = event.target.dataset.title;

    playlists.push({ id: videoId, title });
    localStorage.setItem('playlists', JSON.stringify(playlists));
    alert(`Se agregó "${title}" a tu Playlist`);

    renderPlaylists();
}

// Renderizar las playlists en el menú lateral
function renderPlaylists() {
    sidebarPlaylist.innerHTML = ''; // Limpiar la lista

    playlists.forEach((video, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${video.title}</span>
            <button class="remove-from-playlist" data-index="${index}">X</button>
        `;
        sidebarPlaylist.appendChild(li);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.remove-from-playlist').forEach(button => {
        button.addEventListener('click', removeFromPlaylist);
    });
}

// Eliminar un video de la playlist
function removeFromPlaylist(event) {
    const index = event.target.dataset.index;
    playlists.splice(index, 1);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    renderPlaylists();
}

// Event listener para la barra de búsqueda
searchBar.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        const query = searchBar.value.trim();
        if (query) {
            searchVideos(query);
        }
    }
});

// Inicializar playlists
renderPlaylists();

// Obtener todos los botones de "Play Video"
const playButtons = document.querySelectorAll('.play-video');

// Obtener el reproductor de video
const videoPlayer = document.getElementById('video-player');
const videoSource = document.getElementById('video-source');

// Función para reproducir el video
playButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const videoSrc = event.target.dataset.videoSrc;
        
        // Cambiar la fuente del video en el reproductor
        videoSource.src = videoSrc;
        
        // Cargar y reproducir el video
        videoPlayer.load();
        videoPlayer.play();
    });
});


