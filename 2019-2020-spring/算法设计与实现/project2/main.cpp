#include <iostream>
#include "Dijkstra.h"

/**
 * You can use this file to test your code.
 */
int main()
{
    DijkstraProject2 pro("input.txt");
        while (pro.readFromFile("input.txt")) {
            pro.run1("output.txt");
            pro.run2("output.txt");
        }
}
