Notify = function(text, callback, close_callback, style, icon_type = 'fa fa-info-circle') {

    var time = '10000';
    var $container = $('#notifications');
    var icon = '<i class="' + icon_type + '"></i>';

    if (typeof style == 'undefined') style = 'warning'

    var html = $('<div class="alert   hide" style="' + style + ' ">' + icon + " " + text + '</div>');

    $('<a>', {
        text: '×',
        class: 'button close',
        style: 'padding-left: 10px;',
        href: '#',
        click: function(e) {
            e.preventDefault()
            close_callback && close_callback()
            remove_notice()
        }
    }).prependTo(html)

    $container.prepend(html)
    html.removeClass('hide').hide().fadeIn('slow')

    function remove_notice() {
        html.stop().fadeOut('slow').remove()
    }

    var timer = setInterval(remove_notice, time);

    $(html).hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(remove_notice, time);
    });

    html.on('click', function() {
        clearInterval(timer)
        callback && callback()
        remove_notice()
    });


}