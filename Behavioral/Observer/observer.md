### Observer:

*  module stores list of functions and call each of them when something happens, this functions are methods of objects that wants to be notified/changed when event occurs.
* Observer - object that want to be notified. Observable object that emits events. 
* Subscription and unsubscription are handled by adding removed functions from list.
* Dependent property notifications are tricky.