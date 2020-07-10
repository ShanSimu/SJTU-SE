#include "Dijkstra.h"

using namespace std;

/**
 * You should implement the methods:`readFromFile`,`run1`and`run2` here.
 */
bool DijkstraProject2::readFromFile(const char* inputfile)
{
    if(map != nullptr)
    {
        for (int i = 0; i < v; ++i) {
            delete [] map[i];
        }

        delete [] map;
    }
	std::cout << "readFromFile: " << inputfile << std::endl;
	//TODO
    v = 0;
	file>>v;
	file.seekg(1,ios::cur);
	file>>e;

	if(v == 0)
        return false;
    map = new int*[v];
	for(int i = 0; i < v; i++){
	    map[i] = new int [v];
        for (int j = 0; j < v; ++j) {
            map[i][j] = 0;
        }
	}
    for (int k = 0; k < e; ++k)
    {
	    int v1,v2,w;

	    file>>v1;
        file.seekg(1,ios::cur);
        file>>v2;
        file.seekg(1,ios::cur);
        file>>w;
	    map[v1][v2] = w;
    }
    return true;
}

void DijkstraProject2::run1(const char* outputFile)
{
	//TODO
    prev = new vector<int>[v];
    length = new int[v];
    for (int k = 0; k < v; ++k) {
        length[k] = INT_MAX;
    }

    length[0] = 0;
    int src = 0;
    bool *u = new bool [v];
    for (int k = 0; k < v; ++k) {
        u[k] = true;
    }
    u[0] = false;
    for(int i = 0;i < v;i++)
    {
        int shortest = INT_MAX;
        for (int j = 0; j < v; ++j) {
            if(map[src][j] != 0)
            {
                if(length[src]+map[src][j] < length[j])
                {
                    length[j] = length[src]+map[src][j];
                    if(!prev[j].empty()) prev[j].clear();
                    prev[j].push_back(src);
                }
                else if(length[src]+map[src][j] == length[j]){
                    prev[j].push_back(src);
                }
            }
        }
        int next = 0;
        for (int k = 0; k < v; ++k) {
            if(u[k])
            {
                if(length[k]<shortest) {
                    shortest = length[k];
                    next = k;
                }
            }
        }
        u[next] = false;
        src = next;
    }

    dynamic_path.push_back(v-1);
    dfs(v-1);
    ofstream out;
    out.open(outputFile,ios::app);
    out<<length[v-1]<<endl<<paths.size()<<endl;
    for (int l = 0; l < paths.size(); ++l) {
        for (int i = paths[l].size() - 1; i >= 0 ; i--) {
            out<<paths[l][i];
            if(i > 0)
                out<<",";
        }
    out<<endl;
    }

    out<<endl;
    out.close();

	std::cout << "Save result to file:" << outputFile << std::endl;

	delete [] u;

    delete [] length;
    delete [] prev;
    dynamic_path.clear();
    paths.clear();
}

void DijkstraProject2::run2(const char* outputFile)
{
    incrementPath();
    decrementPath();

    ofstream out;
    out.open(outputFile,ios::app);
    if(upLength < downLength) {
        out << upLength << endl << upNumPaths << endl;
        for (int l = 0; l < upNumPaths; ++l) {
            for (int i = paths[l].size() - 1; i >= 0; i--) {
                out << paths[l][i];
                if (i > 0)
                    out << ",";
            }
            out << endl;
        }
        out << "end" << endl << endl << endl;
    }
    else if(upLength > downLength){
        out << downLength << endl << downNumPaths << endl;
        for (int l = upNumPaths; l < paths.size() ; ++l) {
            for (int i = paths[l].size() - 1; i >= 0; i--) {
                out << paths[l][i];
                if (i > 0)
                    out << ",";
            }
            out << endl;
        }
        out << "end" << endl << endl << endl;
    }
    else if(upLength == downLength){
        out << upLength << endl << paths.size() << endl;
        for (int l = 0; l < paths.size() ; ++l) {
            for (int i = paths[l].size() - 1; i >= 0; i--) {
                out << paths[l][i];
                if (i > 0)
                    out << ",";
            }
            out << endl;
        }
        out << "end" << endl << endl << endl;
    }
    out.close();
    std::cout << "Save result to file:" << outputFile << std::endl;

    paths.clear();
    upLength = 0;
    downLength = 0;
    upNumPaths = 0;
    downNumPaths = 0;

}

