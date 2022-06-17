public with sharing class duplicateContacts {
    public Boolean duplicateContacts(Contact c1, Contact c2) {
        //code here
        if(c1.Phone != NULL && c2.Phone != NULL && c1.Email != NULL && c2.Email != NULL)
        {
            if(c1.Phone == c2.Phone || c1.Email == c2.Email)
            return true;
        }
        
        return false;
    }
}