const http = require("http");
const request = require("request-promise");

let { urlList, onSuccess, onFailure } = require("./utils");

const PORT = process.env.PORT || 8000;

// Create an API that would call all the API listed below.
// In Response list out Objects with two arrays that have failed API endpoint with
// status and successful API endpoint with status.

// Using http node core module to create server
http
  .createServer(async function (req, res) {
    //A single route to get all the urls
    let data = {
      success: [],
      failed: [],
    };
    if (req.url === "/") {
      try {
        //checking there the list is empty
        if (!urlList.length) throw new Error("url list shouldn't be empty");
        //taking each url and executing it concurrently using - Promise.all -
        await Promise.all(
          urlList.map((url) => {
            return request({
              uri: url,
              method: "GET",
              resolveWithFullResponse: true,
            })
              .then(({ statusCode }) => {
                //on success response
                onSuccess(data, { endpoint: url, status: statusCode });
              })
              .catch((error) => {
                if (!error.statusCode) throw new Error(error);
                //on failure response
                onFailure(data, { endpoint: url, status: error.statusCode });
              });
          })
        );
        //response for overall successful url iteration
        res.write(
          JSON.stringify({
            success: true,
            message: "Nice Message",
            data,
          })
        );
      } catch (e) {
        //response for failure in execution
        res.statusCode = 404;
        res.write(
          JSON.stringify({
            success: false,
            message: e.message,
          })
        );
      }
      res.end();
    }
  })
  .listen(PORT, () => {
    console.log("Listening to port " + PORT);
  });
