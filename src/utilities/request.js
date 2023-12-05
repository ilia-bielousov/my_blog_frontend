async function request(method = 'GET', url, content = undefined) {
  await fetch(`http://localhost:4000/${url}`, {
    method: method,
    body: content ? JSON.stringify(content) : null,
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => res.json())
  // .then(data => console.log(data))
  .catch((err) => {
    console.log(err);
  })
}

export { request };