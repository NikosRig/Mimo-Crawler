const mimo_client = require('./src/app/mimoClient');

let message = {
    url: 'https://www.amazon.com/',
    code: 'response(document.title)'
};


mimo_client.sendMessage({url: 'https://www.example.com', code: `response(document.documentElement.innerHTML)`})

mimo_client.addResponseListener((msg) => {
    console.log(msg)
})