public with sharing class isBirthday {
    public Boolean isBirthday(Contact c) {
        //code here
        if(System.today().day()==c.Birthdate.day() && System.today().month()==c.Birthdate.month()){
            return true;
        }
    return false;
    }
}