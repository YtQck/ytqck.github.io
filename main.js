var z = window.location.href;
var y = z.substring(38, z.length);
document.getElementById('YTPlayer').innerHTML = ('<iframe id="ytplayer" type="text/html" width="100%" height="480px" src="https://www.youtube.com/embed/'+y+'?autoplay=1&color=white&showinfo=0&rel=0" allowfullscreen frameborder="0"></iframe>');
