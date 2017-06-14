/* 
 * 
 * This project was developed by myself and in my 
 * own words staying within the range of what I have learned
 * throughout the module.
 * 
 * Module: Web Data with XML, JSON and AJAX 
 * creator: Federico Cocco
 * date: March 2016
 */

/*
 * When the DOM is ready and loaded, is possible to select from the counties_list
 * and then from a subsequent cities-list down-drop menu bar.
 * Then a function makeRequest() is recursevely called on the city selected.
 * API key and URL are fix set. 
 */



$(document).ready(function () {
    $('#counties_list').change(function () {
        var county = $('#counties_list option:selected').text();
        switch (county) {
            case 'England':
                $('#cities_list').load('england-cities.html');
                break;
            case 'Scotland':
                $('#cities_list').load('scotland-cities.html');
                break;
            case 'Wales':
                $('#cities_list').load('wales-cities.html');
                break;
            case 'North Ireland':
                $('#cities_list').load('nireland-cities.html');
                break;
            default:
        }
    }
    );
    $('#cities_list').change(function () {
        if ($('#cities_list option:selected').attr("value") !== undefined) {
            var city_id = $('#cities_list option:selected').attr("value");
            var apiKey = "a2caadba04afca2f4dc6d443b8f7a1ac";
            //handles the change of county while script is running
            if (city_id === undefined) {
                $('#info').html('<p>A city needs to be selected.</p>');
            } else {
                var url_api = "http://api.openweathermap.org/data/2.5/weather?id="
                        + city_id + "&APPID=" + apiKey;
                makeRequest(url_api);
            }
        }
    });
});
/*
 * This function recursevely perform an AJAX request retrieving data 
 * of a specific city. Then it updates the html with the new elements.
 * if an error occurs, it leaves a message.
 * 
 * @param url_request
 * 
 * makeRequest
 */

function makeRequest(url_request) {
    setTimeout(function () {
        //set ajax request
        $.ajax({
            url: url_request,
            type: 'GET',
            dataType: 'jsonp',
            success: function (response) {
               // console.log(JSON.stringify(response));
                $("#info").remove();
                $("#result").remove();
                var toDisplay = '';
                toDisplay = '<div id="result">' +
                        '<h3>Weather for ' +
                        response.name +
                        ' on ' +
                        date_conversion(response.dt) +
                        '</h3>' +
                        '<hr>' +
                        '<ul>' +
                        '</li>' +
                        '<li>Weather Conditions: ' +
                        response.weather[0].main +
                        '</li>' +
                        '<li>Temperature: ' +
                        temperature(response.main.temp) +
                        '</li>' +
                        '<li>Wind speed: ' +
                        speed(response.wind.speed) +
                        '</li>' +
                        '<li>Wind direction: ' +
                        direction(response.wind.deg) +
                        '</li>' +
                        '</ul>' +
                        '</div>';
                $(toDisplay).insertAfter("#menu");
                //if cities option is changed, stop all accumulated 
                //ajax queries and return.
                if ($('#cities_list').change()) {
                    return;
                }
                makeRequest(url_request);
            },
            error: function () {
                $("#result").remove();
                $('<div id="info"></div>').insertAfter("#menu");
                $('#info').html('<p>An error has occurred.</p>');
                return;
            }
        });
    }, 1000);
}
;
/*
 * type: function
 * This function convert a UNIX timestamp onto a correct dd/mm/yy format.
 * 
 * @param par
 * 
 * @return result
 * 
 * date_conversion
 */

var date_conversion = function (par) {
    var result = new Date(par * 1000);
    var day = result.getDate();
    var month = result.getMonth() + 1;
    var year = result.getFullYear();
    result = day + '-' + month + '-' + year;
    return result;
};
/*
 * type: function
 * This function returns a different string direction 
 * as the  wind's range of degree changes.
 * 
 * @param par
 * 
 * @return result
 * 
 * direction
 */

var direction = function (par) {
    var result;
    if (par >= 25 && par < 65) {
        result = 'North Easterly';
    }
    else if (par >= 65 && par < 115) {
        result = 'East';
    }
    else if (par >= 115 && par < 155) {
        result = 'South Easterly';
    }
    else if (par >= 155 && par < 205) {
        result = 'South';
    }
    else if (par >= 205 && par < 245) {
        result = 'South Westerly';
    }
    else if (par >= 245 && par < 295) {
        result = 'West';
    }
    else if (par >= 295 && par < 335) {
        result = 'North Westerly';
    }
    else {
        result = 'North';
    }
    return result;
};
/*
 * type: function
 * This function changes the temperature's format from kelvin to Celsius.
 * 
 * @param par
 * 
 * @return result
 * 
 * temperature
 */

var temperature = function (par) {
    var result;
    result = ((par - 273.15) * 1.000000).toFixed(2);
    result += '°C';
    return result;
};
/*
 * type: function
 * This function changes the speed's format from knobs to miles-per-hour.
 * 
 * @param par
 * 
 * @return result
 * 
 * speed
 */

var speed = function (par) {
    var result;
    result = (par / 0.868976241901).toFixed(0);
    result += ' mph';
    return result;
};

    