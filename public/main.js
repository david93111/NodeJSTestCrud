
function updatePrice(tittle,author,price){
    fetch('books', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'tittle': tittle,
          'author': author,
          'price': price + 10
        })
      }).then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
}

function deleteBook(tittle,author){
    fetch('books', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'tittle': tittle,
          'author': author,
        })
      }).then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
}