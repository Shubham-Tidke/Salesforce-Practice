public class ScheduleContactUpdation implements Schedulable {
		public void execute(SchedulableContext sc){
        UpdateContactsToDatastore obj = new UpdateContactsToDatastore();
		Database.executeBatch(obj);
    }
}