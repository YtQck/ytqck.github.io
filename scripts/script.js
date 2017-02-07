api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
base_url = "https://ytqck.github.io/new";
id = "G3CcBFPMROU";
var playButton = function(state) {
    var icon = state ? "fa-pause-circle-o" : "fa-play-circle-o";
    var iconR = state ? "fa-play-circle-o" : "fa-pause-circle-o";
    $('#play-pause').removeClass(iconR);
    $('#play-pause').addClass(icon);
};

function hash_search() {
    var url = window.location.href;
    var isLink = url.indexOf(base_url);
    if (isLink != -1) {
        if (url.indexOf('=') > -1) {
            window.id = url.slice(url.indexOf("=") + 1, url.length);
            if (id === '') {
                //do nothing
            }
            console.log(id);
            cover = "url(https://i.ytimg.com/vi/" + id + "/hqdefault.jpg)";
            $("#cover").css('background-image', cover);
        } else {
            //do nothing
        }
    }
    console.log(id);
}

function playPause() {
    $('#play-pause').removeClass('fa-pause-circle-o');
    $('#play-pause').addClass('fa-play-circle-o');
}
$(document).ready(function() {
    hash_search();
    $('#input').keyup(function() {

        setTimeout(function() {
            var q = $('#input').val().trim();
            var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + q + '&type=video&key=' + api;
            $.getJSON(url, function(json) {
                id = json.items[0].id.videoId;
                transfer(id);
            });
        }, 2000);

    });
    $('#searchForm').on('submit', function(event) {
        event.preventDefault();
    });

    $('#play-pause').on('click', function() {
        state = player.getPlayerState();
        state === YT.PlayerState.PLAYING || player.getPlayerState() === YT.PlayerState.BUFFERING ? (player.pauseVideo(), playButton(!1)) : (player.playVideo(), playButton(!0));
        console.log(state);
        //playPause();
    });
    $('#next-play').on('click', function() {
        player.nextVideo();
    });
    $('#volume').on('change', function() {
        volume = $('#volume').val();
        player.setVolume(volume);
    });
});

function transfer(a) {
    url = base_url + '?id=' + a;
    window.open(url, "_self");
}

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('players', {
        height: '0',
        width: '0',
        videoId: id,
        autoplay: 0,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    duration = event.target.getDuration();
}
var done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
