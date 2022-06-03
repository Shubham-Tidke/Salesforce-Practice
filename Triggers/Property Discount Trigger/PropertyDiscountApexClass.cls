public class PropertyDiscountApexClass {
    public static void ApplyDiscount(List<Property_Deal__c> DiscountList){
        for(Property_Deal__c  VarP : DiscountList ){
              if(VarP.Type_of_Property__c == 'Villa'){
            VarP.Discounted_Price__c = VarP.Price__c - (VarP.Price__c * 0.2);
            }
            
            else if(VarP.Type_of_Property__c == 'Row House'){
            VarP.Discounted_Price__c = VarP.Price__c - (VarP.Price__c * 0.5);
            }
            
            else if(VarP.Type_of_Property__c == 'Apartment'){
            VarP.Discounted_Price__c= VarP.Price__c - (VarP.Price__c * 0.35);
            }
        }
    }
}