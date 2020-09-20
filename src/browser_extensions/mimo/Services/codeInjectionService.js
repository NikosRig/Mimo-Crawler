

class CodeInjectionService {


    constructor(websocket_url)
    {
        this.websocket_url = websocket_url;

        this.setInjectionEventTriggers();
    }

    setInjectionEventTriggers = () =>
    {
        this.injectionEventTriggers = `
            document.documentElement.setAttribute('onreset', "("+mimoMainFunction+")("+JSON.stringify(mimoToken)+")");
            document.documentElement.dispatchEvent(new CustomEvent('reset'));
            document.documentElement.removeAttribute('onreset');
        `;
    }

    setToken = (token) =>
    {
        this.token = `let mimoToken = '${token}';`;
    }

    buildCode = (custom_code) =>
    {
        if (!custom_code)
            custom_code = `return document.documentElement.innerHTML;`;

      this.code = `
       let mimoMainFunction = (token) => {
       
           let responseMessage = { token: token, data: ''};
                        
           let crawlData = async () => {
                try {
                    ${custom_code}
                } catch (error) {throw new Error(error)}
            };
                
            let websocket = new WebSocket('${this.websocket_url}');
            
            websocket.onopen = async () => {
              await crawlData().then((result) => {
                responseMessage.data = result;
            }).catch((error) => { responseMessage.event = 'error'; responseMessage.error = error.toString(); });
    
            websocket.send(JSON.stringify(responseMessage)); 
        };
                
       };
        
        `;

      this.autoCloseTabOnProduction();

      return this;
    }


    autoCloseTabOnProduction = () =>
    {
        if (!debugMode)
            this.code += 'window.close();';
    }


    getCode = () =>
    {
        return `${this.token} ${this.code} ${this.injectionEventTriggers}`;
    }


}

let code_injection_service = new CodeInjectionService('ws://localhost:4444/browser/crawl');


