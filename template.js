export default ({markup, css}) => { 
    return `...
    <div id="root">${markup}</div>
    <style id="jss-server-side">${css}</style> 
    ...`
    }
    
    /*export default ({markup, css}) => { 
    return `<!doctype html>
    <html lang="en"> 
    <head>
    <meta charset="utf-8">
    <title>MERN Skeleton</title> 
    <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:100,300,400"> 
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" 
    rel="stylesheet">
    
    </head>
    <body>
    <div id="root">${markup}</div>
    <style id="jss-server-side">${css}</style> 
    </body>
    </html>`
    }*/