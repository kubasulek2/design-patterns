### Chain Of Responsibility

* It's a linked list that stores reference to an object and each item in the list modify stored object.
* Enlist objects in the chain, possibly controlling their order/priority
* one member can stops all chain

#### Event Broker:

* it's different setup, when have one central object to store all modifiers and fire events on each of modifier stored, modifiers then modify referenced object (object to modify)
* cental object handle adding removing (subscribing and unsubscribing) anf handling (firing/activating) modifiers.
