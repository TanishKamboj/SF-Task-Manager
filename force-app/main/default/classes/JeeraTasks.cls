public class JeeraTasks {
     @AuraEnabled(cacheable=true)
    public static List<Jeera_Task__c> getTasks(){	
		try {
    		List<Jeera_Task__c> tasks = [SELECT Id,Name,Priority__c,Task_Deadline__c,Task_Timestamp__c,Assigned_To__r.Name,Assignee__r.Name ,Task_Status__c	FROM Jeera_Task__c];
            return tasks;
        } catch (Exception e){
            System.debug('An error occurred: ' + e.getMessage());
            return NULL;
        }
    }
}