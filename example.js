const mimo_client = require('./src/app/mimoClient')

let options = {
    url: 'https://www.amazon.com/',
    code: 'response(document.title)'
}

mimo_client.crawl(options)

mimo_client.addResponseListener((response) => {
    console.log(response)
})