$(document).ready(function () {



    //Scrolling function
    $('.scroll').on('click', function () {
        var page = $(this).attr('href');
        var speed = 750; // 
        $('html, body').animate({
            scrollTop: $(page).offset().top - 80
        }, speed);
    });




    //Change navbar color
    $(window).scroll(function () {
        if ($(this).scrollTop() > 575) {
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

    // page devenir franchisé
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            first_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
            last_name: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your phone number'
                    },
                    phone: {
                        country: 'US',
                        message: 'Please supply a vaild phone number with area code'
                    }
                }
            },
            address: {
                validators: {
                    stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            city: {
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: 'Please select your state'
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                    zipCode: {
                        country: 'US',
                        message: 'Please supply a vaild zip code'
                    }
                }
            },
            comment: {
                validators: {
                    stringLength: {
                        min: 10,
                        max: 200,
                        message: 'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                }
            }
        }
    })
        .on('success.form.bv', function (e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function (result) {
                console.log(result);
            }, 'json');
        });
});


