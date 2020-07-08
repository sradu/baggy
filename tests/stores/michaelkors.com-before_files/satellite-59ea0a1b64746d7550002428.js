if (_satellite.getVar('country') !== "CA") {
  if (typeof window.console !== 'undefined') {
    var setUpMoxieListener = function(eventName) {
      window.addEventListener(eventName, function(e) {
        if (window.console) {
          console.info("Event type: " + e.type + "\nDetail: " + JSON.stringify(e.detail));
        }
        window.moxieEventDetail = e.detail || {};
        if (eventName == 'GoMoxie:widgetOpened') {
          // check to see what widget is being loaded
          // chat first
          if (moxieEventDetail.widgetName == 'chat') {
            // identify the tool vs a footer or contact us link
            if (moxieEventDetail.source == 'button') {
              // this is from the concierge button
              sendCustomEvent('moxieButtonChatOpen');
            } else if (moxieEventDetail.source == 'externalLink') {
              // this is from a footer or contact page link
              sendCustomEvent('moxieLinkChatOpen');
            }
          } else if (moxieEventDetail.widgetName == 'kb') {
            // this is the knowledge base
            sendCustomEvent('moxieKnowledgeBaseOpen');
          }
        }
        if (eventName == 'GoMoxie:bellClicked') {
          // need to keep state of whether the bell is already open
          var bellCount = _satellite.getVar('moxieBellCount') || 0;
          bellCount = bellCount + 1;
          _satellite.setVar('moxieBellCount', bellCount);
          if ((bellCount % 2) == 1) {
            // this is a bell open
            sendCustomEvent('moxieDrawerOpen');
          } else {
            // this is a bell close
            sendCustomEvent('moxieDrawerClose');
          }
        }
        if (eventName == 'GoMoxie:widget:chat:prechatQuestionnaireComplete') {
          sendCustomEvent('moxiePreChatSurveyComplete');
        }
        if (eventName == 'GoMoxie:widget:chat:agentJoinedSession') {
          sendCustomEvent('moxieAgentJoinedChat');
        }
      });
      _satellite.notify("Setup Listener for : " + eventName);
    };

    var moxieEvents = [
      //"GoMoxie:buttonClicked", 
      //"GoMoxie:widgetMinimized",
      //"GoMoxie:widgetClosed",
      //"GoMoxie:proactiveOffer",
      //"GoMoxie:cartUpdated",
      "GoMoxie:widget:chat:prechatQuestionnaireComplete",
      //"GoMoxie:widget:chat:suggestedArticles",
      //"GoMoxie:widget:chat:articleViewed",
      //"GoMoxie:widget:chat:deflected",
      //"GoMoxie:widget:chat:escalatedToChat",
      //"GoMoxie:widget:chat:chatSessionStarted",
      "GoMoxie:widget:chat:agentJoinedSession",
      //"GoMoxie:widget:chat:agentLeftSession",
      //"GoMoxie:widget:chat:chatSessionEnded",
      //"GoMoxie:widget:chat:surveyLoaded",
      //"GoMoxie:widget:chat:surveyCompleted",
      //"GoMoxie:widget:kb:articleViewed",
      //"GoMoxie:widget:kb:portalSearched",
      //"GoMoxie:widget:email:emailSent",
      "GoMoxie:bellClicked", // yes - open and close
      "GoMoxie:widgetOpened" // yes widgetName = kb & source = button, widgetName = chat & source = button, widgetName = chat & source = externalLink
    ];

    for (var i = 0; i < moxieEvents.length; i++) {
      setUpMoxieListener(moxieEvents[i]);
    }
  }
}