### Singleton:

* For some components it only makes sense to have one in the system. (Database repo, object factory)
* Singleton is a class/component that prevents you from instantiate it more than once.
* Its made by returning existing one from constructor if there already is one.
* Another version is many instances but shared state, although not recommended an hazardous.
* Singleton may cause problems, eg. in testing, but introducing dependency inversion principle can help.