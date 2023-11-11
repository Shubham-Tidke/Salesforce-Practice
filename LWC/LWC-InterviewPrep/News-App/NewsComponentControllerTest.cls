@IsTest
public class NewsComponentControllerTest {
    @IsTest
    static void getNewsTest(){
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('SampleNewsResponse');
        mock.setStatusCode(200);
        mock.setHeader('Content-Type', 'application/json');
        Test.setMock(HttpCalloutMock.class, mock);
        Test.startTest();
        Map<String, Object> newsJsonData = NewsComponentController.getNews();
        Test.stopTest();
        Assert.areEqual('ok',newsJsonData.get('status'));
    }
    @IsTest
    static void getNewsNegativeTest(){
        StaticResourceCalloutMock mock = new StaticResourceCalloutMock();
        mock.setStaticResource('SampleNewsResponse');
        mock.setStatusCode(201);
        mock.setHeader('Content-Type', 'application/json');
        Test.setMock(HttpCalloutMock.class, mock);
        Test.startTest();
        Map<String, Object> newsJsonData = NewsComponentController.getNews();
        Test.stopTest();
        //Assert.areNotEqual('ok',newsJsonData.get('status'));
    }
}