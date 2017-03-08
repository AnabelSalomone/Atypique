$(document).ready(function () {



    //Scrolling function
    $('.scroll').on('click', function () {
        var page = $(this).attr('href');
        var speed = 750; // 
        $('html, body').animate({
            scrollTop: $(page).offset().top - 50
        }, speed);
    });




    //Change navbar color
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#nav-style').css('background-color', 'white');
        } else {
            $('#nav-style').css('background-color', 'transparent');
        }
    });




    //Geolocalisation
    //Si el navegador tiene geolocalizacion



    if (navigator.geolocation) {

        var long = "";
        var lat = "";



        $('#geolocalisation').click(function () {
            //Obtiene las coordenadas
            navigator.geolocation.getCurrentPosition(function (position) {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                //agrega las coordenadas al API
                var api = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&key=%20AIzaSyC9QJ4CgB2AOSuIOdsqwom-lIPx893U8H8'

                //Obtiene el objeto a partir de la API dada
                $.getJSON(api, function (data) {
                    let nomVille = data.results[0].address_components[2].long_name; // Agrega el nombre de la ciudad al HTML

                    let nomVilles = ['Lyon', 'Bordeaux', 'Toulouse', 'La Loupe', ''];

                    if (nomVilles.includes(nomVille)) {
                        $("#city").html('"Les Restaurants atypiques" de ' + nomVille + '<br> vous souhaitent la bienvenue ');
                    }
                });
            });
            //} else {
            //  $('#city').html('Nous n\'avons pas réussi à vous trouver' ou phrase pour devenir franchisé);
        });
    };


    // modal popUp restaurants section
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').focus()
    })

    $('#yourElement').addClass('animated bounceOutLeft');


});


