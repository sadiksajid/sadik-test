//HOME PAGE JS
var open_code = false;
var open_quartier = false;
var open_ville = false;

$(document).on("click", function () {
    if (open_code) {
        $("#CodpostalListO").hide();
        $("#s_CodpostalListO").hide();
        $("#CodepostalList").hide();
        $("#reg_CodepostalList").hide();
        open_code = false;
    } else if (open_quartier) {
        $("#QuartierListO").hide();
        $("#s_QuartierListO").hide();
        $("#QuartierList").hide();
        $("#reg_QuartierList").hide();
        open_quartier = false;
    } else if (open_ville) {
        $("#CityListO").hide();
        $("#s_CityListO").hide();
        $("#CityList").hide();
        $("#reg_CityList").hide();
        open_ville = false;
    }
});

// $('#order_with_register').on("click", function() {
//     if (open_code) {
//         $("#reg_CodepostalList").hide();
//         open_code = false;
//     } else if (open_quartier) {
//         $("#reg_QuartierList").hide();
//         open_quartier = false;
//     } else if (open_ville) {
//         $("#reg_CityList").hide();
//         open_ville = false;
//     }
// });

// $('#order_with_guest').on("click", function() {
//     if (open_code) {
//         $("#CodepostalList").hide();
//         open_code = false;
//     } else if (open_quartier) {
//         $("#QuartierList").hide();
//         open_quartier = false;
//     } else if (open_ville) {
//         $("#CityList").hide();
//         open_ville = false;
//     }
// });

// $('#orders').on("click", function() {
//     if (open_code) {
//         $("#CodpostalListO").hide();
//         $("#s_CodpostalListO").hide();
//         open_code = false;
//     } else if (open_quartier) {
//         $("#QuartierListO").hide();
//         $("#s_QuartierListO").hide();
//         open_quartier = false;
//     } else if (open_ville) {
//         $("#CityListO").hide();
//         $("#s_CityListO").hide();
//         open_ville = false;
//     }
// });


// /////////////////////// ORDER PAGE RECEIVER INFORMATIONS ///////////////////////////////////////////
$('#vilt').hide();
// receiver_maps(@js($s_longitude),@js($s_latitude));

// CODEPOSTAL AUTOCOMPLETE
// $(document).on("click", "#code_postalO", function() {
//     // $('html, body').animate({
//     //     scrollTop: $("#code_postalO").offset().top - 200
//     // }, 2000);
//     $.ajax({
//         url: "/getcodepostal",
//         success: function(data) {

//             $('#CodpostalListO').fadeIn();
//             $('#CodpostalListO').html(data);
//             open_code = true;
//         },

//     });

// });

$(document).on("keyup", "#code_postalO", function () {
    var query = $(this).val();
    if (query != '') {
        var _token = $('input[name="_token"]').val();
        $.ajax({
            url: "/getcodepostal",
            data: { query: query },
            success: function (data) {

                $('#CodpostalListO').fadeIn();
                $('#CodpostalListO').html(data);
                open_code = true;
            },

        });
    }
});

// POSTCODE SELECT

$(document).on("click", "#CodpostalListO li", function () {
    $('#code_postalO').val($(this).text());
    $('#CodpostalListO').fadeOut();
    var code = $(this).text(); //to get content of "value" attrib
    $.ajax({
        url: "/getcodepostalinfo",
        data: { code: code },
        dataType: 'JSON',

        success: function (response) {
            $('#vilt').show();
            // document.getElementById('quartieridO').value = response[0].quartier;
            // output = '<ul class="dropdown-menu" id="vil">'+ foreach (response['qua'] as row) {
            // +'<li>' row.quartier+'</li>';
            // }+'</ul>';
            var items = [];
            $('#vilt').html('');
            $.each(response, function (i, item) {
                items.push('<li data-quartieriddo=' + item.id + '>' + item.quartier + '</li>');
            }); // close each()
            $('#vilt').show();
            $('#vilt').append(items.join(''));
            document.getElementById('villeidO').value = response[0].ville;
            // document.getElementById('quartier_idO').value = response[0].id;
            document.getElementById('ville_idO').value = response[0].ville_id;
            Livewire.emit('saveCodeResponse', response[0].ville_id, response[0].ville, null, null, code);
        }
    });
});

