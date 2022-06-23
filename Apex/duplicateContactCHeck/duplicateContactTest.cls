@isTest
public class duplicateContactTest {
	@isTest
    public static void testduplicateContact(){
        Contact c1 = new Contact(firstName = 'f1name', lastName = 'l1name', Email = 'abcd@check.com',Phone = '123');
        Contact c2 = new Contact(firstName = 'f2name', lastName = 'l2name', Email = 'xyz@check.com');
        Contact c3 = new Contact(firstName = 'f3name', lastName = 'l3name', Email = 'abcd@check.com',Phone = '123');
        insert c1;insert c2;insert c3;
         
        System.assertEquals(duplicateContacts.duplicateContacts(c1,c2),false);       
        System.assertEquals(duplicateContacts.duplicateContacts(c1,c3),true); 
    }
}