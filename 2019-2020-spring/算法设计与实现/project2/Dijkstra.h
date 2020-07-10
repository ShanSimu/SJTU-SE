#pragma once

#include <cstdint>
#include <string>
#include <vector>
#include <fstream>
#include <climits>
#include <iostream>

using namespace std;
/**
 * This file declare the main class of Project2:DijkstraProject2.
 * You should implement the methods:`readFromFile`,`run1`and`run2` in Dijkstra.cpp.
 * You can add anything in DijkstraProject2 class to implement Project2.
 */
class DijkstraProject2 {
private:
	//You can declare your graph structure here.
    std::ifstream file;

    int v,e;
	int **map = nullptr;

    int *length;
    std::vector<int> *prev;
    std::vector<int> dynamic_path;
    std::vector<std::vector<int>> paths;
    int upLength = 0,downLength = 0,upNumPaths = 0,downNumPaths = 0;

	void dfs(int node);
	void incrementPath();
	void decrementPath();
public:
    DijkstraProject2(const char* inputfile="input.txt"){
        file.open(inputfile,ios::in);
    }
    ~DijkstraProject2(){
        file.close();
    }
	/**
	 * Read graph from Param:`inputfile`.
	 *
	 */
	bool readFromFile(const char* inputfile="input.txt");

	/**
	 * Part 1, implement Dijkstra algorithm to finish Part 1
	 * and save the result to Param:`outputFile`.
	 * Save the path as: node_1,node_2...node_n. (seperate nodes with comma)
	 *
	 */
	void run1(const char* outputFile = "output.txt");

	/**
	 * Part 2, find the monotonically increasing path to finish Part 2
	 * and save the result to Param:`outputFile`.
	 * Save the path as: node_1,node_2...node_n. (seperate nodes with comma)
	 *
	 */
	void run2(const char* outputFile = "output.txt");

};
