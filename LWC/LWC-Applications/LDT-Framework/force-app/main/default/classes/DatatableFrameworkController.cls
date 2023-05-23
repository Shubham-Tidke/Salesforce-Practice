public with sharing class DatatableFrameworkController {
    @AuraEnabled(cacheable=true)
    public static List<Sobject> getObjects(){
        return [SELECT SObjectType FROM ObjectPermissions GROUP BY SObjectType ORDER BY SObjectType ASC ];
    }    
    @AuraEnabled(cacheable=true)
    public static List<Sobject> getFields(String obj){
        return [SELECT EntityDefinition.QualifiedApiName, QualifiedApiName, DataType
                FROM FieldDefinition
                WHERE EntityDefinition.QualifiedApiName =:obj ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Sobject> getRecordsData(String obj,List<Object> fieldName){
        String fields = String.join(fieldName,',');
        String query = 'SELECT '+fields+' FROM '+obj;
        return Database.query(query);
    }
}