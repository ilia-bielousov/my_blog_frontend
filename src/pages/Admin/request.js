export default function request(content) {
  fetch('http://localhost:4000/admin', {
    method: 'POST',
    body: JSON.stringify(content),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
  });
}