void DijkstraProject2::dfs(const int node){
    if(node == 0)
    {
        paths.push_back(dynamic_path);
        return;
    }

    for (int i = 0; i < prev[node].size(); ++i) {
            dynamic_path.push_back(prev[node][i]);
            dfs(prev[node][i]);
            dynamic_path.pop_back();
    }
}

void DijkstraProject2::incrementPath() {
    //TODO
    prev = new vector<int>[v];
    length = new int[v];
    for (int k = 0; k < v; ++k) {
        length[k] = INT_MAX;
    }

    length[0] = 0;
    int src = 0;
    bool *u = new bool [v];
    for (int k = 0; k < v; ++k) {
        u[k] = false;
    }
    bool Cflag = true;
    while(Cflag)
    {
        Cflag = false;
        int shortest = INT_MAX;
        for (int j = 0; j < v; ++j) {
            bool flag = true;
            if(map[src][j] != 0)
            {
                for (int k = 0; k < prev[src].size(); ++k) {
                    if(map[src][j] < map[prev[src][k]][src])
                        flag = false;
                }
                if(flag) {
                    if (length[src] + map[src][j] < length[j]) {
                        u[j] = true;
                        length[j] = length[src] + map[src][j];
                        if (!prev[j].empty()) prev[j].clear();
                        prev[j].push_back(src);
                    } else if (length[src] + map[src][j] == length[j]) {
                        u[j] = true;
                        prev[j].push_back(src);
                    }
                }
            }
        }
        int next = 0;
        for (int k = 0; k < v; ++k) {
            if(u[k])
            {
                Cflag = true;
                if(length[k]<shortest) {
                    shortest = length[k];
                    next = k;
                }
            }
        }
        u[next] = false;
        src = next;
    }

    upLength = length[v-1];
    dynamic_path.push_back(v-1);
    dfs(v-1);
    upNumPaths = paths.size();

    delete [] length;
    delete [] prev;
    dynamic_path.clear();
}

void DijkstraProject2::decrementPath() {
    //TODO
    prev = new vector<int>[v];
    length = new int[v];
    for (int k = 0; k < v; ++k) {
        length[k] = INT_MAX;
    }

    length[0] = 0;
    int src = 0;
    bool *u = new bool [v];
    for (int k = 0; k < v; ++k) {
        u[k] = false;
    }
//    u[0] = false;
    bool Cflag = true;
    while(Cflag)
    {
        Cflag = false;
        int shortest = INT_MAX;
        for (int j = 0; j < v; ++j) {
            bool flag = true;
            if(map[src][j] != 0)
            {
                for (int k = 0; k < prev[src].size(); ++k) {
                    if(map[src][j] > map[prev[src][k]][src])
                        flag = false;
                }
                if(flag) {


                    if (length[src] + map[src][j] < length[j]) {
                        u[j] = true;
                        length[j] = length[src] + map[src][j];
                        if (!prev[j].empty()) prev[j].clear();
                        prev[j].push_back(src);
                    } else if (length[src] + map[src][j] == length[j]) {
                        u[j] = true;
                        prev[j].push_back(src);
                    }
                }
            }
        }
        int next = 0;
        for (int k = 0; k < v; ++k) {
            if(u[k])
            {
                Cflag = true;
                if(length[k]<shortest) {
                    shortest = length[k];
                    next = k;
                }
            }
        }
        u[next] = false;
        src = next;
    }

    downLength = length[v-1];
    dynamic_path.push_back(v-1);
    dfs(v-1);
    downNumPaths = paths.size() - upNumPaths;

    delete [] length;
    delete [] prev;
    dynamic_path.clear();
}
