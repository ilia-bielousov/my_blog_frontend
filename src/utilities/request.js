async function request(method = 'GET', url, content) {
  fetch(`http://localhost:4000/admin/${url}`, {
    method: method,
    body: JSON.stringify(content),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  // .then(res => res.json())
  // .then(data => console.log(data))
  .catch((err) => {
    console.log(err);
  })
}

export { request };