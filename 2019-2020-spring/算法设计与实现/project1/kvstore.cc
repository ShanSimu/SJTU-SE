#include "kvstore.h"
#include <string>

static unsigned int seed = 0;

bool KVStore::randomVal() {
    if (seed == 0) {
        seed = (unsigned)time(NULL);
    }
    ::srand(seed);
    int ret = ::rand() % 2;
    seed = ::rand();
    if (ret == 0) {
        return true;
    }
    else {
        return false;
    }
}
KVStore::KVStore(const std::string &dir): content(dir),lvl_num(1)
{
    head = new node();
}

KVStore::~KVStore()
{
}

/**
 * Insert/Update the key-value pair.
 * No return values for simplicity.
 */
void KVStore::put(uint64_t key, const std::string &s)
{
    node* cursor = head;
    node* new_node = nullptr;
    while (cursor->down != nullptr) {
        cursor = cursor->down;
    }
    node* cur_head = cursor; // 当前层链表头
    while (cursor->right != nullptr) {
        if(key == cursor->right->key)
        {
            cursor = cursor->right;
            while(cursor != nullptr)
            {
                cursor->value = s;
                cursor = cursor->up;
            }
            return;
        }
        if (key < cursor->right->key && new_node == nullptr) {
            new_node = new node(key,s);
            new_node->right = cursor->right;
            cursor->right = new_node;
        }
        cursor = cursor->right; // 向右移动游标
    }
    if (new_node == nullptr) {
        new_node = new node(key,s);
        cursor->right = new_node;
    }
        nodes++;
    /* L1层插入完成 */
    /* 上层操作 */
    int cur_lvl = 1; // 当前所在层
    while (randomVal()) {
        cur_lvl++;
        if (lvl_num < cur_lvl) { // 增加一层
            lvl_num++;
            node* new_head = new node();
            new_head->down = head;
            head->up = new_head;
            head = new_head;
        }
        cur_head = cur_head->up; // 当前链表头上移一层
        cursor = cur_head; // 继续获取游标
        node* skip_node = nullptr; // 非L1层的节点
        while (cursor->right != nullptr) {
            if (key < cursor->right->key && skip_node == nullptr) {
                skip_node = new node(key,s);
                skip_node->right = cursor->right;
            }
            cursor = cursor->right;
        }
        if (skip_node == nullptr) {
            skip_node = new node(key,s);
            cursor->right = skip_node;
        }
        while (new_node->up != nullptr) {
            new_node = new_node->up;
        }
        /* 连接上下两个节点 */
        skip_node->down = new_node;
        new_node->up = skip_node;
    }
    if(nodes >=num) {
        tranToSST();
        clearSkipList();
    }
}
/**
 * Returns the (string) value of the given key.
 * An empty string indicates not found.
 */
std::string KVStore::get(uint64_t key)
{
    bool nullFlag = false,flag = false;
    node* cursor = nullptr;
    if (head == nullptr) {
        nullFlag = true;//return "";
    }
    /* 初始化游标指针 */
    if(!nullFlag) {
        cursor = head;
        while (cursor->down != nullptr) { // 第一层循环游标向下
            while (cursor->right != nullptr) { // 第二层循环游标向右
                if (key <= cursor->right->key) { // 定位元素:于当前链表发现可定位坐标则跳出循环...
                    break;
                }
                cursor = cursor->right;
            }
            cursor = cursor->down;
        }
        while (cursor->right != nullptr) { // L1层循环开始具体查询
            if (key > cursor->right->key) {
                cursor = cursor->right; // 如果查找的值大于右侧值则游标可以继续向右
            } else if (key == cursor->right->key) { // 如果等于则表明已经找到节点
                if (cursor->right->value == "null")
                    return "";
                return cursor->right->value;
            } else if (key < cursor->right->key) { // 如果小于则表明不存在该节点
                flag = false;//return "";
                break;
            }
        }
    }
//    return ""; // 完成遍历返回false;
    std::string result;
    if(!levels.empty()&&levels[0]!=0)
    {
        for (uint64_t i = levels[0]-1; i >=0 && i!=UINT64_MAX; i--) {
            if(inRange(0,i,key,key))
                if(search(0,i,key,result))
                    return result;
        }
    }

    for(uint64_t i = 1;i < levels.size();i++)
    {
        for(uint64_t j = 0;j < levels[i];j++)
        {
            if(inRange(i,j,key,key))
            if(search(i,j,key,result))
                return result;
        }
    }

    return "";
}
/**
 * Delete the given key-value pair if it exists.
 * Returns false iff the key is not found.
 */
