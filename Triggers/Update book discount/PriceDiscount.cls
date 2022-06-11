public class PriceDiscount {
    public static void applyDiscount(List<Books__c> books){
        for(Books__c b :books){
            b.Price__c *=0.9;
        }
    }
}