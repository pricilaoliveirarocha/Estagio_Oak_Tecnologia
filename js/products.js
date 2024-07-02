$(document).ready(function() {
    $('#productValue').mask('000.000.000,00', {reverse: true});

    $('#productForm').submit(function(event) {
        event.preventDefault();

        var productName = $('#productName').val().trim();
        var productValue = $('#productValue').val().trim();

        if (productName === '' || productValue === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        $('#productList').append('<tr><td>' + productName + '</td><td>R$ ' + productValue + '</td><td><button class="btn btn-danger btn-sm delete-product"><i class="fas fa-trash"></i> Excluir </button></td></tr>');

        sortProducts();

        $('#productName').val('');
        $('#productValue').val('');

        $('#noProductsMsg').hide();
    });

    function sortProducts() {
        var rows = $('#productList tr').get();

        rows.sort(function(a, b) {
            var aValue = parseFloat($(a).find('td:nth-child(2)').text().split('R$ ')[1].replace('.', '').replace(',', '.'));
            var bValue = parseFloat($(b).find('td:nth-child(2)').text().split('R$ ')[1].replace('.', '').replace(',', '.'));

            return aValue - bValue;
        });

        $.each(rows, function(index, row) {
            $('#productList').append(row);
        });

        if ($('#productList tr').length > 0) {
            $('#noProductsMsg').hide();
        } else {
            $('#noProductsMsg').show();
        }
    }

    $('#productList').on('click', '.delete-product', function() {
        $(this).closest('tr').remove();

        if ($('#productList tr').length > 0) {
            $('#noProductsMsg').hide();
        } else {
            $('#noProductsMsg').show();
        }
    });
});
