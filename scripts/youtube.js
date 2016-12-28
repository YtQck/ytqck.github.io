$(".one").on('click', function() {
  $(".page").removeClass("hactive");
  $(".home").addClass("hactive");
});

$(".two").on('click', function(){
  $(".page").removeClass("hactive");
  $(".player").addClass("hactive");
});

$(".three").on('click', function(){
  $(".page").removeClass("hactive");
  $(".artists").addClass("hactive");
});

$(".four").on('click', function(){
  $(".page").removeClass("hactive");
  $(".albums").addClass("hactive");
});

$(".five").on('click', function(){
  $(".page").removeClass("hactive");
  $(".songs").addClass("hactive");
});

$(".six").on('click', function(){
  $(".page").removeClass("hactive");
  $(".feed").addClass("hactive");
});


//search from hash{}
function hash_search(){
  var url = window.location.href;
  var isLink = url.indexOf("127.0.0.1:4000/");
  if (isLink != -1) {
      var query = url.slice(url.indexOf("#") + 1 , url.length);
  }
  search_videoID(query);
  toggle_player_pager();
}

function search_videoID(query){
  var q = decodeURIComponent(query);
  var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q='+q+'&type=video&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw';
  $.getJSON(url, function(json){
    var videoID = json.items[0].id.videoId;
    //onYouTubeIframeAPIReady(videoID);
    function onYouTubeIframeAPIReady(id) {
      var player;
      player = new YT.Player('player', {
        videoId: videoId,
        playerVars: {
          'autoplay': 1,
          'controls': 0
        },
        events: {
          'onReady': onPlayerReady,
          //'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
          //'onStateChange': onPlayerStateChange,
          //'onError': onPlayerError
        }
      });
    }
    //result = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe><!-- Colored FAB button with ripple --><button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">share</i></button>';
    //players.html(result);
    videoData(videoID);
    //userVideo(window.user_id, videoID);
  });
}

/*function onYouTubeIframeAPIReady(id) {
  var player;
  player = new YT.Player('player', {
    videoId: id,
    playerVars: {
      'autoplay': 1,
      'controls': 0
    },
    events: {
      'onReady': onPlayerReady,
      //'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
      //'onStateChange': onPlayerStateChange,
      //'onError': onPlayerError
    }
  });
}

function onPlayerReady(event) {
   //document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
   console.log("played");
 }*/

function toggle_player_pager(){
  $(".page").removeClass("hactive");
  $(".player").addClass("hactive");
  $(".tab").removeClass("active");
  $(".two").addClass("active");
}

$(document).ready(function($){
  //hash_search();
  //input hashing to url
  $('#input').keyup(function(e){
    var q = $('#input').val().trim();
    var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q='+q+'&type=video&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw';
    var qe = encodeURIComponent(q);
    window.location.href = "#"+qe;
    //hash_search();
    var result = '';
    var players = $('#player');
    toggle_player_pager();
    $.getJSON(url, function(json){
      var videoID = json.items[0].id.videoId;
      result = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>';
      players.html(result);
      videoData(videoID);
      //userVideo(window.user_id, videoID);
    });
    var details_link = '';
    //var id = window.vID;

  });

  //mostPopular thumbnails
  var mostPopular = $('#mostPopular');
  var link = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&videoCategoryById=10&regionCode=IN&maxResults=25&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw';
  var tId;
  var st='';
  $.getJSON(link, function(json){
    for(var i=1; i<12; i++){
      tId = json.items[i].id;
      st += '<div class="carousel-cell"><img class="carousel-cell-image"data-flickity-lazyload="https://i.ytimg.com/vi/'+tId+'/hqdefault.jpg" height="100" width="100" /></div>';
      //st += '<img class="owl-lazy" src="https://i.ytimg.com/vi/'+tId+'/hqdefault.jpg" height="100" width="100" />';
    };
    mostPopular.html(st);
  });
});


//working
/*function onPlayerReady(event) {
    var playButton = document.getElementById("play"),
        pauseButton = document.getElementById("pause");

    playButton.addEventListener("click", function() {
        player.playVideo();
    });

    pauseButton.addEventListener("click", function() {
        player.pauseVideo();
    });
}

function progress(percent, $element) {
    var progressBarWidth = percent * $element.width() / 100;
    $element.find('div').animate({
        width: progressBarWidth
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        var playerTotalTime = player.getDuration();
        var mytimer = setInterval(function() {
            var playerCurrentTime = player.getCurrentTime();
            var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
            progress(playerTimeDifference, $('#progressBar'));
        }, 1000);
    } else {
        clearTimeout(mytimer);
    }
}*/
