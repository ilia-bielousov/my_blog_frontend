
// await fetch(`http://localhost:4000/admin/create-card`, {
//   method: 'POST',
//   body: JSON.stringify(cardContent.content),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8'
//   }
// })
//   .then(res => res.json())
//   .then(data => setResponce(data))
//   .catch((err) => {
//     console.log(err);
//   });


// import { setResponceId } from "../adminReducer";

// export const fetchResponceId = () => {
//   return function (dispatch) {
//     fetch(`http://localhost:4000/data`)
//       .then(res => res.json())
//       .then(data => {
//         dispatch(setResponceId(data));
//       });
//   }
// }