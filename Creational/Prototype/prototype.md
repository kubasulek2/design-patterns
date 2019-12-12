### Prototype:

* most complicated software is not created from scratch.
* prototype is an ready or partially ready object that needs to be cloned for it to be used somewhere else.
* prototype is all about deep copying.
* you can perform a copy by adding a method to the class to copy. This solution is often suboptimal, all needs to by hardcoded.
* second approach is to create Serializer class, than handles deep copies for you.
* Factory provides convenient API for using prototypes.