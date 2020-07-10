#include "common.h"
#include <vector>
#include<algorithm>
using namespace std;

//You should only code here.Don't edit any other files in this 
int func1(int amount, vector<int>& coins)
{
    //judge the input
    if(coins.empty() )
        return 0;

    //initialize the 2-row array
    int **dp;
    dp = new int*[2];
    for (int i = 0; i < 2; ++i) {
        dp[i] = new int [amount+1];
    }
    dp[0][0] = 1;
    for (int j = 1; j < amount+1; ++j) {
        dp[0][j] = 0;
    }
    int zeroOrOne = 0;
    int prev;
    int now = zeroOrOne;
    //begin dp
    for (int k : coins) {
        int coin = k;
        prev = zeroOrOne;
        now = (zeroOrOne = !zeroOrOne);

        for (int i = 0; i < k; ++i) {
            dp[now][i] = dp[prev][i];
        }
        dp[now][coin] = 1 + dp[prev][coin];

        for (int j = coin+1; j < amount+1; ++j) {
            dp[now][j] = dp[now][j-coin]+ dp[prev][j];
        }
    }

    delete [] dp[0];
    delete [] dp[1];
    delete [] dp;
    int result = dp[now][amount];
    return result;

}

int func2(int amount, vector< vector<int> >& conquer)
{
    //create the dp array
    int **dp;
    dp = new int*[amount];
    for (int i = 0; i < amount; ++i) {
        dp[i] = new int [amount];
        for (int j = 0; j < amount; ++j) {
            dp[i][j] = 0;
        }
    }
    //initialize the dp array
    dp[amount-1][0] = 1;
    for (int k = 0; k < amount - 1; ++k) {
        dp[k][k+1] = 1;
    }

    //loop the procedure
    for (int l = 2; l <= amount; ++l) {  //loop amount-1 times
        for (int i = 0; i < amount; ++i) { //row i
            bool flag = false;
            int target = (i+l) % amount;
            for (int j = 1; j < l ; ++j) {
                int k = (i+j) % amount;
                if(dp[i][k] && dp[k][target] && (conquer[i][k] || conquer[target][k])){
                    flag = true;
                    break;
                }
            }
            if(flag)
                dp[i][target] = 1;
        }
    }

    int sumOfWinner = 0;
    for (int m = 0; m < amount; ++m) {
        if(dp[m][m])
            sumOfWinner++;
    }

    return sumOfWinner;
}

