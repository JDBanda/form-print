$(function () {
    var cont = 0;
    var current;
    //Print screen data
    $('#printer').click(function () {
        window.print();
    });

    //Activate/Deactivate modal
    $('.experience').click(function () {
        $('#save-changes').show();
        $('#edit-data').hide();
        $('.modal').toggleClass("is-active");
        //Remove input data
        removeInputs();
        deleteCont();
        edit();
    });

    //Save changes and put info into principal page
    $('#save-changes').click(function () {
        $('.cont').append(generateTemplate());
        //Remove input data
        removeInputs();
        deleteCont();
        edit();
    });

    //Remove box-data
    function deleteCont() {
        $('.is-danger').click(function () {
            $(this).parent().remove();
        });
    }

    //Edit box-data
    function edit() {
        $('.is-primary').click(function () {
            $('#save-changes').hide();
            $('#edit-data').show();
            $('.modal').addClass("is-active");
            //Bind modal data from page data
            var data = $(this).parent();
            $('#input-employeer').val($(data).find('.p-employeer').text());
            $('#input-phone').val($(data).find('.p-phone').text());
            $('#input-address').val($(data).find('.p-address').text());
            //Dates 
            $('#input-date-from').val($(data).find('.p-date-from').text());
            $('#input-date-to').val($(data).find('.p-date-to').text());
            //Numeric data
            $('#input-amount-straight').val($(data).find('.p-amount-straight').text());
            $('#input-amount-tractor').val($(data).find('.p-amount-tractor').text());
            $('#input-amount-dump').val($(data).find('.p-amount-dump').text());
            $('#input-driving-log').val($(data).find('.p-driving-log').text());
            $('#input-driving-service').val($(data).find('.p-driving-service').text());
            $('#input-driving-other').val($(data).find('.p-driving-other').text());
            //Checks, llega en un arreglo o algo así y se recorre hasta llenar todos los checks e input
            textToChecks();
            //Radio
            $('input:radio[name="radius-use"][value="' + $(data).find('.p-radius').text() + '"]').prop('checked', true);
            $('#input-period-accident').val($(data).find('.p-period-accident').text());
            current = $(data).attr('id');
            console.log(current);
        })
    }

    $('#edit-data').click(function () {
        //Guardar datos, similar al método de generar la plantilla
        var data = $('#' + current);
        $(data).find('.p-employeer').text($('#input-employeer').val());
        $(data).find('.p-phone').text($('#input-phone').val());
        $(data).find('.p-address').text($('#input-address').val());
        //Dates 
        $(data).find('.p-date-from').text($('#input-date-from').val());
        $(data).find('.p-date-to').text($('#input-date-to').val());
        //Numeric data
        $(data).find('.p-amount-straight').text($('#input-amount-straight').val());
        $(data).find('.p-amount-tractor').text($('#input-amount-tractor').val());
        $(data).find('.p-amount-dump').text($('#input-amount-dump').val());
        $(data).find('.p-driving-log').text($('#input-driving-log').val());
        $(data).find('.p-driving-service').text($('#input-driving-service').val());
        $(data).find('.p-driving-other').text($('#input-driving-other').val());
        $(data).find('.p-type').text(recoverChecks());
        $(data).find('.p-other').text(recoverOther());
        $(data).find('p-radius').text($('input:radio[name="radius-use"]:checked'));
        $(data).find('.p-period-accident').text($('#input-period-accident').val());
        //Remove input data
        removeInputs();
    });

    //Recover checked data and other
    function recoverChecks() {
        var data = "";
        //Search for all values checked and obtain it
        $('input[name="type-driving"]').each(function () {
            if ($(this).is(':checked')) {
                data += $(this).val() + ',';
            }
        });
        return data;
    }

    function recoverOther() {
        data = "";
        data = $('#type-driving-other').val();
        return data;
    }

    function removeInputs() {
        $('input').val("");
        $('input[type=checkbox]').each(function () {
            this.checked = false;
        });
        $('input[type=radio]').each(function () {
            this.checked = false;
        });
        //Restore check values
        for (let i = 1; i < 5; i++) {
            $('#type-' + i).val($('#type-' + i).parent().attr('data'));
        }
        //Restore radio values
        for (let i = 1; i < 5; i++) {
            $('#radius-' + i).val($('#radius-' + i).parent().text());
        }
    }

    function textToChecks() {
        var a = $('.p-type').text().split(",");
        for (let i = 0; i < a.length; i++) {
            $('input:checkbox[value="' + a[i] + '"]').prop('checked', true);
        }
        $('#type-driving-other').val($('.p-other').text());
    }

    function generateTemplate() {
        var template = '<div id="' + cont + '" class="data-box">';
        template += '<button class="button is-danger is-rounded">Delete</button>' +
            '<button class="button is-primary is-rounded">Edit</button>' +
            '<p><strong>Employeer: </strong><span class="p-employeer">' + $('#input-employeer').val() + ' </span><strong> Phone: </strong><span class="p-phone">' + $('#input-phone').val() + ' </span></p>' +
            '<p><strong>Address: </strong><span class="p-address">' + $('#input-address').val() + ' </span></p>' +
            '<p><strong>Date of employment: </strong><span class="p-date-from">' + $('#input-date-from').val() + ' </span><strong>To: </strong><span class="p-date-to">' + $('#input-date-to').val() + ' </span></p>' +
            '<h5>Amount of experience:</h5> <p><strong>Stright truck: </strong><span class="p-amount-straight">' + $('#input-amount-straight').val() + '</span>% <strong>Tractor/Semi Trailer: </strong><span class="p-amount-tractor">' + $('#input-amount-tractor').val() + '</span>% <strong>Dump Truck: </strong><span class="p-amount-dump">' + $('#input-amount-dump').val() + '</span>%</p>' +
            '<h5>Driving Vehicle Types Listed:</h5> <p><strong>Log truck: </strong><span class="p-driving-log">' + $('#input-driving-log').val() + '</span>% <strong>Service Vehicle: </strong><span class="p-driving-service">' + $('#input-driving-service').val() + '</span>% <strong>Other: </strong><span class="p-driving-other">' + $('#input-driving-other').val() + '</span>%</p>' +
            '<p><strong>Type of Driving: </strong><span class="p-type">' + recoverChecks() + '</span>' + '<span class="p-other">' + recoverOther() + '</span></p>' +
            '<p><strong>Radius of use: </strong><span class="p-radius">' + $('input[name="radius-use"]:checked').val() + '</span></p>' +
            '<p><strong>Have you had any accidents during this period?: </strong><span class="p-period-accident">' + $('#input-period-accident').val() + '<span></p></div>';
        cont++;
        return template;
    }

})