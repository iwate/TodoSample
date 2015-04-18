$(function () {
    function refreshTodoItems(timeout) {
        $.get("/todos.json").then(function (todoItems) {
            var listItems = $.map(todoItems, function (item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.Todo.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">').prop('checked', item.Todo.complete))
                    .append($('<div>').append($('<input class="item-text">').val(item.Todo.text)));
            });
            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        }, handleError);
    }

    function handleError(error) {
        var text = error + (error.request ? ' - ' + error.request.status : '');
        $('#errorlog').append($('<li>').text(text));
    }
    
    function getTodoItemId(formElement) {
        return $(formElement).closest('li').attr('data-todoitem-id');
    }
    
    // Handle insert
    $('#add-item').submit(function(evt) {
        var textbox = $('#new-item-text'),
            itemText = textbox.val();
        if (itemText !== '') {
            $.post("/todos.json", { 
                text: itemText,
                complete: 0
            }).then(refreshTodoItems, handleError);
        }
        textbox.val('').focus();
        evt.preventDefault();
    });

    // Handle update
    $(document.body).on('change', '.item-text', function() {
        var newText = $(this).val();
        $.ajax('/todos/' + getTodoItemId(this) + '.json', {
            method: 'put',
            data: { text: newText }
        }).then(null, handleError);
    });

    $(document.body).on('change', '.item-complete', function() {
        var isComplete = $(this).prop('checked');
        $.ajax('/todos/' + getTodoItemId(this) + '.json', {
            method: 'put',
            data: { complete: isComplete ? 1:0 },
            type: 'json'
        }).then(refreshTodoItems, handleError);
    });

    // Handle delete
    $(document.body).on('click', '.item-delete', function () {
        $.ajax('/todos/' + getTodoItemId(this) + '.json', {
            method: 'delete',
        }).then(refreshTodoItems, handleError);
    });
    
    refreshTodoItems();
});
if (navigator.mozApps) {
    var manifestUrl = 'https://dl.dropboxusercontent.com/u/59753988/manifest.webapp';
    var req = navigator.mozApps.installPackage(manifestUrl);
    req.onsuccess = function () {
        alert(this.result.origin);
    };
    req.onerror = function () {
        alert(this.error.name);
    };
}