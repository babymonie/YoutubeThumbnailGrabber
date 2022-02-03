window.onload = function() {
    document.getElementById("url").focus();
    alert("sorry about this but the youtu.be domain is not supported yet.\nPlease enter a the normal youtube.com URL");
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
        if (url.indexOf("youtube.com") == -1) {
            alert("Please enter a valid youtube URL");
            return false;
        }
        else {
                //get anything afteR v=
                var video_id = url.substring(url.indexOf("v=") + 2||url.indexOf("/") + 1);
                //check if the video id is valid
                if (video_id.length == 11) {
                   fetch("https://noembed.com/embed?url=" + url)
                    .then(response => {
                        text = response.text();
                        console.log(text);
                        return text;
                    })
                    .then(data => {
                        if (data.error) {
                            alert("Please enter a valid YouTube URL");
                        }
                        else {
                            console.log(data);
                            data = JSON.parse(data);
                            var title = data.title;
                            console.log(title);
                            var thumbnail_url = data.thumbnail_url;
                            console.log(thumbnail_url);
                            fetch(thumbnail_url,{ mode: 'no-cors'})
                            .then(response => {
                                return response.blob();
                            })
                            .then(blob => {
                                console.log(blob);
                                var url = URL.createObjectURL(blob);
                                console.log(url);
                                var link = document.createElement("a");
                                link.href = url;
                                link.download = title + ".jpg";
                                link.click();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
                else {
                    alert("Please enter a valid YouTube URL");
                    return false;
                }
            }
        }      
    }
