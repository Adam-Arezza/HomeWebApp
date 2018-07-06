$(document).ready(function () {
    var blindInterval = setInterval(function () {
        getBlinds()
    }, 3000)
})
function getBlinds() {
    var blindLevel
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/blinds/', true)
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            blindLevel = JSON.parse(xhttp.responseText)
            console.log(blindLevel)
            document.getElementById("blindLevel").innerHTML = blindLevel.level
        }
        else if (this.readyState == 4 && this.status != 200) {
            console.log(xhttp.responseText)
        }
    }

    xhttp.send();
}

function blindControl(direction) {
    var moveBlind = new FormData()
    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/blinds/', true)
    moveBlind.append('direction', direction)
    xhttp.send(moveBlind);
}