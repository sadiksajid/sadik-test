
window.addEventListener('changeCartPrice', event => {
    var qte = event.detail.qte
    var total = event.detail.total
    var curency = event.detail.curency
    // var text = total + ' ' + curency + ' / ' + qte + ' ' + 'items'
    var text = qte

    $("#cart_price").html(text);
});

window.addEventListener('changeOrdersNbr', event => {
    var nbr = event.detail.orders_nbr
    var text = nbr
    $("#orders_nbr").html(text);
});
$(document).ready(function () {
    Livewire.emit('updateHeader')

});

