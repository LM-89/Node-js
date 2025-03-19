// const http = require('http')
// const si = require('systeminformation')



// // http.createServer(requestListener)
// // function requestListener(req, res) {}
// // const requestListener = (req, res) => {}
// // http.createServer(function(req, res) {})
// // http.createServer((req, res) => {})



// const getSPecs = async () => {
//     const cpu = await si.cpu()
//     const gpu = await si.graphics()
//     const sys = await si.system()
    
//     // const { manufacturer, brand } = cpu
//     const { model } = gpu.controllers[1]
//     // const { manufacturer, model, version } = sys
//     return model
// }

// const server = http.createServer(async (req, res) => {
//     // console.log(req.url)
//     // console.log(req.body)
//     // console.log(req.headers)
//     res.setHeader('Content-Type', 'text/html')
//     console.log("You are running server on port: 3000")

//     if (req.url === '/specs') {
        
//         res.write('<html>')
//         res.write('<head><title></title></head>')
//         res.write('<body>')
//         res.write('<h1>Hello world</h1>')
//         res.write(`<p>${await getSPecs()}</p>`)
//         res.write('</body>')
//         res.write('</html>')
        
//         res.end()
//         return        
//     }    
//     res.write('<html>')
//     res.write('<head><title></title></head>')
//     res.write('<body>')
//     res.write('<h1>Hello world</h1>')
//     res.write('<a href="/specs">Specs</a>')
//     res.write('</body>')
//     res.write('</html>')
    
//     res.end()
//     return         
// })

// server.listen(3000)

