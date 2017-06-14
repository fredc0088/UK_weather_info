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
 * This function recursevely perform an AJAX request retrieving data 
 * of a specific city. Then it updates the html with the new elements.
 * if an error occurs, it leaves a message.
 *  
 * 
 * updateWeatherSummaryUK
 */

$(window).ready(function () {
    (function updateWeatherSummaryUK() {
        setTimeout(function () {
            //AJAX request
            $.ajax({
                url: 'weather.json',
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    var toDisplay = '';
                    //empties the html element selected ensuring new data overwrite the old ones
                    $('#cities_list').html('');
                    //insert table head
                    toDisplay = '<thead><tr>\n\
                            <th>City</th>\n\
                            <th>Conditions</th>\n\
                            <th>Temperature</th>\n\
                            <th>Wind Speed</th>\n\
                            <th>Wind Direction</th>\n\
                            <th>Wind Chill Factor</th></tr></thead>';
                    toDisplay += '<tbody> ';
                    //for each approach to append data searched 
                    $.each(response.report, function (index) {
                        toDisplay += '<tr><td>' + response.report[index].city.city_name +
                                '</td><td>' + response.report[index].current_conditions
                                + '</td><td>' + response.report[index].temperature + 'C°'
                                + '</td><td>' + response.report[index].wind.wind_speed + 'mph'
                                + '</td><td>' + response.report[index].wind.wind_direction
                                + '</td><td>' + response.report[index].wind.wind_chill_factor
                                + '</tr></td>';
                    });
                    toDisplay += '</tbody>';
                    $('#cities_list').append(toDisplay);
                    //recursion
                    updateWeatherSummaryUK();
                },
                error: function () {
                    $('#info').html('<p>An error has occurred</p>');
                }
            });
        }, 100);
    })();
});






      