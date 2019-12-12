### Bridge:

* Bridge itself isn't independent class/module
* Answers the problem of Cartesian explosions - which means multiplication of required classes/modules 
* So we have 3 shapes and 3 different kinds of handling drawing classes so we end up with 9 total classes.
* Bridge is a way to connect one hierarchy(shapes) with another (drawings) 
* Basically it's achieved by adding to one hierarchy base class constructor another hierarchy class as arg. Then when creating particular shape you pass drawing class instance to create it with.