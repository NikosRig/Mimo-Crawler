# Mimo
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

Then you have to implement the class mimoClient.

* `sendMessage`
  * Sends a new crawl request to Mimo
* `addResponseListener`
  * Calls a function when a response from Mimo is received
* `close`
  * Closes the connection with Mimo and terminates the client script.

In order to get response from Mimo your code must call the `response` function
inserting the value that you want to be returned as parameter.

example.js
```bash
const mimo_client = require('./src/app/mimoClient');

let message = {
    url: 'https://www.example.com',
    code: `response(document.documentElement.innerHTML)`
};

mimo_client.sendMessage(message)

mimo_client.addResponseListener((msg) => {
    console.log(msg)
    mimo_client.close();
})
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










