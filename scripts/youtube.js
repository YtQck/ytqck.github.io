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

$(document).ready(function($){

  //video play
  $('#input').keyup(function(){
    var q = $('#input').val().trim();
    var result = '';
    var players = $('#player');
    var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q='+q+'&type=video&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw';
    $(".page").removeClass("hactive");
    $(".player").addClass("hactive");
    $(".tab").removeClass("active");
    $(".two").addClass("active");
    $.getJSON(url, function(json){
      var videoID = json.items[0].id.videoId;
      result = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>';
      players.html(result);
      videoData(videoID);
      var uid = window.uid
      userVideo(uid, videoID)
    });
  });

  //mostPopular thumbnails
  var mostPopular = $('#mostPopular');
  var link = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&videoCategoryById=10&regionCode=IN&maxResults=25&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw';
  var tId;
  var st='';
  $.getJSON(link, function(json){
    for(var i=1; i<12; i++){
      tId = json.items[i].id;
      st += '<img class="owl-lazy" src="https://i.ytimg.com/vi/'+tId+'/hqdefault.jpg" height="100" width="100" />';
    };
    //mostPopular.html(st);
  });
});


//working
var player;
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
