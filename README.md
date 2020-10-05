# Mimo Crawler
**Mimo is a browser based crawler that mimics a user's web navigation.**

![](https://media.giphy.com/media/aewqyinCkKN1UXSZ9f/giphy.gif)


#### What can Mimo do?
Mimo crawls website data using Firefox browser by injecting your javascript code into the page's context.
You can execute a whole js script into the webpage and then you can "receive" the data that you want. 


### Why Mimo?
What makes Mimo special is that unlike other browser based crawlers,
it uses websockets to remotely control the browser. 

This way: 
* An extremely high-speed crawling is achieved
* Firewall's traceability is diminished

### Features
* Simple API
* Interactive crawling
* Extremely fast compared to similar tools. 
* Fully operated by your javascript code
* Web spidering
 

## Getting started

### Requirements
* [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)
* [node >= 14](https://nodejs.org/en/download/)

### Installation

```bash
git clone https://github.com/NikosRig/Mimo-Crawler
cd Mimo-Crawler && npm install
```

### Usage

You have to start by executing the main part of the application
which includes the websocket server, Firefox Developer Edition,
the DI Container, the Routes, the Services and the Controllers.

```bash
node startMimo.js
```

Then you are ready to use the Mimo API by including mimoClient.js

#### Mimo Client API

##### `mimoClient.sendMessage({url: string, code: string})`
   Sends a new crawl request to Mimo. You have to pass the url that it will be opened and your javascript code.
   
   
 You can also write a script, parse it with node's `fs.readFileSync` and pass it as code's value.
```bash
   let message = { code: fs.readFileSync('./myscript.js', 'utf8'); };
 ```
   
In order to get response from Mimo your code must call the `response` method
with the value that you want to be returned as a parameter.
```bash
let mycode = `setTimeout(() => {
   //do some things
   
  response({
   pageTitle: document.title,      // Then return an object with the pagetitle and the body.
   body: document.body.innerHTML
  }); 
},2000)`;
```
 
##### `mimoClient.addResponseListener(callback)`
 Every time Mimo sends you back a response, this callback function will be called
 with the response message as parameter.
 
```bash
mimoClient.addResponseListener((responseMessage) => {
    console.log(message)
})
```

#### `mimoClient.close()`
Closes the connection with Mimo and terminates the client script.


#### Basic Example

```bash
const mimo_client = require('./src/app/mimoClient');

let message = {
    url: 'https://www.amazon.com/s?bbn=493964&rh=n%3A172282%2Cn%3A%21493964%2Cn%3A281407%2Cp_n_shipping_option-bin%3A3242350011&dc&fst=as%3Aoff&pf_rd_i=16225009011&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=82d03e2f-30e3-48bf-a811-d3d2a6628949&pf_rd_r=MF600JK13S83FRSH3667&pf_rd_s=merchandised-search-4&pf_rd_t=101&qid=1486423355&rnid=493964&ref=s9_acss_bw_cts_AEElectr_T1_w',
    code: `
   
       let product_urls = [];
       
       document.querySelectorAll('a.a-link-normal').forEach(aElement => {
       
           product_urls.push('https://www.amazon.com' + aElement.getAttribute('href'))
       })
            
       response({category_products: product_urls})
    `
};

mimo_client.sendMessage(message)
```

### Web Spidering
Every request that you send to mimo creates a new tab, 
stores your attached code on the browser's storage and executes it every time you open a webpage in that tab.
For example if you reload the page or if you click on a link your code will be re-executed. 

```bash
const mimo_client = require('./src/app/mimoClient');

let spiderCode = `
   if (document.querySelector('a')) {
        // This will open a new url in that tab, and your code will be re-executed
        document.querySelector('a').click()
   }
    response(document.title)
`;

mimo_client.sendMessage({
    url: 'https://www.example.com',
    code: spiderCode
})

mimo_client.addResponseListener((msg) => {
    console.log(msg)
    mimo_client.close();
})
```

### Licence

Copyright (c) 2020 Nikos Rigas

This software is released under the terms of the GNU General Public License v3.0.
See the [licence](https://github.com/NikosRig/Mimo-Crawler/blob/master/LICENCE) file for further information.










