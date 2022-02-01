window.onload = function() {
    document.getElementById("url").focus();
}
function check() {
    var url = document.getElementById("url").value;
    if (url.length == 0) {
        alert("Please enter a URL");
        return false;
    }
    else
    {
        //check if the url contains youtube.com or youtu.be
        if (url.indexOf("youtube.com") == -1 && url.indexOf("youtu.be") == -1) {
            alert("Please enter a valid YouTube URL");
            return false;
        }
        else {
                //get anything afte v=
                var video_id = url.substring(url.indexOf("v=") + 2);
                //check if the video id is valid
                if (video_id.length == 11) {
                    var url2 = "https://i.ytimg.com/vi/"+video_id+"/hqdefault.jpg";
                    //download the image                    
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url2, true);
                    xhr.responseType = 'blob';
                    xhr.onload = function(e) {
                        if (this.status == 200) {
                            var blob = this.response;
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            link.download = video_id+".jpg";
                            link.click();
                        }
                    };
                    xhr.send();
                }
                else {
                    alert("Please enter a valid YouTube URL");
                    return false;
                }
            }
        }      
    }