@isTest
public class updateAccPhoneNumTest {
	@isTest
    public static void createAcc(){
        Account acc = new Account();
        acc.Name = 'Test account';
        acc.Phone = '112233';
        insert acc;
        
        Test.startTest();
        updateAccPhoneNum.createdAcc();
        Test.stopTest();
        List<Account>updatedAcc = [Select id,name,phone from Account where id =:acc.Id];
        System.assertEquals('123456789', updatedAcc[0].phone);
    }
}