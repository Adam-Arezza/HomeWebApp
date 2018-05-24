//url for each hue light group in the house
var hueEndpoints = {
    office: "http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/1/",
    bedroom: "http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/2/"
};
$(document).ready(function () {
    var intervalId = setInterval(function () {
        makeGetRequest(hueEndpoints.office,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("Officelights").innerHTML = "ON"
                    document.getElementById("officeDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("Officelights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });
        makeGetRequest(hueEndpoints.bedroom,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("bedroomlights").innerHTML = "ON"
                    document.getElementById("bedroomDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("bedroomlights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });

    }, 3000);

    $(".officeToggle").click(function () {
        if ($("#Officelights")['0'].textContent == "ON") {
            lightSwitch("office", false)
            $("#Officelights")['0'].textContent = "OFF"
        }
        else if ($("#Officelights")['0'].textContent == "OFF") {
            lightSwitch("office", true)
            $("#Officelights")['0'].textContent = "ON"
        }
    });

    $(".bedroomToggle").click(function () {
        if ($("#bedroomlights")['0'].textContent == "ON") {
            lightSwitch("bedroom", false)
            $("#bedroomlights")['0'].textContent = "OFF"
        }
        else if ($("#bedroomlights")['0'].textContent == "OFF") {
            lightSwitch("bedroom", true)
            $("#bedroomlights")['0'].textContent = "ON"
        }
    });
});

//Light On/Off control function
function lightSwitch(location, state) {
    var url = hueEndpoints[location] + "action";
    var lightChange = { "on": state }
    makePutRequest(url, JSON.stringify(lightChange), function (response) {
        console.log('response', response)
    }, function (error) {
        console.log(error)
    });
}

//Light dimmer function
function lightdim(location, dimmer) {
    var dimVal = document.getElementById(dimmer).value;
    var url = hueEndpoints[location] + "action";
    var lightDimmer = { "bri": parseInt(dimVal) }
    makePutRequest(url, JSON.stringify(lightDimmer), function (response) {
        console.log('response', response)
    }, function (error) {
        console.log(error)
    });
}

function makeGetRequest(url, responseCallback, errorCallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (responseCallback) {
                responseCallback(JSON.parse(xhttp.responseText));
            }
        } else if (this.readyState == 4 && this.status != 200) {
            if (!errorCallback) {
                return console.error(this.responseText);
            }
            errorCallback(JSON.parse(xhttp.responseText));
        };
    };
    xhttp.send();
}

function makePutRequest(url, body, responseCallback, errorCallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (responseCallback) {
                responseCallback(JSON.parse(xhttp.responseText));
            }
        } else if (this.readyState == 4 && this.status != 200) {
            if (!errorCallback) {
                return console.error(this.responseText);
            }
            errorCallback(JSON.parse(xhttp.responseText));
        };
    };
    xhttp.send(body);
};