// VILLE AUTOCOMPLETE
// $(document).on("click", "#villeidO", function() {
//     // $('html, body').animate({
//     //     scrollTop: $("#villeidO").offset().top - 200
//     // }, 2000);
//     $.ajax({
//         url: "/getville",

//         success: function(data) {
//             $('#CityListO').fadeIn();
//             $('#CityListO').html(data);
//             open_ville = true;
//         }
//     });

// });
$(document).on("keyup", "#villeidO", function () {

    var query = $(this).val();
    if (query != '') {
        $.ajax({
            url: "/getville",

            data: { query: query },
            success: function (data) {
                $('#CityListO').fadeIn();
                $('#CityListO').html(data);
                open_ville = true;
            }
        });
    }
});

// VILLE SELECT
$(document).on("click", "#CityListO li", function () {
    var iid = $(this).attr("data-id");
    $('#villeidO').val($(this).text());
    $('#CityListO').fadeOut();

    var code = $(this).text(); //to get content of "value" attrib
    $.ajax({
        url: "/getvilleinfo",
        data: { code: code },

        success: function (response) {
            $('#vilt').show();
            document.getElementById('quartieridO').value = response[0].quartier;
            document.getElementById('code_postalO').value = response[0].code_postal;
            // document.getElementById('quartier_idO').value = response[0].id;
            document.getElementById('ville_idO').value = response[0].ville_id;
            $('#vilt').html('');
            var villeitems = [];
            $.each(response, function (i, item) {
                villeitems.push('<li data-quartieriddo=' + item.id + '>' + item.quartier + '</li>');
            }); // close each()

            $('#vilt').append(villeitems.join(''));

            Livewire.emit('saveVilleResponse', response[0].ville_id, response[0].code_postal, null, null, code);
        }
    });
});

//QUARTIERS AUTOCOMPLETE
// $(document).on("click", "#quartieridO", function() {
//     // $('html, body').animate({
//     //     scrollTop: $("#quartieridO").offset().top - 200
//     // }, 2000);
//     $.ajax({
//         url: "/getquartierO",

//         success: function(data) {
//             $('#QuartierListO').fadeIn();
//             $('#QuartierListO').html(data);
//             open_quartier = true;
//         }
//     });

// });



$(document).on("keyup", "#quartieridO", function () {
    var query = $(this).val();
    if (query != '') {
        $.ajax({
            url: "/getquartierO",

            data: { query: query },
            success: function (data) {
                $('#QuartierListO').fadeIn();
                $('#QuartierListO').html(data);
                open_quartier = true;
            }
        });
        Livewire.emit('resetQuartierid');
    }
});
$(document).on("click", "#QuartierListO li", function () {
    var iid = $(this).attr("data-quartieriddo");

    $('#quartieridO').val($(this).text());
    var qu = $('#quartieridO').val()
    var code = iid; //to get content of "value" attrib
    $.ajax({
        url: "/getquartierinfo",
        data: { code: code },

        success: function (response) {
            document.getElementById('villeidO').value = response[0].ville;
            document.getElementById('code_postalO').value = response[0].code_postal;
            document.getElementById('quartier_idO').value = response[0].id;
            document.getElementById('ville_idO').value = response[0].ville_id;
            $('#vilt').hide();
            Livewire.emit('saveQuartierResponse', response[0].ville_id, response[0].ville, response[0].id, response[0].code_postal, qu);

        }
    });
});

// ORDER PAGE SENDER INFORMATIONS
$('#s_vilt').hide();
// CODEPOSTAL AUTOCOMPLETE
// $(document).on("click", "#s_code_postalO", function() {
//     // $('html, body').animate({
//     //     scrollTop: $("#s_code_postalO").offset().top - 200
//     // }, 2000);
//     $.ajax({
//         url: "/getcodepostal",

//         success: function(data) {
//             $('#s_CodpostalListO').fadeIn();
//             $('#s_CodpostalListO').html(data);
//             open_code = true;
//         }
//     });

