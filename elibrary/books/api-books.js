import queryString from 'query-string'
const create = async (book) => {
  try {
    let response = await fetch('/api/books/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: book
      })
      return response.json()
    }catch(err) {
      console.log(err)
    }
}

const read = async (params, signal) => {
  try {
    let response = await fetch('/api/books/' + params.bookId, {
      method: 'GET',
      signal: signal
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (params, credentials, product) => {
  try {
    let response = await fetch('/api/books/'+params.bookId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: product
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/books/'+params.productId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return response.json()
  } catch(err) {
    console.log(err)
  }
}
const list = async (params, signal) => {
  const query = queryString.stringify(params)
  try {
    let response = await fetch('/api/books?'+query, {
      method: 'GET',
    })
    return response.json()
  }catch(err) {
    console.log(err)
  }
}

export {
  create,
  read,
  update,
  remove,
  list
}