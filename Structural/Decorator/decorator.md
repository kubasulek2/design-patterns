### Decorator:

* Want to augment an object with new functionality
* Should not rewrite or alter existing class (Open/Close Principle);
* Want to keep new functionality separate (Single Responsibility Principle)
* Need to be able to interact with existing structures
* Two options:
	1. Inherit from required object if possible
	2. Build a Decorator, which references an object you want to decorate

#### Decorator:

- decorator stores references to object, what means you don't have direct access to object properties
- you can either access them indirectly or set additional getter and setters to retain functionality of the original methods.
