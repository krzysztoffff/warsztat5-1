$(function(){
  var baseURL = 'warsztat5/'
  var list = $('ul.books');
  var form = $('form.save');

function renderList() {
  $.getJSON({
    url: baseURL + 'books'
  }).done(function (data){
    console.log(data);
    list.empty();
    data.forEach(function (book){
      list.append($('<li>', {'data-id': book.id})
      .append('<span>' + book.title +'</span>')
      .append('<button class = "delete">delete</button>')
      .append('<div>'));
    })
  })
}

list.on('click','button.delete', function(e){

  $.ajax({
    url: baseURL + 'books/remove/' + $(e.currentTarget).closest('li').data('id'),
    type: 'DELETE'
  }).done(function(){
    renderList();
  }).fail(function(xhr, status, error) {
    console.log(xhr, status, error);
  });
  e.stopPropagation();
});


//4
  list.on('click','li', function(e){
    $.getJSON({
      url: baseURL + 'books/' + $(e.currentTarget).data('id')
    }).done(function (book){
      var html = $('<table>');
      for (var key in book) {         // pobieramy klucze z konkretnej ksiazki
        html.append($('<tr>')
        .append($('<td>', {text:key}))
        .append($('<td>',{text:book[key]})))
      }
      $(e.currentTarget).find('div').html(html);
    });
  });



//przetworzenie formularza
form.on('submit', function(e){
  var book ={};
  $(this).find('input[type!=submit]').each(function (index, elem){
    book[elem.name] = elem.value    //nam z inputu z html
  });
  $.post({
    headers: {
      'Content-Type': 'application/json'          //informuje server ze to jest JSON, bo domyslnie jest to URLEncoder
    },                                            //jeśli chcemy wyświetlić
    url: baseURL + 'books/add',
    data: JSON.stringify(book)      //metoda pobiera dane JavaScript i zwraca tekst, który reprezentuje te dane w formacie JSON.
  }).done(function(res){
    console.log(res);
    renderList();
  }).fail(function(xhr, status, error){
    console.log(xhr, status, error);
  });

  this.reset();
  e.preventDefault();
})

renderList();


});
