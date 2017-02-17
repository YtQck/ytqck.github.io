userId = "";

/*facebook login*/
window.fbAsyncInit = function() {
    FB.init({
        appId: '758134654325447',
        xfbml: true,
        version: 'v2.8'
    });
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            $("#login").css("display", "none");
            getInfo();
            $("#downloadBtn").show();
        } else if (response.status === 'not_authorized') {

        } else {

        }
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            $("#login").css("display", "none");
            getInfo();
            $("#downloadBtn").show();
        } else if (response.status === 'not_authorized') {

        } else {

        }
    });
}

function getInfo() {
    FB.api('/me', 'GET', {
        fields: 'first_name,email,last_name,name,id,picture.width(50).height(50)'
    }, function(response) {
        photoURL = response.picture.data.url;
        $("#avatar").attr("src", photoURL);
        $("#userName").html(response.first_name);
        userId = response.id;
        db_userInfo(response.id, response.name, response.email, photoURL, response.first_name);
    });
    console.log(userId);
}
