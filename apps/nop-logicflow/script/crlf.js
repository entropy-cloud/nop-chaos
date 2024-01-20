const fs = require('fs')

if (process.platform === 'win32') {
  fs.readFile('./src/components.d.ts', (err, data) => {
    if (err)
      throw err
    fs.writeFile('./src/components.d.ts',
      data.toString().replace(/\r\n/g, '\n').replace(/\n/g, '\r\n'),
      (err) => {
        if (err)
          throw err
        console.log('components.d.ts CRLF converted')
      },
    )
  })
}
