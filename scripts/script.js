api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
base_url = "https://ytqck.github.io/new";
id = "";

function channel(channelID) {
    url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id=" + channelID + "&key=" + api;
    $.getJSON(url, function(json) {
        img = json.items[0].snippet.thumbnails.default.url;
        $("#channelIcon").attr("src", img);
        title = json.items[0].snippet.title;
        $("#channelName").text(title);
    });
}

function details(id) {
    url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + api;
    $.getJSON(url, function(json) {
        title = json.items[0].snippet.title;
        $("#video_name").text(title);
        channelID = json.items[0].snippet.channelId;
        channel(channelID);
    });
}

function playButton(state) {
    var icon = state ? "fa-pause-circle-o" : "fa-play-circle-o";
    var iconR = state ? "fa-play-circle-o" : "fa-pause-circle-o";
    $('#play-pause').removeClass(iconR);
    $('#play-pause').addClass(icon);
}

function mute(state) {
    var iconR = state ? "fa-volume-off" : "fa-volume-up";
    var icon = state ? "fa-volume-up" : "fa-volume-off";
    $('#mute').removeClass(iconR);
    $('#mute').addClass(icon);
}

function seekTO(a) {
    player.seekTo(a, false);
}

function hash_search() {
    var url = window.location.href;
    var isLink = url.indexOf(base_url);
    if (isLink != -1) {
        if (url.indexOf('=') > -1) {
            window.id = url.slice(url.indexOf("=") + 1, url.length);
            if (id === '') {
                //do nothing
            }
            cover = "url(https://i.ytimg.com/vi/" + id + "/sddefault.jpg)";
            $("#cover").css('background-image', cover);
        } else {
            //do nothing
        }
    }
    details(id);
}

function timeEncode(time) {
    min = time / 60;
    sec = time % 60;
    min = Math.floor(min);
    sec = Math.floor(sec);
    result = min + ":" + sec;
    return result;
}

function currentTime(a) {
    setTimeout(function() {
        currentTimeSec = player.getCurrentTime();
        //duration = player.getDuration();
        complete = (currentTimeSec / a) * 1000;
        complete = Math.floor(complete);
        $('#seekbar').attr("value", complete);
        currentDuration = timeEncode(currentTimeSec);
        $('#currentTime').text(currentDuration);
        currentTime(a);
    }, 1000);
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
    });
    $('#mute').on('click', function() {
        state = player.isMuted();
        state === false ? (player.mute(), mute(!1)) : (player.unMute(), mute(!0));
    });
    $('#next-play').on('click', function() {
        player.nextVideo();
    });
    $('#volume').on('change', function() {
        volume = $('#volume').val();
        player.setVolume(volume);
    });
    $('#seekbar').on('change', function() {
        seek = $('#seekbar').val();
        seek = Math.floor(seek / 10) / 100;
        to = player.getDuration() * seek;
        currentDuration = timeEncode(to);
        $('#currentTime').text(currentDuration);
        seekTO(to);
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
    duration = player.getDuration();
    currentTime(duration);
    duration = timeEncode(duration);
    $('#duration').text(duration);
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