bool KVStore::del(uint64_t key)
{
    bool flag=false;
    node* cursor = head; // 获得游标
    node* pre_head = nullptr; // 上一行的头指针，删除行时使用
    while (true) {
        node* cur_head = cursor; // 当前行头指针
        if (pre_head != nullptr) {
            cur_head->up = nullptr;
            pre_head->down = nullptr; // 解除上下级的指针
            delete pre_head;
            pre_head = nullptr; // 指针归0
            lvl_num--; // 层数-1
            head = cur_head; // 重新指定起始指针
        }
        while (cursor != nullptr && cursor->right != nullptr) { // 在当前行中查询key
            if (key == cursor->right->key) {
                if(cursor->right->value=="null")
                    return false;
                node* delptr = cursor->right;
                cursor->right = cursor->right->right;
                delete delptr; // 析构找到的节点
                flag = true;
            }
            cursor = cursor->right;
        }
        if (cur_head->right == nullptr) { // 判断当前行是否还存在其它元素，如果不存在则删除该行并将整个跳跃表降维
            pre_head = cur_head;
        }
        if (cur_head->down == nullptr) {
            break;
        }
        else {
            cursor = cur_head->down;
        }
    }
    if(flag) nodes--;
    std::string result;
    bool deFlag = false;
    if(!deFlag&&!flag)
    {
        if(!levels.empty()&&levels[0]!=0)
        {
            for (uint64_t i = levels[0]-1; i >=0 && i!=UINT64_MAX; i--) {
                if(inRange(0,i,key,key))
                    if(search(0,i,key,result)){
                        if(result == "") {
                            deFlag= true;
                            break;
                        } else
                        {
                            flag = true;
                            break;
                        }
                    }
            }
        }
    }

    if(!deFlag&&!flag)
    {
        for(uint64_t i = 1;i < levels.size();i++)
        {
            for(uint64_t j = 0;j < levels[i];j++)
            {
                if(inRange(i,j,key,key))
                    if(search(i,j,key,result)){
                        if(result == "") {
                            deFlag= true;
                            break;
                        } else
                        {
                            flag = true;
                            break;
                        }
                    }
            }
            if(deFlag||flag) break;
        }
    }
    if(deFlag)
        return false;
    if(flag)
        put(key,"null");
    return flag;
}

/**
 * This resets the kvstore. All key-value pairs should be removed,
 * including memtable and all sstables files.
 */
void KVStore::clearSkipList(){
    nodes = 0;
    node* cursor = head;
    node* next_head = head->down;
    while(next_head != nullptr)
    {
        cursor = next_head;
        next_head = next_head->down;
        while(cursor != nullptr)
        {
            node* pre_cur = cursor;
            cursor = pre_cur->right;
            delete pre_cur;
        }
    }
    lvl_num = 1;
    head = new node();
}

void KVStore::reset() {
    clearSkipList();

    for (int i = 0; i < levels.size(); ++i) {
        for (int j = 0; j < levels[i]; ++j) {
            std::string file = content;//"..\\data\\level";
            file.append("/level");
            file.append(std::to_string(i));
            file.append("/table");
            file.append(std::to_string(j));
            remove(file);
        }
        std::string dir = content;//"..\\data\\level";
        dir.append("/level");
        dir.append(std::to_string(i));
        remove(dir);
    }
    levels.clear();
}

void KVStore::tranToSST() {
    if(levels.empty()) {
        levels.push_back(0);
        create_directory("..\\data\\level0");
    }
    uint64_t files = levels[0];
    levels[0]++;
    node* cursor = head;
    while (cursor->down != nullptr) {
        cursor = cursor->down;
    }
    cursor = cursor->right;
    SSTnode *theNode = new SSTnode (cursor->key,cursor->value);
    cursor = cursor->right;
    SSTnode *cur = theNode,*new_cur;
    while (cursor != nullptr)
    {
        new_cur = new SSTnode (cursor->key,cursor->value);
        cur->next = new_cur;
        cur = new_cur;
        new_cur = nullptr;
        cursor = cursor->right;
    }
    writeTable(theNode,0,files,num);
    SSTnode *TNode = theNode,*DNode;
    while (TNode)
    {
        DNode = TNode;
        TNode = TNode->next;
        if(DNode) delete DNode;
    }
    if(levels[0]>=3)
    {
        compaction(0);
    }
}