// });
$(document).on("keyup", "#s_code_postalO", function () {
    var query = $(this).val();
    if (query != '') {
        var _token = $('input[name="_token"]').val();
        $.ajax({
            url: "/getcodepostal",

            data: { query: query },
            success: function (data) {
                $('#s_CodpostalListO').fadeIn();
                $('#s_CodpostalListO').html(data);
                open_code = true;
            }
        });
    }
});
$(document).on("click", "#s_CodpostalListO li", function () {
    $('#s_code_postalO').val($(this).text());
    $('#s_CodpostalListO').fadeOut();
    var code = $(this).text(); //to get content of "value" attrib
    $.ajax({
        url: "/getcodepostalinfo",
        data: { code: code },
        dataType: 'JSON',
        success: function (response) {
            $('#s_vilt').show();
            document.getElementById('s_quartieridO').value = response[0].quartier;
            // output = '<ul class="dropdown-menu" id="vil">'+ foreach (response['qua'] as row) {
            // +'<li>' row.quartier+'</li>';
            // }+'</ul>';

            var items = [];
            $('#s_vilt').html('');
            $.each(response, function (i, item) {
                items.push('<li data-squartieriddo=' + item.id + '>' + item.quartier + '</li>');
            }); // close each()
            $('#s_vilt').show();
            $('#s_vilt').append(items.join(''));
            document.getElementById('s_villeidO').value = response[0].ville;
            // document.getElementById('s_quartier_idO').value = response[0].id;
            document.getElementById('s_ville_idO').value = response[0].ville_id;
            Livewire.emit('ssaveCodeResponse', response[0].ville_id, response[0].ville, null, null, code);
        }
    });
});



// VILLE AUTOCOMPLETE
// $(document).on("click", "#s_villeidO", function() {
//     // $('html, body').animate({
//     //     scrollTop: $("#s_villeidO").offset().top - 200
//     // }, 2000);
//     $.ajax({
//         url: "/getville",
//         success: function(data) {
//             $('#s_CityListO').fadeIn();
//             $('#s_CityListO').html(data);
//             open_ville = true;
//         }
//     });

// });
$(document).on("keyup", "#s_villeidO", function () {
    var query = $(this).val();
    if (query != '') {
        $.ajax({
            url: "/getville",
            data: { query: query },
            success: function (data) {
                $('#s_CityListO').fadeIn();
                $('#s_CityListO').html(data);
                open_ville = true;
            }
        });
    }
});
$(document).on("click", "#s_CityListO li", function () {
    var iid = $(this).attr("data-id");
    $('#s_villeidO').val($(this).text());
    $('#s_CityListO').fadeOut();

    var code = $(this).text(); //to get content of "value" attrib
    $.ajax({
        url: "/getvilleinfo",
        data: { code: code },
        success: function (response) {
            $('#s_vilt').show();
            document.getElementById('s_quartieridO').value = response[0].quartier;
            document.getElementById('s_code_postalO').value = response[0].code_postal;
            // document.getElementById('s_quartier_idO').value = response[0].id;
            document.getElementById('s_ville_idO').value = response[0].ville_id;
            $('#s_vilt').html('');
            var villeitems = [];
            $.each(response, function (i, item) {
                villeitems.push('<li data-squartieriddo=' + item.id + '>' + item.quartier + '</li>');
            }); // close each()

            $('#s_vilt').append(villeitems.join(''));

            Livewire.emit('ssaveVilleResponse', response[0].ville_id, response[0].code_postal, null, null, code);
        }
    });
});


//QUARTIERS AUTOCOMPLETE
// $(document).on("click", "#s_quartieridO", function() {
//     // $('html, body').animate({
//     //     scrollTop: $("#s_quartieridO").offset().top - 200
//     // }, 2000);
//     $.ajax({
//         url: "/sgetquartierO",
//         success: function(data) {
//             $('#s_QuartierListO').fadeIn();
//             $('#s_QuartierListO').html(data);
//             open_quartier = true;
//         }
//     });

