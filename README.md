# How Many Days - about the project
The idea of this project is to be a backend for a _how many days_ app (mobile and/or web).
It should allow to register users and define events. Based on the event definitions, reminders are generated.
#
All the above are/should be accessible via API. 
Some AWS services used in this project:
1. **Lambda** (triggered by API, notifications, queue messages and scheduler)
2. **Simple Notification Service**
3. **Simple Queue Service**
4. **Simple Email Service**
5. **Secrets Manager**

# TODO
1. When creating reminders, skip dates in the past
2. When creating new reminders after firing the old ones - properly calculate the interval
3. Update date for recurring events - within a scheduled job
4. Implement proper authentication, list events based on user auth token
5. Implement mobile and/or web app
6. Implement notifications for mobile app
7. Refactor commands and queries
8. Check if there are still things to be moved from the AWS console to the yaml template
9. Consider using interfaces instead of classes for business-level entity representation
10. Compile TypeScript in the build pipeline
11. Consider refactoring unpure functions so that more code is unit testable