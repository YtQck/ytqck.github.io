api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
base_url = "https://ytqck.github.io/new";
id = "G3CcBFPMROU";

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
$(document).ready(function() {
    hash_search();
    $('#searchForm').on('submit', function(event) {
        var q = $('#search').val().trim();
        var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q=' + q + '&type=video&key=' + api;
        $.getJSON(url, function(json) {
            id = json.items[0].id.videoId;
            transfer(id);
        });
        event.preventDefault();
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