// });
$(document).on("keyup", "#s_quartieridO", function () {
    var query = $(this).val();
    if (query != '') {
        $.ajax({
            url: "/sgetquartierO",
            data: { query: query },
            success: function (data) {
                $('#s_QuartierListO').fadeIn();
                $('#s_QuartierListO').html(data);
                open_quartier = true;
            }
        });
        Livewire.emit('resetsenderQuartierid');
    }
});
//QUARTIERS SELECT
$(document).on("click", "#s_QuartierListO li", function () {
    var iid = $(this).attr("data-squartieriddo");

    $('#s_quartieridO').val($(this).text());
    var qu = $('#s_quartieridO').val();
    var code = iid; //to get content of "value" attrib
    $.ajax({
        url: "/getquartierinfo",
        data: { code: code },
        success: function (response) {
            document.getElementById('s_villeidO').value = response[0].ville;
            document.getElementById('s_code_postalO').value = response[0].code_postal;
            document.getElementById('s_quartier_idO').value = response[0].id;
            document.getElementById('s_ville_idO').value = response[0].ville_id;
            $('#s_vilt').hide();
            Livewire.emit('ssaveQuartierResponse', response[0].ville_id, response[0].ville, response[0].id, response[0].code_postal, qu);
        }
    });
});

















//////////////////////////////////////////  // CODEPOSTAL AUTOCOMPLETE sadik part
// /////////////////////////////////////// HOME PAGE GEUST ///////////////////////////////////////
// $(document).on("click", "#code_postal", function() {
//     $('html, body').animate({
//         scrollTop: $("#code_postal").offset().top - 200
//     }, 2000);
//     $.ajax({
//         url: "/getcodepostal",
//         success: function(data) {
//             $('#CodepostalList').fadeIn();
//             $('#CodepostalList').html(data);
//             open_code = true;


//         }
//     });
// });
$(document).on("keyup", "#code_postal", function () {
    var query = $(this).val();
    if (query != '') {
        var _token = $('input[name="_token"]').val();
        $.ajax({
            url: "/getcodepostal",
            data: { query: query },
            success: function (data) {

                $('#CodepostalList').fadeIn();
                $('#CodepostalList').html(data);
                open_code = true;


            }
        });
    }
});
$(document).on("click", "#CodepostalList li", function () {
    $('#code_postal').val($(this).text());
    $('#CodepostalList').fadeOut();
    var code = $(this).text(); //to get content of "value" attrib
    $.ajax({
        url: "/getcodepostalinfo",
        data: { code: code },
        dataType: 'JSON',
        success: function (response) {
            $('#vilt').show();
            var items = [];
            $('#vilt').html('');
            $.each(response, function (i, item) {
                items.push('<li data-quartierid=' + item.id + '>' + item.quartier + '</li>');
            }); // close each()
            $('#vilt').show();
            $('#vilt').append(items.join(''));
            document.getElementById('villeid').value = response[0].ville;
            // document.getElementById('quartier_id').value = response[0].id;
            document.getElementById('ville_id').value = response[0].ville_id;
            Livewire.emit('saveCodeResponse', response[0].ville_id, response[0].ville, response[0].id, response[0].quartier, code);
        }
    });
});



// $(document).on("click", "#villeid", function() {
//     $('html, body').animate({
//         scrollTop: $("#villeid").offset().top - 200
//     }, 2000);
//     $.ajax({
//         url: "/getville",
//         success: function(data) {
//             $('#CityList').fadeIn();
//             $('#CityList').html(data);
//             open_ville = true;
//         }
//     });
// });
$(document).on("keyup", "#villeid", function () {

    var query = $(this).val();
    if (query != '') {
        $.ajax({
            url: "/getville",
            data: { query: query },
            success: function (data) {
                $('#CityList').fadeIn();
                $('#CityList').html(data);
                open_ville = true;
            }
        });
    }
});
$(document).on("click", "#CityList li", function () {

    var iid = $(this).attr("data-id");
    $('#villeid').val($(this).text());
    $('#CityList').fadeOut();

    var code = $(this).text(); //to get content of "value" attrib
    $.ajax({
        url: "/getvilleinfo",
        data: { code: code },
        success: function (response) {
            $('#vilt').show();
            // document.getElementById('quartierid').value = response[0].quartier;
            document.getElementById('code_postal').value = response[0].code_postal;
            // document.getElementById('quartier_id').value = response[0].id;
            document.getElementById('ville_id').value = response[0].ville_id;
            $('#vilt').html('');
            var villeitems = [];
            $.each(response, function (i, item) {
                villeitems.push('<li data-quartierid=' + item.id + '>' + item.quartier + '</li>');
            }); // close each()

            $('#vilt').append(villeitems.join(''));
            Livewire.emit('saveVilleResponse', response[0].ville_id, response[0].code_postal, response[0].id, response[0].quartier, code);

        }
    });
});


