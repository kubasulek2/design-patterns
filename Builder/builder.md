### Builder:

* Some Objects are complicated and creating them with eg. 10 initial args is not what we want.
* Builder is pattern that allows step by step production.
* Builder is separate class for building an object.
* Builder can be initialized, or return by the static method of the class it will be constructing.
* To allow chaining, builder methods should return "this".
* More complicated objects can be handled by one main builder and as many sub builder (handling specific aspects.) as needed.