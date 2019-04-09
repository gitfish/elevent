public class EventController {
    
    @AuraEnabled
    public static Event saveEvent(Event event) {
        try {
            upsert event;
        } catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        return event;
    }
}
