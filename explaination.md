Basically, in the D3 library, chord has been very well defined.

In my app, the main.js firstly get the data from the json file and save it to the chord's .matrix, where stores the dependency data among all the objects.

The whole diagram is consist of three parts: The arcs, the paths and the ticks with the text.

Fistly, I set the layout of the diagram circle, and call the chord library function to set the arcs of each object, depending on the sum of the value of the matrix.

Secondly, using the data of different column and row related to two objcets, I can draw the path using the chords' library function.

Finally, draw the ticks and the text base on the data of the matrix.