bool toEnd(int node,vector<int>& endNote)
{
    for (int i : endNote) {
        if(node == i)
            return true;
    }
    return false;
}
double func3(int n,int hp,vector<int>& damage,vector<int>& edges) {

    //initialize the Gauss array
    vector<int> emptyTrap;
    for (int i = 1; i <= damage.size(); ++i) {
        if(damage[i-1]==0)
            emptyTrap.push_back(i);
    }
    int numOfEmptyTrap = emptyTrap.size();

    double **gaussArray;
    gaussArray = new double*[numOfEmptyTrap+1];
    for (int i = 0; i < numOfEmptyTrap + 1; ++i) {
        gaussArray[i] = new double[numOfEmptyTrap+2];
        for (int j = 0; j < numOfEmptyTrap + 2; ++j) {
            gaussArray[i][j] = 0;
        }
    }



    //initialize each edge
    vector<int> eachEdge[n+1];
    for (int i = 0; i < edges.size(); i+=2) {
        int edge1 = edges[i];
        int edge2 = edges[i+1];
        if(edge2 != n)
            eachEdge[edge1].push_back(edge2);
        if(edge1 != n)
            eachEdge[edge2].push_back(edge1);
    }

    for(int i = 0; i < n+1; i++){
        sort(eachEdge[i].begin(),eachEdge[i].end());
    }

    //initialize the dp array
    double **dp;
    dp = new double*[hp+1];
    for(int i = 0; i < hp + 1; i++){
        dp[i] = new double[n+1];
        for (int j = 0; j < n + 1; ++j) {
            dp[i][j] = 0;
        }
    }
    dp[hp][1] = 1;


    //begin the dp loop
    for(int i = hp; i > 0; i--) {
        int rowOfGaussArray = 0; //?
        for (int j = 1; j <= n; ++j) {
            int nowDamage = damage[j - 1];
            if (nowDamage != 0) {
                if (i + nowDamage <= hp)
                    for (int k = 0; k < eachEdge[j].size(); ++k) {
                        if(dp[i + nowDamage][eachEdge[j][k]]!=0)
                            dp[i][j] += dp[i + nowDamage][eachEdge[j][k]] / (double) (toEnd(eachEdge[j][k],eachEdge[n])?eachEdge[eachEdge[j][k]].size()+1:eachEdge[eachEdge[j][k]].size());
                    }
            }
        }

        for (int j = 1; j <= n ; ++j) {
            int nowDamage = damage[j - 1];
            if (nowDamage == 0){
                rowOfGaussArray++;
                gaussArray[rowOfGaussArray][rowOfGaussArray] = 1;
                for (int k = 0; k < eachEdge[j].size(); ++k) { //找遍j的支路
                    if (damage[eachEdge[j][k]-1] != 0) { //
                        if(dp[i][eachEdge[j][k]]!=0) {
                            gaussArray[rowOfGaussArray][numOfEmptyTrap + 1] +=
                                    dp[i][eachEdge[j][k]] /
                                    (double) (toEnd(eachEdge[j][k], eachEdge[n]) ? eachEdge[eachEdge[j][k]].size() + 1
                                                                                 : eachEdge[eachEdge[j][k]].size());
                        }
                    } else {
                        for (int l = 1; l < n + 1; ++l) {
                            if (emptyTrap[l - 1] == eachEdge[j][k])
                                gaussArray[rowOfGaussArray][l] = -(double) 1 / (double) (toEnd(eachEdge[j][k],eachEdge[n])?eachEdge[eachEdge[j][k]].size()+1:eachEdge[eachEdge[j][k]].size());
                        }
                    }
                }

            }
        }
        //begin the gauss algorithm
        if(i == hp) {

            gaussArray[1][numOfEmptyTrap + 1] = 1;
        }

        double temp; //用于记录消元时的因数
        for (int q = 1; q <= numOfEmptyTrap; q++) {
            int r = q;
            for (int j = q + 1; j <= numOfEmptyTrap; j++)
                if (fabs(gaussArray[j][q]) > fabs(gaussArray[r][q]))
                    r = j;
            if (r != q)
                for (int j = q; j <= numOfEmptyTrap + 1; j++)
                    swap(gaussArray[q][j], gaussArray[r][j]);//与最大主元所在行交换
            for (int j = q + 1; j <= numOfEmptyTrap; j++) {//消元
                temp = gaussArray[j][q] / gaussArray[q][q];
                for (int k = q; k <= numOfEmptyTrap + 1; k++)
                    gaussArray[j][k] -= gaussArray[q][k] * temp;
            }
        }
        for (int q = numOfEmptyTrap; q >= 1; q--) {//回代求解
            for (int j = q + 1; j <= numOfEmptyTrap; j++)
                gaussArray[q][n + 1] -= gaussArray[q][j] * gaussArray[j][numOfEmptyTrap + 1];
            gaussArray[q][numOfEmptyTrap + 1] /= gaussArray[q][q];
        }
        //将计算结果代入dp中
        for (int q = 0; q < numOfEmptyTrap; ++q) {
            dp[i][emptyTrap[q]] = gaussArray[q+1][numOfEmptyTrap+1];
        }

        for (int q = 0; q < numOfEmptyTrap + 1; ++q) {
            for (int j = 0; j < numOfEmptyTrap + 2; ++j) {
                gaussArray[q][j] = 0;
            }
        }

    }

    double probabilityOfWin = 0;
    for (int m = 0; m < hp + 1; ++m) {
        probabilityOfWin += dp[m][n];
    }

    for (int i1 = 0; i1 < numOfEmptyTrap + 1; ++i1) {
        delete [] gaussArray[i1];
    }
    delete [] gaussArray;

    for (int k1 = 0; k1 < hp + 1; ++k1) {
        delete [] dp[k1];
    }
    delete [] dp;
    return probabilityOfWin;
}