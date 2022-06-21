@isTest
public class isBirthdayTest {
	@isTest
    public static void testContactBirthday(){
        Contact c = new Contact(firstName = 'fname', lastName = 'lname', Birthdate= Date.newInstance(1992, 6, 21));
        Contact c1 = new Contact(firstName = 'fname', lastName = 'lname', Birthdate= Date.newInstance(1992, 7, 21));
        insert c;insert c1;
        Boolean birth = isBirthday.isbirthday(c);
        System.assertEquals(birth,true);       
        System.assertEquals(isBirthday.isbirthday(c1),false);
    }
}