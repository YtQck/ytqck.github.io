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
  $(".genres").addClass("hactive");
});

$(document).ready(function($){
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
      var videoID = json.items[0].id.videoId
      result = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+json.items[0].id.videoId+'" frameborder="0" allowfullscreen></iframe>';
      players.html(result);
    });
  });
});
var player;


function onPlayerReady(event) {
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
}