void KVStore::compaction(uint64_t lev) {
    uint64_t min = INT64_MAX,max = 0;
    uint64_t nSort = 0;
    vector<uint64_t > nowSort,hiSort;
    vector<uint64_t> nNodes;
    SSTnode **NodeList;
    if(lev==0)
    {
        getRange(0,0,min,max);
        getRange(0,1,min,max);
        getRange(0,2,min,max);
        nSort +=3;
        nowSort.push_back(2);
        nowSort.push_back(1);
        nowSort.push_back(0);
        levels[0] = 0;
    } else{
        for (int i = exp2(lev+1); i < levels[lev]; ++i) {
            getRange(lev,i,min,max);
            nSort +=1;
            nowSort.push_back(i);
        }
        levels[lev] = exp2(lev+1);
    }
    if(levels.size()-1>lev)
    {
        for (uint64_t i = 0; i < levels[lev + 1]; ++i) {
            if(inRange(lev+1,i,min,max))
            {
                nSort+=1;
                hiSort.push_back(i);
            }
        }
    }
    NodeList = new SSTnode*[nSort];
    for(uint64_t i = 0;i < nowSort.size();i++)
    {
        NodeList[i] = new SSTnode;
        getTable(NodeList[i],lev,nowSort[i]);
    }
    uint64_t nowSize = nowSort.size();
    for(uint64_t i = 0;i < hiSort.size();i++)
    {
        NodeList[nowSize+i] = new SSTnode;
        uint64_t n = getTable(NodeList[nowSize+i],lev+1,hiSort[i]);
        nNodes.push_back(n);
    }
    SSTnode *new_node = nullptr;
    SSTnode *fiNode = nullptr;
    uint64_t numOfNodes = 0;
    while (true)
    {
        bool flag = false;
        uint64_t k = INT64_MAX;
        uint64_t a = INT64_MAX;
        for(int i = 0; i< nSort;i++)
        {
            if(NodeList[i]== nullptr)
                continue;
            flag= true;
            if(NodeList[i]->key < k)
            {
                a = i;
                k = NodeList[i]->key;
                continue;
            }
            if(NodeList[i]->key == k)
            {
                SSTnode *dNode = NodeList[i];
                NodeList[i] = NodeList[i]->next;
                if(dNode) delete dNode;
            }
        }
        if(!flag)
            break;
        if(new_node){
            new_node->next=new SSTnode(NodeList[a]->key,NodeList[a]->value);
            new_node = new_node->next;
        }
        else
        {
            new_node = new SSTnode(NodeList[a]->key,NodeList[a]->value);
            fiNode = new_node;
        }
        numOfNodes++;
        SSTnode *dNode = NodeList[a];
        NodeList[a] = NodeList[a]->next;
        if(dNode) delete dNode;
    }
    if(levels.size()-1<=lev){
        levels.push_back(0);
        std::string dir=content;//("..\\data\\level");
        dir.append("/level");
        dir.append(std::to_string(lev+1));
        create_directory(dir);
    }
    for (int i = 0; i < hiSort.size(); ++i) {
        uint64_t t;
        t = hiSort[i];
        writeTable(fiNode,lev+1,t,nNodes[i]);
        for (int j = 0; j < nNodes[i]; ++j) {
            SSTnode *dNode = fiNode;
            fiNode = fiNode->next;
            if(dNode) delete dNode;
        }
        numOfNodes -= nNodes[i];
    }
    for(uint64_t i = 0;numOfNodes > 0;i++){
        levels[lev+1]++;
        uint64_t N;
        N = (numOfNodes<num)?numOfNodes:num;
        numOfNodes -= N;
        writeTable(fiNode,lev+1,levels[lev+1]-1,N);
        for (int j = 0; j < N; ++j) {
            SSTnode *dNode=fiNode;
            fiNode = fiNode->next;
            if(dNode) delete dNode;
        }
    }
    if(levels[lev+1] > exp2(lev+2)) {
        compaction(lev + 1);
    }
}

void KVStore::getRange(uint64_t level, uint64_t table, uint64_t &min, uint64_t &max) {
    uint64_t mmin = INT64_MAX,mmax = -1;
    std::string file = content;//"..\\data\\level";
    file.append("/level");
    file.append(std::to_string(level));
    file.append("/table");
    file.append(std::to_string(table));

    ifstream inFile(file,ios::in|ios::binary);
    uint64_t N = 0,getLenth = 0;
    inFile.seekg(-sizeof(uint64_t),ios::end);
    inFile.read((char*)&getLenth, sizeof(uint64_t));
    inFile.seekg(0,ios::beg);
    inFile.read((char*)&N,sizeof(N));
    inFile.seekg(getLenth+N*2*sizeof(uint64_t),ios::cur);
    inFile.read((char*)&mmin, sizeof(mmin));
    if(N==1)
    {
        mmax = mmin;
        return;
    }
    inFile.seekg(((N-2)*2+1)* sizeof(uint64_t),ios::cur);
    inFile.read((char*)&mmax,sizeof(mmax));
    inFile.seekg(0,ios::beg);
    min = (mmin<min)?mmin:min;
    max = (mmax>max)?mmax:max;
}

