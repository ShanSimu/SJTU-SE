#pragma once

#include "kvstore_api.h"

class KVStore : public KVStoreAPI {
	// You can add your implementation here
    struct node {
        node(uint64_t val = INT_MIN,const std::string &s = "") :key(val),value(s) ,up(nullptr), down(nullptr), left(nullptr), right(nullptr) {}
        uint64_t key;
        std::string value;
        // 设置4个方向上的指针
        struct node* up; // 上
        struct node* down; // 下
        struct node* left; // 左
        struct node* right; // 右
    };
    struct SSTnode{
        SSTnode(uint64_t val = INT64_MIN,const std::string &s = "") :key(val),value(s),next(nullptr){}
        struct SSTnode* next;
        uint64_t key;
        std::string value;
    };
private:
    std::string content;
    std::vector<uint64_t> levels;
    uint64_t nodes = 0;
    node* head; // 头节点，查询起始点
    int lvl_num; // 当前链表层数
    uint64_t num = 50; //跳表中结点最多值
    /* 随机判断 */
    bool randomVal();
    void compaction(uint64_t lev);
    uint64_t getTable(SSTnode *Node,uint64_t level,uint64_t table);
    void writeTable(SSTnode *Node,uint64_t level,uint64_t table,uint64_t Num);
    void getRange(uint64_t level,uint64_t table, uint64_t &min,uint64_t &max);
    bool inRange(uint64_t level,uint64_t table, uint64_t min,uint64_t max);
    bool search(uint64_t level,uint64_t table,uint64_t key,std::string &Result);
    void clearSkipList();
    void tranToSST();
public:
	KVStore(const std::string &dir);

	~KVStore();

	void put(uint64_t key, const std::string &s) override;

	std::string get(uint64_t key) override;

	bool del(uint64_t key) override;

	void reset() override;

};
