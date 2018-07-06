//url for each hue light group in the house
var hueEndpoints = {
    Office: "http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/1/",
    Bedroom: "http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/2/",
    wardrobeRoom:"http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/3/",
    livingRoom:"http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/4/",
    FrontDoor:"http://192.168.0.3/api/zjMUMakQKZlX-TXwiYioPBF7QBfDvHCMcHzhIxmx/groups/5/"
};

$(document).ready(function () {

    var intervalId = setInterval(function () {

        //Updates UI with current state of the specified endpoint
        makeGetRequest(hueEndpoints.Office,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("Officelights").innerHTML = "ON"
                    document.getElementById("OfficeDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("Officelights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });

        //Updates UI with current state of the specified endpoint
        makeGetRequest(hueEndpoints.Bedroom,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("Bedroomlights").innerHTML = "ON"
                    document.getElementById("BedroomDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("Bedroomlights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });

        //Updates UI with current state of the specified endpoint
        makeGetRequest(hueEndpoints.wardrobeRoom,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("wardrobeRoomlights").innerHTML = "ON"
                    document.getElementById("wardrobeRoomDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("wardrobeRoomlights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });

        //Updates UI with current state of the specified endpoint
        makeGetRequest(hueEndpoints.livingRoom,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("livingRoomlights").innerHTML = "ON"
                    document.getElementById("livingRoomDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("livingRoomlights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });

        //Updates UI with current state of the specified endpoint
        makeGetRequest(hueEndpoints.FrontDoor,
            function (response) {
                // response
                if (response.state.all_on) {
                    document.getElementById("FrontDoorlights").innerHTML = "ON"
                    document.getElementById("FrontDoorDim").value = response.action.bri
                }
                else if (!response.state.all_on) {
                    document.getElementById("FrontDoorlights").innerHTML = "OFF"
                }
            }, function (error) {
                // error
            });
    }, 3000);

    $(".OfficeToggle").click(function () {
        if ($("#Officelights")['0'].textContent == "ON") {
            lightSwitch("Office", false)
            $("#Officelights")['0'].textContent = "OFF"
        }
        else if ($("#Officelights")['0'].textContent == "OFF") {
            lightSwitch("Office", true)
            $("#Officelights")['0'].textContent = "ON"
        }
    });

    $(".BedroomToggle").click(function () {
        if ($("#Bedroomlights")['0'].textContent == "ON") {
            lightSwitch("Bedroom", false)
            $("#Bedroomlights")['0'].textContent = "OFF"
        }
        else if ($("#Bedroomlights")['0'].textContent == "OFF") {
            lightSwitch("Bedroom", true)
            $("#Bedroomlights")['0'].textContent = "ON"
        }
    });

    $(".wardrobeRoomToggle").click(function () {
        if ($("#wardrobeRoomlights")['0'].textContent == "ON") {
            lightSwitch("wardrobeRoom", false)
            $("#wardrobeRoomlights")['0'].textContent = "OFF"
        }
        else if ($("#wardrobeRoomlights")['0'].textContent == "OFF") {
            lightSwitch("wardrobeRoom", true)
            $("#wardrobeRoomlights")['0'].textContent = "ON"
        }
    });
    
    $(".livingRoomToggle").click(function () {
        if ($("#livingRoomlights")['0'].textContent == "ON") {
            lightSwitch("livingRoom", false)
            $("#livingRoomlights")['0'].textContent = "OFF"
        }
        else if ($("#livingRoomlights")['0'].textContent == "OFF") {
            lightSwitch("livingRoom", true)
            $("#livingRoomlights")['0'].textContent = "ON"
        }
    });
    
    $(".FrontDoorToggle").click(function () {
        if ($("#FrontDoorlights")['0'].textContent == "ON") {
            lightSwitch("FrontDoor", false)
            $("#FrontDoorlights")['0'].textContent = "OFF"
        }
        else if ($("#FrontDoorlights")['0'].textContent == "OFF") {
            lightSwitch("FrontDoor", true)
            $("#FrontDoorlights")['0'].textContent = "ON"
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
