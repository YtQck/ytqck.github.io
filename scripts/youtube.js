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

var api = "AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw";
//search from hash{}
function hash_search(){
  var url = window.location.href;
  var isLink = url.indexOf("ytqck.github.io/");
  if (isLink != -1) {
    if(url.indexOf('#')>-1){
      var query = url.slice(url.indexOf("#") + 1 , url.length);
      if(query === ''){
        query = "YtQck";
      }
      search_videoID(query);
      toggle_player_pager();
    }else{
      //do nothing
    }
  }
}

function search_videoID(query){
  var q = decodeURIComponent(query);
  var url = 'https://www.googleapis.com/youtube/v3/search?part=id&q='+q+'&type=video&key='+api;
  $.getJSON(url, function(json){
    videoID = json.items[0].id.videoId;
    window.a = videoID;
    load_iframe(videoID);
    videoData(videoID);
  });
}

function load_iframe(a){
  var result = '';
  var players = $('#player');
  result = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+a+'?enablejsapi=1&version=3" frameborder="0" allowfullscreen></iframe>';
  players.html(result);
}

function toggle_player_pager(){
  $(".page").removeClass("hactive");
  $(".player").addClass("hactive");
  $(".tab").removeClass("active");
  $(".two").addClass("active");
}

$(document).ready(function($){
  hash_search();
  //input hashing to url
  $('#input').keyup(function(e){
    var q = $('#input').val().trim();
    var qe = encodeURIComponent(q);
    window.location.href = "#"+qe;
    hash_search();
  });
});

/*  //mostPopular thu mbnails
  var mostPopular = $('#mostPopular');
  var link = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&videoCategoryById=10&regionCode=IN&maxResults=25&key=AIzaSyDf-TCgD54NNSlg_PbqeJyhXWhn0B4WBzw';
  var tId;
  var st='';
  $.getJSON(link, function(json){
    for(var i=1; i<12; i++){
      tId = json.items[i].id;
      st += '<div class="carousel-cell"><img class="carousel-cell-image"data-flickity-lazyload="https://i.ytimg.com/vi/'+tId+'/hqdefault.jpg" height="100" width="100" /></div>';
    };
    mostPopular.html(st);
  });
  $('#mostPopular').flickity({
    cellAlign: 'left',
    contain: true,
    lazyLoad: true
  });
});
*/
/*
//carousel
var currentIndex = 0,
  items = $('.container div'),
  itemAmt = items.length;

function cycleItems() {
  var item = $('.container div').eq(currentIndex);
  items.hide();
  item.css('display','inline-block');
}

var autoSlide = setInterval(function() {
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
}, 3000);

$('.next').click(function() {
  clearInterval(autoSlide);
  currentIndex += 1;
  if (currentIndex > itemAmt - 1) {
    currentIndex = 0;
  }
  cycleItems();
});

$('.prev').click(function() {
  clearInterval(autoSlide);
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = itemAmt - 1;
  }
  cycleItems();
});*/

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
