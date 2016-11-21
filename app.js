jQuery(document).ready(function ($) {

    var api = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=';


    //init google api autocomplete
    function initializeAutocomplete() {

        var  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('autocompleteMap')));


    }
    google.maps.event.addDomListener(window, 'load', initializeAutocomplete);

    //loader functions
    setTimeout(removeLoader,2000);
    function removeLoader(){
        $(".se-pre-con").addClass('remove-icon-show');
    }
    function addLoader(){
        $(".se-pre-con").removeClass('remove-icon-show');
    }

    //ajax call ,append json data
    function connect(url){
        $.getJSON(url, function(data) {
            for(var i = 0; i < data.list.length; i++) {
                var obj = data.list[i];
                var date = new Date(obj.dt*1000);
                var showdate = date.toDateString();
                var res = showdate.substring(0, 3);
                var tempIntegerMax = parseInt( obj.temp.max , 10);
                var tempIntegerMin = parseInt( obj.temp.min , 10);
                if ( i === 0 ) {
                    $(".container .first-row").append('<div class="today"> <h1>Today</h1>  <span class="city">  ' + data.city.name + ',' + data.city.country + '</span>'  + '<img src="http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png " />'+ '<span class="max">' + tempIntegerMax  + ' &#8451</span>'  + ' <span class="min">' + tempIntegerMin + ' &#8451</span>' +  '</div>');
                }else{
                    $(".container .second-row").append('<div class="single-day"> ' + '<h1>' + res   + '</h1>' + '<img src="http://openweathermap.org/img/w/' + obj.weather[0].icon + '.png " />'+ '<span class="max"> '  + tempIntegerMax  + ' &#8451</span>'  + ' <span class="min">' + tempIntegerMin + ' &#8451</span>' +  '</div>');
                }

            }
        })
    }


    //get your location function
    function geoLocation(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
        //Get the latitude and the longitude;
        function successFunction(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            codeLatLng(lat, lng)
        }

        function errorFunction(){
            alert("Geocoder failed");
        }

        function codeLatLng(lat, lng) {
            var lat = lat;
            var lng = lng;
            var key = '&units=metric&cnt=6&appid=341e115808d9c5c4953d759562b73015';
            var fullname = api + lat + '&lon=' + lng + key;
            var newObject = new connect(fullname);
        }

    }


    //EVENT HANDLERS

    //get your location
    $('#search').on('click', function(){

        clickFunctions();
        geoLocation();
        $("#autocompleteMap").val('');
        $('.show-template').toggleClass( 'index' );

    } );


    $("#ButtonForm").click(function(){

        clickFunctions();
        $('.show-template').toggleClass( 'index' );
        var getValue = $('.countryInput').val();
        var api = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
        var key = '&units=metric&cnt=6&appid=341e115808d9c5c4953d759562b73015';
        var city = getValue;
        var url = api + city + key;
        var newObject = new connect(url);

    });

    $('.header-top').on('click',function(){

        clickFunctions();
        $("#autocompleteMap").val('');
        $('.header').toggleClass( 'show' );
        if(  $('.show-template').hasClass('index') ){
             $('.show-template').toggleClass( 'index' );
        }
        $('.hamburger').toggleClass( 'is-active' );

    });

    $('.umbrella').on('click',function(){

        clickFunctions();
        $("#autocompleteMap").val('');
        if(  $('.show-template').hasClass('index') ){
            $('.show-template').toggleClass( 'index' );
        }

    });

    $('.hamburger').on('click',function(e){

        $( this ).toggleClass( 'is-active' );
        $('.header').toggleClass( 'show' );
        e.preventDefault();

    });

    //check if input is empty disable button
    $('#ButtonForm').attr('disabled',true);
    $('input').keyup(function(){
        if($(this).val().length !=0){
            $('#ButtonForm').attr('disabled', false);
            $('#ButtonForm').css("opacity","1");
        }
        else{
            $('#ButtonForm').attr('disabled',true);
            $('#ButtonForm').css("opacity","0.5");
        }

    })

    //dry function
    function clickFunctions(){
        addLoader();
        setTimeout(removeLoader,2000);
        $(".container .first-row ,.container .second-row").empty();
    }


})