// $(document).on("click", "#quartierid", function() {
//     $('html, body').animate({
//         scrollTop: $("#quartierid").offset().top - 200
//     }, 2000);
//     $.ajax({
//         url: "/getquartier",
//         success: function(data) {
//             $('#QuartierList').fadeIn();
//             $('#QuartierList').html(data);
//             open_quartier = true;
//         }
//     });
// });
$(document).on("keyup", "#quartierid", function () {

    var query = $(this).val();
    if (query != '') {
        $.ajax({
            url: "/getquartier",
            data: { query: query },
            success: function (data) {
                $('#QuartierList').fadeIn();
                $('#QuartierList').html(data);
                open_quartier = true;
            }
        });
        document.getElementById('quartier_id').value = null;

    }
});
$(document).on("click", "#QuartierList li", function () {

    var iid = $(this).attr("data-quartierid");
    $('#quartierid').val($(this).text())
    var code = iid; //to get content of "value" attrib
    var q_text = $(this).text();
    $.ajax({
        url: "/getquartierinfo",
        data: { code: code },
        success: function (response) {
            document.getElementById('villeid').value = response[0].ville;
            document.getElementById('code_postal').value = response[0].code_postal;
            document.getElementById('quartier_id').value = response[0].id;
            document.getElementById('ville_id').value = response[0].ville_id;
            $('#vilt').hide();
            Livewire.emit('saveQuartierResponse', response[0].ville_id, response[0].ville, response[0].id, response[0].code_postal, q_text);

        }
    });
});






// /////////////////////////////////////// REGISTER START ///////////////////////////////////////