bool KVStore::inRange(uint64_t level, uint64_t table, uint64_t min, uint64_t max) {
    uint64_t mmin = INT64_MAX,mmax = 0;
    getRange(level,table,mmin,mmax);
    return !((mmax < min) || (mmin > max));
}

uint64_t KVStore::getTable(KVStore::SSTnode *Node, uint64_t level, uint64_t table) {
    std::string file = content;//"..\\data\\level";
    file.append("/level");
    file.append(std::to_string(level));
    file.append("/table");
    file.append(std::to_string(table));

    ifstream inFile(file,ios::in|ios::binary);
    uint64_t N = 0;
    inFile.read((char*)&N,sizeof(N));
    uint64_t length = 0;

    inFile.read((char*)&Node->key,sizeof(Node->key));
    inFile.read((char*)&length,sizeof(length));
    Node->value.resize(length);
    inFile.read(&Node->value[0],length);
    SSTnode *cur = Node,*new_cur;
    for (int i = 0; i < N-1; ++i) {
        new_cur = new SSTnode;
        inFile.read((char*)&new_cur->key,sizeof(new_cur->key));
        inFile.read((char*)&length,sizeof(length));
        new_cur->value.resize(length);
        inFile.read(&new_cur->value[0],length);
        cur = cur->next = new_cur;
    }
    remove(file);

    return N;
}

void KVStore::writeTable(KVStore::SSTnode *Node, uint64_t level, uint64_t table, uint64_t Num) {
    std::string file = content;//"..\\data\\level";
    file.append("/level");
    file.append(std::to_string(level));
    file.append("/table");
    file.append(std::to_string(table));


    vector<uint64_t> len;
    uint64_t sumLength = 0;
    ofstream outFile(file,ios::out|ios::binary); //创造文件
    SSTnode *cur = Node;
    outFile.write((char*)&Num,sizeof(Num));
    for(uint64_t i=0;i< Num;i++)
    {
        uint64_t length = Node->value.length();
        len.push_back(length);
        sumLength += length;
        outFile.write((char*)&Node->key,sizeof(Node->key));
        outFile.write((char *)&length,sizeof(length));
        outFile.write(Node->value.c_str(),length);
        Node = Node->next;
    }
    uint64_t tmpLength = sumLength;
    for(uint64_t j=0;j<Num;j++)
    {
        outFile.write((char*)&cur->key,sizeof(uint64_t));
        uint64_t _size = tmpLength + (Num-j)*2*sizeof(uint64_t)+2*(j+1)*sizeof(uint64_t);  //num-j个数据，j+1个索引
        outFile.write((char*)&_size,sizeof(uint64_t));
        tmpLength-=len[j];
        cur = cur->next;
    }
    outFile.write((char*)&sumLength, sizeof(sumLength));
    outFile.close();
}

bool KVStore::search(uint64_t level, uint64_t table, uint64_t key, std::string &Result) {
    std::string file = content;//"..\\data\\level";
    file.append("/level");
    file.append(std::to_string(level));
    file.append("/table");
    file.append(std::to_string(table));

    bool flag = false;
    ifstream inFile(file,ios::in|ios::binary);
    uint64_t N = 0,getLenth = 0;

    inFile.seekg(-sizeof(uint64_t),ios::end);
    inFile.read((char*)&getLenth, sizeof(uint64_t));
    inFile.seekg(0,ios::beg);

    inFile.read((char*)&N,sizeof(N));
    inFile.seekg(getLenth+N*2*sizeof(uint64_t),ios::cur);
    uint64_t Mkey,offset,Ckey;
    for(uint64_t j=0;j<N;j++)
    {
        uint64_t length;
        inFile.read((char*)&Mkey,sizeof(uint64_t));
        inFile.read((char*)&offset,sizeof(uint64_t));
        if(Mkey==key) {
            flag = true;
            inFile.seekg(-offset, ios::cur);
            inFile.read((char*)&Ckey, sizeof(Ckey));
            inFile.read((char *)&length,sizeof(length));
            Result.resize(length);
            inFile.read(&Result[0],length);
            break;
        }

    }
    inFile.close();
    if(Result == "null")
        Result = "";
    return flag;
}