(function($, undefined) {

    'use strict'

    $('#title').focus();

    $.get('/get-list', function(todoItems) {
        populateAllData(todoItems);
    });


    $('#btnSave').click(function() {
        var title = $('#title').val();
        var description = $('#description').val();

        if (!title || !description) {
            return;
        }

        $.post('/add-item', {
            title: title,
            description: description
        }, function(item) {
            populateData(item);
            $('#title').val('');
            $('#description').val('');
        });
    });

    function populateData(item) {
        if (!item) {
            return;
        }
        var template = '<li><div><b>' + item.title + '</b></div><p>' + item.description + '</p></li>';
        $('#list').html($('#list').html() + template);        
    	$('#title').focus();
    }

    function populateAllData(todoItems) {
        if (!todoItems || !todoItems.length) {
            return;
        }

        todoItems.forEach(function(item) {
            populateData(item);
        });
    }

})(jQuery)
