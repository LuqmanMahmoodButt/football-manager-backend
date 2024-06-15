
export default function logger(req, _res, next) {

    // Add this line to below for headers:
    // 🧀 Request Headers: ${JSON.stringify(req.headers, null, 2}
    console.log(`--------------------------------
   INCOMING REQUEST!
   Request Method: ${req.method}
   Request URL: ${req.url}
   Request Body: ${req.body}
  ${JSON.stringify(req.body, null, 2)}
  ❓ Request Query: ${req.query}
  --------------------------------`)
  
    next()
  }