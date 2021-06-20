//api list
let urlList = [
  "https://jsonplaceholder.typicode.com/posts",
  "https://jsonplaceholder.typicode.com/posts/59",
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/posts/178",
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/users/987",
  "https://jsonplaceholder.typicode.com/albums",
  "https://jsonplaceholder.typicode.com/todos/967",
  "https://jsonplaceholder.typicode.com/comments/732",
  "https://jsonplaceholder.typicode.com/photos",
  "https://jsonplaceholder.typicode.com/todos",
  "https://jsonplaceholder.typicode.com/photos/800",
];

// let data = {
//   success: [
//     // {
//     //    "endpoint":"API Endpoint",
//     //    "status":"code"
//     // }
//   ],
//   failed: [
//     // {
//     //    "endpoint":"API Endpoint",
//     //    "status":"code"
//     // }
//   ],
// };
function onSuccess(data, body) {
  data.success.push(body);
}

function onFailure(data, body) {
  data.failed.push(body);
}

module.exports = {
  urlList,
  onSuccess,
  onFailure,
};
