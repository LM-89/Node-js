// // const casual = require('casual')
// // console.log(casual)
// // console.log('Hello')
// // console.log('From ' + casual.city, casual.street, casual.integer(1, 100))
// // console.log(casual.name_suffix, casual.first_name, casual.last_name)

// const si = require('systeminformation')


// // si.cpu().then(data => {
// //     console.log(data)
// // })

// const getSPecs = async () => {
//     const cpu = await si.cpu()
//     const gpu = await si.graphics()
//     const sys = await si.system()

//     // const { manufacturer, brand } = cpu
//     // const { model } = gpu.controllers[1]
//     const { manufacturer, model, version } = sys

//     console.log(`${manufacturer}, ${model}, ${version}`)
// }

// getSPecs()