


tabService.listenForTabIdRequests();

tabService.onTabClose( storage_service.removeTabMessageFromStorage );

websocket_service.onMessageEvent( createNewTabAndSaveTabMessage );