// POSTCODE AUTOCOMPLETE
$(document).ready(function () {
    $('#reg_vilt').hide();
    // CODEPOSTAL AUTOCOMPLETE

    // $(document).on("click", "#reg_code_postal", function() {
    //     $('html, body').animate({
    //         scrollTop: $("#reg_code_postal").offset().top - 200
    //     }, 2000);
    //     $.ajax({
    //         url: "/getcodepostal",
    //         success: function(data) {
    //             $('#reg_CodepostalList').fadeIn();
    //             $('#reg_CodepostalList').html(data);
    //             open_code = true;
    //         }
    //     });

    // });
    $(document).on("keyup", "#reg_code_postal", function () {
        var query = $(this).val();
        if (query != '') {
            var _token = $('input[name="_token"]').val();
            $.ajax({
                url: "/getcodepostal",
                data: { query: query },
                success: function (data) {
                    $('#reg_CodepostalList').fadeIn();
                    $('#reg_CodepostalList').html(data);
                    open_code = true;
                }
            });
        }
    });

    // POSTCODE SELECT
    $(document).on("click", "#reg_CodepostalList li", function () {
        $('#reg_code_postal').val($(this).text());
        $('#reg_CodepostalList').fadeOut();
        var code = $(this).text(); //to get content of "value" attrib
        $.ajax({
            url: "/getcodepostalinfo",
            data: { code: code },
            dataType: 'JSON',
            success: function (response) {
                $('#reg_vilt').show();
                // document.getElementById('reg_quartierid').value = response[0].quartier;
                // output = '<ul class="dropdown-menu" id="vil">'+ foreach (response['qua'] as row) {
                // +'<li>' row.quartier+'</li>';
                // }+'</ul>';

                var items = [];
                $('#reg_vilt').html('');
                $.each(response, function (i, item) {
                    items.push('<li data-regquartierid=' + item.id + '>' + item.quartier + '</li>');
                }); // close each()
                $('#reg_vilt').show();
                $('#reg_vilt').append(items.join(''));
                document.getElementById('reg_villeid').value = response[0].ville;
                // document.getElementById('reg_quartier_id').value = response[0].id;
                document.getElementById('reg_ville_id').value = response[0].ville_id;
                Livewire.emit('saveCodeResponse', response[0].ville_id, response[0].ville, response[0].id, response[0].quartier, code);
            }
        });
    });
    // VILLE AUTOCOMPLETE
    // $(document).on("click", "#reg_villeid", function() {
    //     $('html, body').animate({
    //         scrollTop: $("#reg_villeid").offset().top - 200
    //     }, 2000);
    //     $.ajax({
    //         url: "/getville",
    //         success: function(data) {
    //             $('#reg_CityList').fadeIn();
    //             $('#reg_CityList').html(data);
    //             open_ville = true;
    //         }
    //     });

    // });
    $(document).on("keyup", "#reg_villeid", function () {
        var query = $(this).val();
        if (query != '') {
            $.ajax({
                url: "/getville",
                data: { query: query },
                success: function (data) {
                    $('#reg_CityList').fadeIn();
                    $('#reg_CityList').html(data);
                    open_ville = true;
                }
            });
        }
    });
    // VILLE SELECT
    $(document).on("click", "#reg_CityList li", function () {
        var iid = $(this).attr("data-id");
        $('#reg_villeid').val($(this).text());
        $('#reg_CityList').fadeOut();

        var code = $(this).text(); //to get content of "value" attrib
        $.ajax({
            url: "/getvilleinfo",
            data: { code: code },
            success: function (response) {
                $('#reg_vilt').show();
                // document.getElementById('reg_quartierid').value = response[0].quartier;
                document.getElementById('reg_code_postal').value = response[0].code_postal;
                // document.getElementById('reg_quartier_id').value = response[0].id;
                document.getElementById('reg_ville_id').value = response[0].ville_id;
                $('#reg_vilt').html('');
                var villeitems = [];
                $.each(response, function (i, item) {
                    villeitems.push('<li data-regquartierid=' + item.id + '>' + item.quartier + '</li>');
                }); // close each()

                $('#reg_vilt').append(villeitems.join(''));
                Livewire.emit('saveVilleResponse', response[0].ville_id, response[0].code_postal, response[0].id, response[0].quartier, code);

            }
        });
    });
    //QUARTIERS AUTOCOMPLETE
    //QUARTIERS AUTOCOMPLETE

    // $(document).on("click", "#reg_quartierid", function() {
    //     $('html, body').animate({
    //         scrollTop: $("#reg_quartierid").offset().top - 200
    //     }, 2000);
    //     $.ajax({
    //         url: "/reggetquartier",
    //         success: function(data) {
    //             $('#reg_QuartierList').fadeIn();
    //             $('#reg_QuartierList').html(data);
    //             open_quartier = true;
    //         }
    //     });

    // });
    $(document).on("keyup", "#reg_quartierid", function () {
        var query = $(this).val();

        if (query != '') {
            $.ajax({
                url: "/reggetquartier",
                data: { query: query },
                success: function (data) {
                    $('#reg_QuartierList').fadeIn();
                    $('#reg_QuartierList').html(data);
                    open_quartier = true;
                }
            });
            document.getElementById('reg_quartier_id').value = null;

        }
    });

    //QUARTIERS SELECT
    $(document).on("click", "#reg_QuartierList li", function () {
        var iid = $(this).attr("data-regquartierid");

        $('#reg_quartierid').val($(this).text());
        var code = iid; //to get content of "value" attrib
        var q_text = $(this).text();
        $.ajax({
            url: "/getquartierinfo",
            data: { code: code },
            success: function (response) {
                document.getElementById('reg_villeid').value = response[0].ville;
                document.getElementById('reg_code_postal').value = response[0].code_postal;
                document.getElementById('reg_quartier_id').value = response[0].id;
                document.getElementById('reg_ville_id').value = response[0].ville_id;
                $('#reg_vilt').hide();
                // SAVE INPUT INFORMATION TO LIVEWIRE BECOUSE WE LOST THEM WHENE RENDER EXECUT
                Livewire.emit('saveQuartierResponse', response[0].ville_id, response[0].ville, response[0].id, response[0].code_postal, q_text);

            }
        });
    });
});

