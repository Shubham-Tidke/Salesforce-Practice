@RestResource(urlMapping='/v1/welcome/*')
global with sharing class WelcomeClass {
    global Final static String WELCOME_MSG = 'Welcome Message';

    @httpGet
    global static String getMessage(){
       
        return WELCOME_MSG;
    }

    @httpPatch
    global static String updateMessage(){
        return WELCOME_MSG + 'Using Patch';
    }
}