function goSend(id) {
    $('html, body').animate({
        scrollTop: $("#" + id).offset().top
    }, 2000);

    let isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

    if (isMobile) {
        $('#menu').modal('toggle');
    }
}

// Express Page JS
// function showreg() {
//     var buttonreg = document.getElementById("btnreg");
//     buttonreg.classList.toggle("login_on");

//     var x = document.getElementById("registration");
//     var y = document.getElementById("guest");

//     if (x.style.display === "none") {
//         x.style.display = "block";
//         y.style.display = "none";
//     } else {
//         x.style.display = "none";
//         y.style.display = "block";
//     }
// }


// function sender_geust(x = 1) {

//     $(document).ready(function() {
//         $.ajax({
//             url: "/locale_reg/" + x,
//             type: "GET",
//             success: function(data) {
//                 $("#showdata").html(data);
//                 sender_maps();
//             },
//             // beforeSend: function() {
//             //     $("body").addClass("loading");
//             // },
//             // complete: function() {
//             //     $("body").removeClass("loading");
//             // }
//         });
//     });
// }

// x = 1;
// $("#btnreg").click(function() {
//     if (x % 2 == 1) {
//         var y = 1;
//     } else {
//         var y = 0;
//     }
//     x++;

//     $.ajax({
//         url: "/locale_reg/" + y,
//         type: "GET",
//         success: function(data) {
//             $("#showdata").html(data);
//             sender_maps();

//         },
//         beforeSend: function() {
//             $("body").addClass("loading");
//         },
//         complete: function() {
//             $("body").removeClass("loading");
//         }

//     });
// });



// $(window).on('load', function() {
//     var m = document.getElementById("newAddress");
//     var x = document.getElementById("registration");

//     if (x != null) {
//         x.style.display = "none";
//     }
//     m.style.display = "none";

// });
$(document).on('click', '#guestmap', function () {
    sender_maps();
});

function shownew() {
    var m = document.getElementById("newAddress");
    var s = document.getElementById("sender_adresses");
    if (m.style.display === "none") {

        if (s != null) {
            s.style.display = "none";
        }
        m.style.display = "inline-flex";
        sender_maps();
        map.invalidateSize();
    } else {
        if (s != null) {
            s.style.display = "inline-flex";
        }
        m.style.display = "none";
        // map.invalidateSize();
    }
}


function shownewR() {
    var r = document.getElementById("newRAddress");
    if (r.style.display === "none") {
        r.style.display = "inline-flex";
        document.getElementById("receiver_adresses").style.display = "none";

        sla = sessionStorage.getItem("sla")
        slo = sessionStorage.getItem("slo")
        if (document.getElementById("mapreceiverdiv") == null) {
            document.getElementById("reciver_div_add").innerHTML = '<div id="mapreceiverdiv"></div>';
        }
        receiver_maps(slo, sla);
    } else {
        r.style.display = "none";
        document.getElementById("receiver_adresses").style.display = "inline-flex";

    }
}

$(document).on('click', '#showOld', function () {
    $('#oldAddress').show();
    $('#newAddress').hide();
});

$(document).on('click', '#showNew', function () {
    $('#oldAddress').hide();
    $('#newAddress').show();
});

function showMap() {
    var x = document.getElementById("bigMap");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        if (x != null) {
            x.style.display = "none";
        }
    }
}

// VILLE AUTOCOMPLETE
// $(document).on("click", "#Register_btn", function() {
//     sender_maps();
//     setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);

//     // map.invalidateSize();
// });

// $(document).on("click", "#Guest_btn", function() {
//     guest_maps();
//     setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);

//     // map.invalidateSize();
// });
