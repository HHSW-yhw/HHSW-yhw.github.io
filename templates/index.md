# 算法模板

按顺序整理我常用的算法模板。右侧的目录（On this page）可以直接跳到想看的那个模板。

<!--
  以后新增模板：在下面按同样的格式继续加小节就行。

  ## 模板名

  （正文）

  右侧目录会自动出现新条目，不需要改任何配置文件。
-->

## STL 与常用函数

### 常用 typedef

```cpp
typedef long long LL;
typedef unsigned long long ULL;
typedef pair<int, int> PII;
typedef pair<LL, LL> PLL;
typedef pair<PII, LL> PIII;
```

### 输入输出加速

在 `main()` 开头加上这几行：

```cpp
ios::sync_with_stdio(false);
cin.tie(nullptr);
cout.tie(nullptr);
```

关掉 C 与 C++ 标准流的同步、解除 `cin` 与 `cout` 的绑定，读写速度会明显变快。

### 快读快写

```cpp
inline LL read()
{
    LL x = 0, f = 1;
    char ch = getchar();
    while (ch < '0' || ch > '9')
    {
        if (ch == '-')
            f = -1;
        ch = getchar();
    }
    while (ch >= '0' && ch <= '9')
        x = x * 10 + ch - '0', ch = getchar();
    return x * f;
}

void write(LL x)
{
    if (x < 0)
        putchar('-'), x = -x;
    if (x > 9)
        write(x / 10);
    putchar(x % 10 + '0');
    return;
}
```

### string（字符串）

```cpp
string s = "hello";

s.size();                     // 长度（返回 size_t，无符号数）
s.length();                   // 同 size()
s.empty();                    // 是否为空
s.clear();                    // 清空
s.substr(pos, len);           // 从 pos 起取 len 个字符，len 省略则取到末尾
s.find(t);                    // 找子串 t，返回下标；找不到返回 string::npos
s.c_str();                    // 返回字符串所在字符数组的起始地址
s.back();                     // 最后一个字符
s.pop_back();                 // 删除最后一个字符
s.push_back(c);               // 末尾追加一个字符

swap(s[0], s[1]);             // 交换两个字符
reverse(s.begin(), s.end());  // 原地翻转

tolower(c);                   // 大写 -> 小写
toupper(c);                   // 小写 -> 大写
```

### 排序

```cpp
sort(a, a + n);                     // 数组升序
sort(v.begin(), v.end());           // vector 升序
sort(a, a + n, greater<int>());     // 降序
sort(a, a + tt - 1, greater<int>()); // 让数组倒序排序
```

自定义排序：

```cpp
struct Node { int id, val; };

bool cmp(const Node& a, const Node& b) {
    if (a.val != b.val) return a.val > b.val;  // 主关键字：val 降序
    return a.id < b.id;                        // 次关键字：id 升序
}

sort(arr, arr + n, cmp);
```

### 二分：lower_bound / upper_bound

```cpp
// 数组 a[0..n-1]，要求区间已排好序
int p = lower_bound(a, a + n, x) - a;   // 第一个 >= x 的下标
int q = upper_bound(a, a + n, x) - a;   // 第一个 >  x 的下标

// vector
auto it = lower_bound(v.begin(), v.end(), x);

// x 出现的次数
int cnt = upper_bound(a, a + n, x) - lower_bound(a, a + n, x);
```

| 功能 | lower_bound | upper_bound |
| --- | --- | --- |
| 查找目标元素 | 返回第一个**不小于**目标值的位置 | 返回第一个**大于**目标值的位置 |
| 返回值 | 指向第一个不小于目标值的元素的迭代器 | 指向第一个大于目标值的元素的迭代器 |

### vector

```cpp
vector<int> v;                    // 一维，动态长度
v.push_back(1);
v.size();
v.empty();
v.clear();
v.front(); v.back();              // 首 / 尾元素
v.begin(); v.end();               // 迭代器
v[0];                             // 下标访问

vector<int> a(n, 0);              // 一维，长度 n，初值 0

vector<vector<int>> g(n);         // 二维：n 行，每行是空 vector
g[1].push_back(5);                // 往第 1 行末尾插入 5

vector<vector<int>> f(n, vector<int>(m, 0));   // 二维：n 行 m 列，初值 0

// 结构体数组：vector 数组 + emplace_back（注意要写上结构体名）
struct pig { int b, val; };
vector<pig> b[100005];
b[a[i]].emplace_back(pig{ e, f });
```

vector 支持比较运算，按字典序比较。

### pair

```cpp
pair<int, int> p = {1, 2};

p.first;      // 第一个元素
p.second;     // 第二个元素
```

pair 支持比较运算，以 `first` 为第一关键字、`second` 为第二关键字（字典序）。

### queue（队列）

```cpp
queue<int> q;

q.push(x);    // 向队尾插入一个元素
q.front();    // 返回队头元素
q.back();     // 返回队尾元素
q.pop();      // 弹出队头元素（无返回值）
q.size();
q.empty();
```

### stack（栈）

```cpp
stack<int> s;

s.push(x);    // 向栈顶插入一个元素
s.top();      // 返回栈顶元素
s.pop();      // 弹出栈顶元素（无返回值）
s.size();
s.empty();
```

### deque（双端队列）

```cpp
deque<int> dq;

dq.push_back(x);  dq.pop_back();     // 后端插入 / 删除
dq.push_front(x); dq.pop_front();    // 前端插入 / 删除
dq.front();       dq.back();         // 首 / 尾元素
dq[1];            dq.at(1);          // 随机访问
dq.begin();       dq.end();
dq.size(); dq.empty(); dq.clear();
```

### priority_queue（堆）

```cpp
priority_queue<int> pq;                                // 大根堆（默认）
priority_queue<int, vector<int>, greater<int>> q;      // 小根堆

pq.push(3);
pq.top();     // 堆顶
pq.pop();     // 弹出堆顶（无返回值）
pq.size();
pq.empty();
```

结构体版本：

```cpp
struct Node { int d, x; };

struct cmp {
    bool operator()(const Node& a, const Node& b) const {
        return a.d > b.d;          // d 小的先出队
    }
};

priority_queue<Node, vector<Node>, cmp> pq;
```

另一种写法：在结构体里重载 `>`，再用 `greater<>`。

```cpp
typedef struct pst {
    int dis;
    int id;
    int cnt;
    bool operator > (const pst& other) const {
        return dis > other.dis;    // 按 dis 从小到大排序
    }
} PII2;

priority_queue<PII2, vector<PII2>, greater<PII2>> heap;
```

### set / multiset

| 特性 | set | multiset |
| --- | --- | --- |
| 允许重复元素 | 不允许 | 允许 |
| 排序 | 自动排序（升序） | 自动排序（升序） |
| 查找、插入、删除复杂度 | O(log n) | O(log n) |
| 访问元素 | 通过迭代器访问，没有索引访问 | 通过迭代器访问，没有索引访问 |
| 常用操作 | insert(), find(), erase() | insert(), find(), erase(), count() |

```cpp
set<int> s;
s.insert(3);
s.erase(3);
s.find(3);            // 返回迭代器，找不到返回 s.end()
s.count(3);           // 0 或 1
s.lower_bound(3);     // 第一个 >= 3 的元素
s.upper_bound(3);     // 第一个 >  3 的元素

for (int x : s) cout << x << ' ';   // 从小到大遍历
```

`erase()` 的两种重载：

```cpp
s.erase(x);           // 输入一个数 x：删除所有 x，O(k + log n)
s.erase(it);          // 输入一个迭代器：删除这个迭代器指向的元素
```

### map

```cpp
map<string, int> mp;

mp["apple"] = 1;              // 键不存在则插入（值默认初始化），存在则覆盖
mp.insert({"banana", 2});     // 键已存在时 insert 不生效
mp.at("apple");               // 键不存在会抛异常
mp.find("apple");             // 返回迭代器，找不到返回 mp.end()
mp.count("apple");            // 0 或 1
mp.erase("apple");            // 按键删除
mp.size();
mp.clear();
mp.swap(other);               // 交换两个 map

// 遍历：->first 是键，->second 是值
for (auto& p : mp) cout << p.first << ' ' << p.second << '\n';
```

`multimap` 允许重复键，用法与 map 相同，但**不支持** `[]` 操作。

### unordered_set / unordered_map

```cpp
unordered_set<int> us;
unordered_map<string, int> um;
```

与 `set` / `map` 类似，增删改查平均 O(1)、最坏 O(n)，底层是哈希表；不支持 `lower_bound()` / `upper_bound()`，迭代器的 `++` / `--` 也不可用。

### bitset

```cpp
bitset<10000> s;      // 定长，长度必须编译期确定

s.count();            // 返回有多少个 1
s.any();              // 判断是否至少有一个 1
s.none();             // 判断是否全为 0
s.all();              // 判断是否全为 1

s.set();              // 把所有位置成 1
s.set(k, v);          // 将第 k 位变成 v
s.reset();            // 把所有位变成 0
s.flip();             // 等价于 ~
s.flip(k);            // 把第 k 位取反

s.to_ulong();         // 转成 unsigned long
s.to_string();        // 转成二进制字符串
```

支持的运算符：`~`、`&`、`|`、`^`、`>>`、`<<`、`==`、`!=`、`[]`。

### list（双向链表）

```cpp
#include <list>

list<int> lt = {3, 1, 4, 1, 5};

lt.front(); lt.back();          // 不支持 []，只能访问头尾

lt.push_front(0); lt.push_back(9);
lt.pop_front();   lt.pop_back();

auto it = lt.begin();
advance(it, 2);                 // 移动到索引 2
lt.insert(it, 100);
it = lt.erase(it);

lt.remove(1);                   // 删除所有值为 1 的元素
lt.sort();                      // 升序排序（不可用 std::sort）
lt.reverse();                   // 反转
lt.unique();                    // 去除相邻重复元素

lt.splice(lt.begin(), other);   // 把 other 的元素移动到 lt.begin() 处
lt.merge(l2);                   // 合并两个已排序链表

lt.empty(); lt.size(); lt.clear();
```

### 自定义键类型（哈希）

为 `pair` 定义哈希函数：

```cpp
#include <functional>   // 需包含此头文件使用 hash

// 为 PII（pair<LL, LL>）定义哈希函数
struct HashPII {
    size_t operator()(const PII& p) const {
        size_t hash1 = hash<LL>()(p.first);
        size_t hash2 = hash<LL>()(p.second);
        return hash1 ^ (hash2 << 1);
    }
};

// 为 PIII（pair<PII, LL>）定义哈希函数
struct HashPIII {
    size_t operator()(const PIII& p) const {
        size_t hash_pii = HashPII()(p.first);
        size_t hash_ll = hash<LL>()(p.second);
        return hash_pii ^ (hash_ll << 1);
    }
};
```

声明 `unordered_map` 时指定哈希函数：

```cpp
// 为 PIII 类型的键指定 HashPIII 哈希函数
unordered_map<PIII, LL, HashPIII> mp;
// 为 PII 类型的键指定 HashPII 哈希函数
unordered_map<PII, LL, HashPII> mp1;
```

不依赖 PII 的哈希、直接拆成三个元素组合：

```cpp
struct HashPIII2 {
    size_t operator()(const PIII& p) const {
        LL a = p.first.first;
        LL b = p.first.second;
        LL c = p.second;

        size_t hash_a = hash<LL>()(a);
        size_t hash_b = hash<LL>()(b);
        size_t hash_c = hash<LL>()(c);

        size_t seed = 0;
        seed ^= hash_a + 0x9e3779b9 + (seed << 6) + (seed >> 2);
        seed ^= hash_b + 0x9e3779b9 + (seed << 6) + (seed >> 2);
        seed ^= hash_c + 0x9e3779b9 + (seed << 6) + (seed >> 2);
        return seed;
    }
};
```

`unordered_set` 同样需要显式指定哈希函数类型，并配套实现 `operator==`：

```cpp
typedef struct line {
    LL a, b, c;

    struct Hashline {
        size_t operator()(const line& p) const {
            LL a = p.a, b = p.b, c = p.c;
            size_t hash_a = hash<LL>()(a);
            size_t hash_b = hash<LL>()(b);
            size_t hash_c = hash<LL>()(c);
            size_t seed = 0;
            seed ^= hash_a + 0x9e3779b9 + (seed << 6) + (seed >> 2);
            seed ^= hash_b + 0x9e3779b9 + (seed << 6) + (seed >> 2);
            seed ^= hash_c + 0x9e3779b9 + (seed << 6) + (seed >> 2);
            return seed;
        }
    };

    // 判断两个 line 是否相等
    bool operator==(const line& other) const {
        return a == other.a && b == other.b && c == other.c;
    }
} line;

unordered_set<line, line::Hashline> st;
```

放进 `set` 时，比较逻辑要把所有字段都比一遍：

```cpp
bool operator<(const line &x) const {
    if (a != x.a) return a < x.a;
    if (b != x.b) return b < x.b;
    return c < x.c;
}
```

### 随机数

```cpp
#include <cstdlib>
#include <ctime>

srand(time(0));           // 随机数种子
int res = rand() % 3;     // 0 ~ 2
```

`rand()` 的范围上限是 `RAND_MAX`（多数实现为 32767），需要更大范围时用 `mt19937` / `mt19937_64`：

```cpp
#include <random>

unsigned long long n;
mt19937_64 eng(time(0));      // 64 位随机数引擎
n = eng();
```

### 其他常用函数

```cpp
memset(a, 0, sizeof a);           // 头文件 <cstring>，按字节填充
memset(dis, 0x3f, sizeof dis);    // 每个 int 填成 0x3f3f3f3f

to_string(n);                     // 数字 -> 字符串
stoi(s);                          // 字符串 -> 整数

reverse(a, a + n);                // 翻转数组

max({a, b, c, d});                // 多个数取最大值，注意加大括号

cout << fixed << setprecision(6) << 123.456789 << "\n";   // 输出固定 6 位小数
                                                          // 需包含头文件 <iomanip>

const int INF = 0x3f3f3f3f;       // 常用作 int 的无穷大
                                  // -0x3f3f3f3f 表示负无穷

// 多组输入输出，以 EOF 结尾
int a, b, sum;
while (scanf("%d%d", &a, &b) != EOF) {
    sum = a + b;
    printf("%d\n", sum);
}

// 每次读入两个「以空白分隔」的字符串（不是按行读），读到 EOF 为止
string s1, s2;
while (cin >> s1 >> s2) { /* ... */ }

// 读入多行字符串以 EOF 结尾
string s1;
while (cin >> s1) { /* ... */ }
```

### 数据类型与数学函数

| 函数名 | 适用数据类型 | 头文件 | 说明 |
| --- | --- | --- | --- |
| abs() | int / short / char | \<cstdlib\> / \<stdlib.h\> | 小整型专用，处理 long / long long 会截断 |
| labs() | long | \<cstdlib\> / \<stdlib.h\> | 长整型专用 |
| llabs() | long long | \<cstdlib\> / \<stdlib.h\> | 长长整型专用（C++11 起） |
| fabs() | float / double | \<cmath\> / \<math.h\> | 浮点型专用，不能用 abs 替代 |
| fabsl() | long double | \<cmath\> / \<math.h\> | 长双精度浮点型专用 |

| 类型 | 位宽 | 存储方式 | 最小值 | 最大值 | 范围 |
| --- | --- | --- | --- | --- | --- |
| long long | 64 位 | 有符号（补码） | -9223372036854775808 | 9223372036854775807 | -2^63 ~ 2^63 - 1 |
| unsigned long long | 64 位 | 无符号 | 0 | 18446744073709551615 | 0 ~ 2^64 - 1 |

`<cmath>` 中的三角函数，参数与返回值都是 `double`，**角度以弧度为单位**：

```cpp
sin(x);        // 正弦
cos(x);        // 余弦
tan(x);        // 正切
asin(x);       // 反正弦，x ∈ [-1, 1]
acos(x);       // 反余弦，x ∈ [-1, 1]
atan(x);       // 反正切
atan2(y, x);   // y / x 的反正切，可确定象限
```

角度转弧度：`弧度 = 角度 × M_PI / 180`。

```cpp
#include <iostream>
#include <cmath>
#define _USE_MATH_DEFINES   // 用于 M_PI

int main() {
    double degree = 90.0;
    double radian = degree * M_PI / 180.0;
    std::cout << "sin(90°) = " << sin(radian) << std::endl;   // 输出 1.0
    return 0;
}
```

## 基础算法

### 快速排序

```cpp
void quick_sort(int q[], int l, int r)
{
    if (l >= r) return;

    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j)
    {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j), quick_sort(q, j + 1, r);
}
```

### 归并排序

```cpp
void merge_sort(int q[], int l, int r)
{
    if (l >= r) return;

    int mid = l + r >> 1;
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r)
        if (q[i] <= q[j]) tmp[k ++ ] = q[i ++ ];
        else tmp[k ++ ] = q[j ++ ];

    while (i <= mid) tmp[k ++ ] = q[i ++ ];
    while (j <= r) tmp[k ++ ] = q[j ++ ];

    for (i = l, j = 0; i <= r; i ++, j ++ ) q[i] = tmp[j];
}
```

### 整数二分

```cpp
bool check(int x) { /* ... */ }   // 检查 x 是否满足某种性质

// 区间 [l, r] 被划分成 [l, mid] 和 [mid + 1, r] 时使用
int bsearch_1(int l, int r)
{
    while (l < r)
    {
        int mid = l + r >> 1;
        if (check(mid)) r = mid;
        else l = mid + 1;
    }
    return l;
}

// 区间 [l, r] 被划分成 [l, mid - 1] 和 [mid, r] 时使用
int bsearch_2(int l, int r)
{
    while (l < r)
    {
        int mid = l + r + 1 >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    return l;
}
```

### 浮点数二分

```cpp
bool check(double x) { /* ... */ }   // 检查 x 是否满足某种性质

double bsearch_3(double l, double r)
{
    const double eps = 1e-6;         // eps 表示精度，取决于题目对精度的要求
    while (r - l > eps)
    {
        double mid = (l + r) / 2;
        if (check(mid)) r = mid;
        else l = mid;
    }
    return l;
}
```

### 高精度加法

```cpp
// C = A + B，A >= 0，B >= 0
vector<int> add(vector<int> &A, vector<int> &B)
{
    if (A.size() < B.size()) return add(B, A);

    vector<int> C;
    int t = 0;
    for (int i = 0; i < A.size(); i ++ )
    {
        t += A[i];
        if (i < B.size()) t += B[i];
        C.push_back(t % 10);
        t /= 10;
    }

    if (t) C.push_back(t);
    return C;
}
```

### 高精度减法

```cpp
// C = A - B，满足 A >= B，A >= 0，B >= 0
vector<int> sub(vector<int> &A, vector<int> &B)
{
    vector<int> C;
    for (int i = 0, t = 0; i < A.size(); i ++ )
    {
        t = A[i] - t;
        if (i < B.size()) t -= B[i];
        C.push_back((t + 10) % 10);
        if (t < 0) t = 1;
        else t = 0;
    }

    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
```

### 高精度乘低精度

```cpp
// C = A * b，A >= 0，b >= 0
vector<int> mul(vector<int> &A, int b)
{
    vector<int> C;

    int t = 0;
    for (int i = 0; i < A.size() || t; i ++ )
    {
        if (i < A.size()) t += A[i] * b;
        C.push_back(t % 10);
        t /= 10;
    }

    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
```

### 高精度除以低精度

```cpp
// A / b = C ... r，A >= 0，b > 0
vector<int> div(vector<int> &A, int b, int &r)
{
    vector<int> C;
    r = 0;
    for (int i = A.size() - 1; i >= 0; i -- )
    {
        r = r * 10 + A[i];
        C.push_back(r / b);
        r %= b;
    }
    reverse(C.begin(), C.end());
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
```

### 一维前缀和

```cpp
S[i] = a[1] + a[2] + ... + a[i]
a[l] + ... + a[r] = S[r] - S[l - 1]
```

### 二维前缀和

```cpp
S[i, j] = 第 i 行 j 列格子左上部分所有元素的和

// 以 (x1, y1) 为左上角、(x2, y2) 为右下角的子矩阵的和
S[x2, y2] - S[x1 - 1, y2] - S[x2, y1 - 1] + S[x1 - 1, y1 - 1]
```

### 一维差分

```cpp
// 给区间 [l, r] 中的每个数加上 c
B[l] += c, B[r + 1] -= c
```

### 二维差分

```cpp
// 给以 (x1, y1) 为左上角、(x2, y2) 为右下角的子矩阵中的所有元素加上 c
S[x1, y1] += c, S[x2 + 1, y1] -= c, S[x1, y2 + 1] -= c, S[x2 + 1, y2 + 1] += c
```

### 位运算

```cpp
// 求 n 的第 k 位数字
n >> k & 1

// 返回 n 的最后一位 1
lowbit(n) = n & -n
```

### 双指针

```cpp
for (int i = 0, j = 0; i < n; i ++ )
{
    while (j < i && check(i, j)) j ++ ;

    // 具体问题的逻辑
}
```

常见问题分类：

1. 对于一个序列，用两个指针维护一段区间；
2. 对于两个序列，维护某种次序，比如归并排序中合并两个有序序列的操作。

### 离散化

```cpp
vector<int> alls;   // 存储所有待离散化的值

sort(alls.begin(), alls.end());                            // 将所有值排序
alls.erase(unique(alls.begin(), alls.end()), alls.end());   // 去掉重复元素

// 二分求出 x 对应的离散化的值
int find(int x)     // 找到第一个大于等于 x 的位置
{
    int l = 0, r = alls.size() - 1;
    while (l < r)
    {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return r + 1;   // 映射到 1, 2, ... n
}
```

### 区间合并

```cpp
// 将所有存在交集的区间合并
void merge(vector<PII> &segs)
{
    vector<PII> res;

    sort(segs.begin(), segs.end());

    int st = -2e9, ed = -2e9;
    for (auto seg : segs)
        if (ed < seg.first)
        {
            if (st != -2e9) res.push_back({st, ed});
            st = seg.first, ed = seg.second;
        }
        else ed = max(ed, seg.second);

    if (st != -2e9) res.push_back({st, ed});

    segs = res;
}
```

### 字符串哈希

```cpp
typedef unsigned long long ULL;
ULL h[N], p[N];   // h[k] 存储字符串前 k 个字母的哈希值，p[k] 存储 P^k mod 2^64

// 初始化
p[0] = 1;
for (int i = 1; i <= n; i ++ )
{
    h[i] = h[i - 1] * P + str[i];
    p[i] = p[i - 1] * P;
}

// 计算子串 str[l ~ r] 的哈希值
ULL get(int l, int r)
{
    return h[r] - h[l - 1] * p[r - l + 1];
}
```

把字符串看成 P 进制数，P 的经验值是 131 或 13331；模数取 2^64，直接用 `unsigned long long` 存储，溢出结果就是取模结果。

### KMP

```cpp
// s[] 是长文本，p[] 是模式串，n 是 s 的长度，m 是 p 的长度
// 求模式串的 next 数组
for (int i = 2, j = 0; i <= m; i ++ )
{
    while (j && p[i] != p[j + 1]) j = ne[j];
    if (p[i] == p[j + 1]) j ++ ;
    ne[i] = j;
}

// 匹配
for (int i = 1, j = 0; i <= n; i ++ )
{
    while (j && s[i] != p[j + 1]) j = ne[j];
    if (s[i] == p[j + 1]) j ++ ;
    if (j == m)
    {
        j = ne[j];
        // 匹配成功后的逻辑
    }
}
```

### 整数三分

```cpp
long long ternary_search_min_direct(long long l, long long r) {
    while (l < r) {
        long long m1 = l + (r - l) / 3;
        long long m2 = r - (r - l) / 3;

        if (f(m1) < f(m2)) {
            r = m2 - 1;   // 排除 m2 及其右侧
        } else {
            l = m1 + 1;   // 排除 m1 及其左侧
        }
    }
    // 循环结束时必定满足 l == r
    return f(l);          // 此时 l 就是唯一的最优解位置
}
```

### 浮点三分

```cpp
double ternary_search(double l, double r, double eps = 1e-9) {
    while (r - l > eps) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;

        if (f(m1) < f(m2)) {
            r = m2;   // 极小值在 [l, m2]
        } else {
            l = m1;   // 极小值在 [m1, r]
        }
    }
    return f(l);      // 需要极值位置返回 l，需要极值返回 f(l)
}
```

## 数据结构

### 单链表（数组模拟）

```cpp
// head 存储链表头，e[] 存储节点的值，ne[] 存储节点的 next 指针，idx 表示当前用到了哪个节点
int head, e[N], ne[N], idx;

// 初始化
void init()
{
    head = -1;
    idx = 0;
}

// 在链表头插入一个数 a
void insert(int a)
{
    e[idx] = a, ne[idx] = head, head = idx ++ ;
}

// 将头结点删除，需要保证头结点存在
void remove()
{
    head = ne[head];
}
```

### 双链表（数组模拟）

```cpp
// e[] 表示节点的值，l[] 表示节点的左指针，r[] 表示节点的右指针，idx 表示当前用到了哪个节点
int e[N], l[N], r[N], idx;

// 初始化
void init()
{
    // 0 是左端点，1 是右端点
    r[0] = 1, l[1] = 0;
    idx = 2;
}

// 在节点 a 的右边插入一个数 x
void insert(int a, int x)
{
    e[idx] = x;
    l[idx] = a, r[idx] = r[a];
    l[r[a]] = idx, r[a] = idx ++ ;
}

// 删除节点 a
void remove(int a)
{
    l[r[a]] = l[a];
    r[l[a]] = r[a];
}
```

### 双链表（自主定义节点）

```cpp
struct DLinkedNode {
    int key, value;
    DLinkedNode* prev;
    DLinkedNode* next;
    DLinkedNode(): key(0), value(0), prev(nullptr), next(nullptr) {}
    DLinkedNode(int _key, int _value): key(_key), value(_value), prev(nullptr), next(nullptr) {}
};
```

### ListNode（自主定义节点操作）

```cpp
/**
 * ListNode 核心操作模板 (LeetCode/ACM 模式通用)
 */

// 1. 结构定义
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}            // 基础构造
    ListNode(int x, ListNode *n) : val(x), next(n) {}  // 进阶构造
};

// 2. 基础访问与遍历
ListNode *p = head;
while (p) {                 // 遍历直到末尾
    int v = p->val;
    p = p->next;
}
if (p && p->next) { /* 安全访问下一个节点 */ }

// 3. 比较操作
bool isSameNode = (p1 == p2);            // 指针地址比较：是否为同一个内存对象
bool isSameVal  = (p1->val == p2->val);  // 数值比较：存储内容是否相同

// 4. 虚拟头节点（Dummy Head）：处理头节点的增删极其方便
ListNode *dummy = new ListNode(0, head);
ListNode *cur = dummy;      // 此时 cur->next 就是原链表的 head
// ... 执行逻辑 ...
return dummy->next;         // 返回真正的头节点

// 5. 增删
target->next = p->next; p->next = target;                      // 在 p 之后插入 target
ListNode *tmp = p->next; p->next = p->next->next; delete tmp;  // 删除 p 的后继，记得释放内存

// 6. 反转链表
ListNode *prev = nullptr, *curr = head;
while (curr) {
    ListNode *nextTemp = curr->next;
    curr->next = prev;
    prev = curr; curr = nextTemp;
}

// 7. 快慢指针
ListNode *slow = head, *fast = head;
while (fast && fast->next) {
    slow = slow->next;        // 走一步
    fast = fast->next->next;  // 走两步
}   // 结束时 slow 指向中点（或环相关位置）

// 8. 长度统计
int getLen(ListNode* h) {
    int l = 0; while (h) { l++; h = h->next; } return l;
}

// 9. 创建与销毁
ListNode* n1 = new ListNode(1);
ListNode* n2 = new ListNode(2);
n1->next = n2;              // 手动连接
delete n1; delete n2;       // 手动释放
```

### 单调栈

```cpp
cin >> n;
stack<int> s;
for (int i = 1; i <= n; i ++ ) {
    cin >> a[i];
    while (!s.empty() && a[s.top()] <= a[i]) s.pop();
    if (s.empty()) cout << -1 << " ";
    else cout << s.top() << " ";
    s.push(i);
}
```

### 单调队列（滑动窗口）

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 1e6 + 10;
int n, k, a[N];

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    cin >> n >> k;
    for (int i = 1; i <= n; i ++ ) cin >> a[i];

    // 滑动窗口最小值
    deque<int> q;
    for (int i = 1; i <= n; i ++ ) {
        while (!q.empty() && q.front() < i - k + 1) q.pop_front();
        while (!q.empty() && a[q.back()] > a[i]) q.pop_back();
        q.push_back(i);
        if (i >= k) cout << a[q.front()] << " ";
    }
    cout << "\n";

    // 滑动窗口最大值
    deque<int> p;
    for (int i = 1; i <= n; i ++ ) {
        while (!p.empty() && p.front() < i - k + 1) p.pop_front();
        while (!p.empty() && a[p.back()] < a[i]) p.pop_back();
        p.push_back(i);
        if (i >= k) cout << a[p.front()] << " ";
    }
}
```

### Trie

```cpp
int son[N][26], cnt[N], idx;
// 0 号点既是根节点，又是空节点
// son[][] 存储树中每个节点的子节点
// cnt[] 存储以每个节点结尾的单词数量

// 插入一个字符串
void insert(char *str)
{
    int p = 0;
    for (int i = 0; str[i]; i ++ )
    {
        int u = str[i] - 'a';
        if (!son[p][u]) son[p][u] = ++ idx;
        p = son[p][u];
    }
    cnt[p] ++ ;
}

// 查询字符串出现的次数
int query(char *str)
{
    int p = 0;
    for (int i = 0; str[i]; i ++ )
    {
        int u = str[i] - 'a';
        if (!son[p][u]) return 0;
        p = son[p][u];
    }
    return cnt[p];
}
```

封装成类的写法：

```cpp
class Trie {
    int son[3000][26] = {0}, idx, cnt[3000] = {0};
public:
    Trie() {}

    void insert(string word) {
        int p = 0, sz = word.size();
        for (int i = 0; i < sz; i ++ ) {
            int u = word[i] - 'a';
            if (!son[p][u]) {
                son[p][u] = ++ idx;
            }
            p = son[p][u];
        }
        cnt[p] ++ ;
    }

    bool search(string word) {
        int p = 0, sz = word.size();
        for (int i = 0; i < sz; i ++ ) {
            int u = word[i] - 'a';
            if (!son[p][u]) {
                return false;
            }
            p = son[p][u];
        }
        return cnt[p] > 0;
    }
};
```

### 并查集

**(1) 朴素并查集**

```cpp
int p[N];   // 存储每个点的祖宗节点

// 返回 x 的祖宗节点
int find(int x)
{
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

// 初始化，假定节点编号是 1 ~ n
for (int i = 1; i <= n; i ++ ) p[i] = i;

// 合并 a 和 b 所在的两个集合
p[find(a)] = find(b);
```

**(2) 维护 size 的并查集**

```cpp
int p[N], size[N];
// p[] 存储每个点的祖宗节点，size[] 只有祖宗节点的有意义，表示祖宗节点所在集合中的点的数量

// 返回 x 的祖宗节点
int find(int x)
{
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

// 初始化，假定节点编号是 1 ~ n
for (int i = 1; i <= n; i ++ )
{
    p[i] = i;
    size[i] = 1;
}

// 合并 a 和 b 所在的两个集合
size[find(b)] += size[find(a)];
p[find(a)] = find(b);
```

**(3) 维护到祖宗节点距离的并查集**

```cpp
int p[N], d[N];
// p[] 存储每个点的祖宗节点，d[x] 存储 x 到 p[x] 的距离

// 返回 x 的祖宗节点
int find(int x)
{
    if (p[x] != x)
    {
        int u = find(p[x]);
        d[x] += d[p[x]];
        p[x] = u;
    }
    return p[x];
}

// 初始化，假定节点编号是 1 ~ n
for (int i = 1; i <= n; i ++ )
{
    p[i] = i;
    d[i] = 0;
}

// 合并 a 和 b 所在的两个集合
p[find(a)] = find(b);
d[find(a)] = distance;   // 根据具体问题，初始化 find(a) 的偏移量
```

### 树状数组

```cpp
const int MAXN = 100010;   // 树状数组最大空间一般开到 1e5 + 10

int a[MAXN];   // 原数组
int c[MAXN];   // 树状数组
int n;         // 题目所给的数组 A 数据长度

int lowbit(int x)          // 返回最后一位 1，即 2^k
{
    return x & -x;
}

int query(int x)           // 查询区间 [1, x] 的和
{
    int ans = 0;
    for (int i = x; i; i -= lowbit(i))
        ans += c[i];
    return ans;
}

void add(int x, int v)     // 修改位置 x 的值
{
    for (int i = x; i < MAXN; i += lowbit(i))
        c[i] += v;
}

void init()                // 初始化，O(n log n)
{
    for (int i = 1; i <= n; i ++ )
        add(i, a[i]);
}
```

### 线段树（区间修改 + 懒标记）

```cpp
typedef struct tree {
    LL l, r, sum, lazytag;
} tree;
tree tr[N << 2];
LL arr[N];

void pushup(LL id) {
    tr[id].sum = tr[id << 1].sum + tr[id << 1 | 1].sum;
    return;
}

void pushdown(LL id) {
    if (!tr[id].lazytag) {
        return;
    } else {
        tr[id << 1].lazytag += tr[id].lazytag;
        tr[id << 1 | 1].lazytag += tr[id].lazytag;
        LL mid = (tr[id].l + tr[id].r) >> 1;
        tr[id << 1].sum += (mid - tr[id].l + 1) * tr[id].lazytag;
        tr[id << 1 | 1].sum += (tr[id].r - mid) * tr[id].lazytag;
        tr[id].lazytag = 0;
    }
    return;
}

void build(LL id, LL l, LL r) {
    tr[id].l = l, tr[id].r = r;
    if (l == r) {
        tr[id].sum = arr[l];
        return;
    } else {
        LL mid = (l + r) >> 1;
        build(id << 1, l, mid);
        build(id << 1 | 1, mid + 1, r);
        pushup(id);
    }
    return;
}

// 区间修改：把 [l, r] 上的每个数加上 k
void change(LL id, LL l, LL r, LL k) {
    if (l <= tr[id].l && tr[id].r <= r) {
        tr[id].lazytag += k;
        tr[id].sum += (tr[id].r - tr[id].l + 1) * k;
    } else {
        pushdown(id);
        LL mid = (tr[id].l + tr[id].r) >> 1;
        if (l <= mid) {
            change(id << 1, l, r, k);
        }
        if (r > mid) {
            change(id << 1 | 1, l, r, k);
        }
        pushup(id);
    }
    return;
}

// 区间查询：求 [l, r] 的和
LL query(LL id, LL l, LL r) {
    if (l <= tr[id].l && tr[id].r <= r) {
        return tr[id].sum;
    } else {
        pushdown(id);
        LL mid = (tr[id].l + tr[id].r) >> 1;
        LL sum = 0;
        if (l <= mid) {
            sum += query(id << 1, l, r);
        }
        if (mid < r) {
            sum += query(id << 1 | 1, l, r);
        }
        return sum;
    }
}
```

### 线段树（单点修改，无需懒标记）

```cpp
void change(LL id, LL p, LL k) {
    if (tr[id].l == tr[id].r) {
        tr[id].sum += k;
        return;
    } else {
        LL mid = (tr[id].l + tr[id].r) >> 1;
        if (p <= mid) {
            change(id << 1, p, k);
        } else {
            change(id << 1 | 1, p, k);
        }
        pushup(id);
        return;
    }
}
```

### 平衡树（pb_ds）

```cpp
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

__gnu_pbds::tree<std::pair<int, int>, __gnu_pbds::null_type,
                 std::less<std::pair<int, int>>, __gnu_pbds::rb_tree_tag,
                 __gnu_pbds::tree_order_statistics_node_update>
    trr;

int n;
int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0), cout.tie(0);
    cin >> n;
    int cnt = 0;
    while (n--) {
        int op, x;
        cin >> op >> x;
        if (op == 1) {
            trr.insert({x, cnt++});
        }
        else if (op == 2) {
            auto it = trr.lower_bound({x, 0});
            if (it != trr.end() && it->first == x) {
                trr.erase(it);
            }
        }
        else if (op == 3) {
            cout << trr.order_of_key({x, 0}) + 1 << "\n";
        }
        else if (op == 4) {
            cout << trr.find_by_order(x - 1)->first << "\n";
        }
        else if (op == 5) {
            auto it = trr.lower_bound({x, 0});
            it--;
            cout << it->first << "\n";
        }
        else {
            auto it = trr.upper_bound({x, cnt});
            cout << it->first << "\n";
        }
    }
}
```

## 图论

### 邻接表

```cpp
vector<vector<int>> g(n + 1);        // 无权图
g[u].push_back(v), g[v].push_back(u);

vector<vector<PII>> g(n + 1);        // 带权图：{终点, 边权}
g[u].push_back({v, w});
```

### BFS（最短路）

```cpp
#include <bits/stdc++.h>
#include <iostream>
#include <queue>
using namespace std;

typedef struct {
    int x;
    int y;
} node;

int vis[405][405] = { 0 };
int zuji[405][405] = { 0 };

int main()
{
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n, m, x, y;
    cin >> n >> m >> x >> y;
    int dx[] = {-2, -1, 1, 2, 2, 1, -1, -2};
    int dy[] = {1, 2, 2, 1, -1, -2, -2, -1};
    queue<node> hor;
    memset(zuji, -1, sizeof zuji);
    vis[x][y] = 1;
    zuji[x][y] = 0;
    hor.push({x, y});
    int cnt = 1;
    while (cnt++) {
        int r = hor.size();
        if (!r) {
            break;
        }
        for (int o = 0; o < r; o++) {
            node tem = hor.front();
            for (int i = 0; i < 8; i++) {
                int p = tem.x + dx[i];
                int q = tem.y + dy[i];
                if (p >= 1 && p <= n && q >= 1 && q <= m) {
                    if (!vis[p][q]) {
                        zuji[p][q] = cnt - 1;
                        hor.push({ p, q });
                        vis[p][q] = 1;      // 入队时就标记，避免重复入队
                    }
                }
            }
            hor.pop();
        }
    }
    for (int i = 1; i <= n; i++) {
        for (int t = 1; t <= m; t++) {
            cout << zuji[i][t] << " ";
        }
        cout << "\n";
    }
}
```

多源 BFS：一开始就把多个节点同时加入队列。

### DFS（含剪枝）

```cpp
// DFS 剪枝：一旦发现当前代价已经不可能优于已知最优解，立刻回溯
int cnnt = 1e9;    // 当前最优解

void dfs(int x, int y, int cnt, int ori) {
    if (x == enx && y == eny) {     // 到达终点
        cnnt = min(cnnt, cnt);
        return;
    }
    if (cnt >= 1e9) {               // 代价已经爆炸
        return;
    }
    if (cnt >= cnnt) {              // 已经不比当前最优解更好，剪枝
        return;
    }
    // ... 继续搜索
}
```

### DFS 序

```cpp
void dfs(int x, int fa)
{
    dfn[x] = ++ tot;
    idx[dfn[x]] = x;      // 通过 dfn 找 idx
    sz[x] = 1;
    for (const auto &y : g[x]) {
        if (y == fa) continue;
        dfs(y, x);
        sz[x] += sz[y];
    }
}
```

### 树的直径

```cpp
void dfs(int u, int fa, int &maxx, int &maxn) {
    if (maxx < dis[u]) {
        maxx = dis[u];
        maxn = u;
    }
    for (int v : g[u]) {
        if (v == fa) {
            continue;
        }
        dis[v] = dis[u] + 1;
        dfs(v, u, maxx, maxn);
    }
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n - 1; i++) {
        int u, v;
        cin >> u >> v;
        g[u].push_back(v), g[v].push_back(u);
    }
    dfs(1, 0, maxx, maxn);       // 从 1 出发找到最远点 maxn
    dis[maxn] = 0, maxx = 0;
    dfs(maxn, 0, maxx, maxn);    // 从 maxn 出发再找最远距离
    cout << maxx << "\n";
}
```

### LCA（倍增）

```cpp
void dfs(int u, int fa) {
    dep[u] = dep[fa] + 1;
    st[u][0] = fa;
    for (int i = 1; i <= 19; i++) {
        st[u][i] = st[st[u][i - 1]][i - 1];
    }
    for (int v : g[u]) {
        if (v == fa) {
            continue;
        }
        dfs(v, u);
    }
}

int lca(int u, int v) {
    if (dep[u] < dep[v]) {
        swap(u, v);
    }
    for (int i = 19; i >= 0; i--) {
        if (dep[st[u][i]] >= dep[v]) {
            u = st[u][i];
        }
    }
    if (u == v) {
        return v;
    }
    for (int i = 19; i >= 0; i--) {
        if (st[u][i] != st[v][i]) {
            u = st[u][i], v = st[v][i];
        }
    }
    return st[u][0];
}
```

### 拓扑排序

可用于有向图的判环。

```cpp
vector<int> tr[N];    // 邻接表
int mp[N];            // 入度
queue<int> q;
vector<int> vis;      // 是否已入队

void bfs() {
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : tr[u]) {
            if (!vis[v]) {
                mp[v]--;
                if (!mp[v]) {
                    vis[v] = 1, q.push(v);
                }
            }
        }
    }
}

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vis.assign(numCourses, 0);
    for (auto &u : prerequisites) {
        int l = u[1], r = u[0];
        tr[l].push_back(r);
        mp[r]++;
    }
    for (int i = 0; i < numCourses; i++) {
        if (!mp[i]) {
            q.push(i), vis[i] = 1;
        }
    }
    bfs();
    for (int i = 0; i < numCourses; i++) {
        if (!vis[i]) {
            return false;     // 有环
        }
    }
    return true;
}
```

### Dijkstra

```cpp
void dijkstra() {
    memset(d, 0x3f, sizeof d);
    priority_queue<PII, vector<PII>, greater<PII>> pq;
    pq.push({0, 1});
    d[1] = 0;
    while (!pq.empty()) {
        auto t = pq.top();
        pq.pop();
        int w = t.first, v = t.second;
        if (vis[v]) {
            continue;
        }
        vis[v] = 1;
        for (auto y : g[v]) {
            if (d[v] + y.first < d[y.second]) {
                d[y.second] = d[v] + y.first;
                pq.push({d[y.second], y.second});
            }
        }
    }
}
```

### Prim

```cpp
LL prim() {
    memset(d, 0x3f, sizeof d);
    memset(vis, 0, sizeof vis);
    LL maxx = 0;
    priority_queue<PII, vector<PII>, greater<PII>> pq;
    pq.push({0, 1});
    d[1] = 0;
    while (!pq.empty()) {
        auto t = pq.top();
        pq.pop();
        LL x = t.second;
        LL w = t.first;
        if (vis[x]) {
            continue;
        }
        vis[x] = 1;
        maxx = max(maxx, w);
        for (auto tem : g[x]) {
            if (d[tem.second] > tem.first) {
                d[tem.second] = tem.first;
                pq.push({d[tem.second], tem.second});
            }
        }
    }
    return maxx;
}
```

### Kruskal

```cpp
LL find(int x) {
    if (x == p[x]) {
        return p[x];
    }
    p[x] = find(p[x]);
    return p[x];
}

LL kruskal() {
    LL ans = 0;
    for (LL i = 1; i <= cnt; i++) {
        LL s = e[i].a, t = e[i].b, w = e[i].c;
        LL x = find(s), y = find(t);
        if (x == y) {
            continue;
        }
        ans += w;
        p[x] = y;
    }
    return ans;
}
```

## 动态规划

### 完全背包

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int a[1010] = { 0 };
int b[1010] = { 0 };
int f[1010] = { 0 };

int main()
{
    int n, m;
    cin >> n >> m;

    for (int i = 1; i <= n; i++) {
        cin >> a[i] >> b[i];
    }
    for (int i = 1; i <= n; i++) {
        for (int j = a[i]; j <= m; j++) {
            f[j] = max(f[j], f[j - a[i]] + b[i]);
        }
    }
    cout << f[m];
}
```

### 朴素多重背包

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 110;

int n, m;
int v[N], w[N], s[N];
int f[N][N];

int main()
{
    cin >> n >> m;

    for (int i = 1; i <= n; i ++ ) cin >> v[i] >> w[i] >> s[i];

    for (int i = 1; i <= n; i ++ )
        for (int j = 0; j <= m; j ++ )
            for (int k = 0; k <= s[i] && k * v[i] <= j; k ++ )
                f[i][j] = max(f[i][j], f[i - 1][j - v[i] * k] + w[i] * k);

    cout << f[n][m] << endl;
    return 0;
}
```

### 二进制优化多重背包

```cpp
int main()
{
    cin >> n >> m;

    int cnt = 0;
    for (int i = 1; i <= n; i ++ )
    {
        int a, b, s;
        cin >> a >> b >> s;
        int k = 1;
        while (k <= s)
        {
            cnt ++ ;
            v[cnt] = a * k;
            w[cnt] = b * k;
            s -= k;
            k *= 2;
        }
        if (s > 0)
        {
            cnt ++ ;
            v[cnt] = a * s;
            w[cnt] = b * s;
        }
    }

    n = cnt;

    for (int i = 1; i <= n; i ++ )
        for (int j = m; j >= v[i]; j -- )
            f[j] = max(f[j], f[j - v[i]] + w[i]);

    cout << f[m] << endl;

    return 0;
}
```

### 分组背包

```cpp
#include <algorithm>
using namespace std;

const int N = 110;

int n, m;
int v[N][N], w[N][N], s[N];
int f[N];

int main()
{
    cin >> n >> m;

    for (int i = 1; i <= n; i ++ )
    {
        cin >> s[i];
        for (int j = 0; j < s[i]; j ++ )
            cin >> v[i][j] >> w[i][j];
    }

    for (int i = 1; i <= n; i ++ )
        for (int j = m; j >= 0; j -- )
            for (int k = 0; k < s[i]; k ++ )
                if (v[i][k] <= j)
                    f[j] = max(f[j], f[j - v[i][k]] + w[i][k]);

    cout << f[m] << endl;

    return 0;
}
```

### 数位 DP

```cpp
LL dfs(LL u, LL lim, LL fl, LL dig) {
    LL cnt = 0;
    if (u == 0) {
        return 0;
    }
    if (!lim && !fl && dp[u] != -1) {
        return dp[u];
    }
    LL lst = lim ? de[u] : 9;
    for (int i = 0; i <= lst; i++) {
        if (i == 0 && fl) {
            cnt += dfs(u - 1, lim && (i == lst), 1, dig);
        }
        else if (lim && i == lst && i == dig) {
            cnt += numm[u - 1] + 1 + dfs(u - 1, lim && (i == lst), 0, dig);
        }
        else if (i == dig) {
            cnt += mi[u - 1] + dfs(u - 1, 0, 0, dig);
        }
        else {
            cnt += dfs(u - 1, lim && (i == lst), 0, dig);
        }
    }
    if (!lim && !fl) {
        dp[u] = cnt;
    }
    return cnt;
}
```

### 整数拆分

把 n 个小球分成 k 份，分为有序拆分和无序拆分：有序拆分直接用插板法，无序拆分用 dp，没有明确公式。

```cpp
// dp[i][j] 表示把 i 拆成 j 份的方案数
dp[i][j] = dp[i - 1][j - 1] + dp[i - j][j]
```

## 数学

### 试除法判定质数

```cpp
bool is_prime(int x)
{
    if (x < 2) return false;
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
            return false;
    return true;
}
```

### 试除法分解质因数

```cpp
void divide(int x)
{
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
        {
            int s = 0;
            while (x % i == 0) x /= i, s ++ ;
            cout << i << ' ' << s << endl;
        }
    if (x > 1) cout << x << ' ' << 1 << endl;
    cout << endl;
}
```

### 朴素筛法求素数

```cpp
int primes[N], cnt;     // primes[] 存储所有素数
bool st[N];             // st[x] 存储 x 是否被筛掉

void get_primes(int n)
{
    for (int i = 2; i <= n; i ++ )
    {
        if (st[i]) continue;
        primes[cnt ++ ] = i;
        for (int j = i + i; j <= n; j += i)
            st[j] = true;
    }
}
```

### 线性筛法求素数

```cpp
int primes[N], cnt;     // primes[] 存储所有素数
bool st[N];             // st[x] 存储 x 是否被筛掉

void get_primes(int n)
{
    for (int i = 2; i <= n; i ++ )
    {
        if (!st[i]) primes[cnt ++ ] = i;
        for (int j = 0; primes[j] <= n / i; j ++ )
        {
            st[primes[j] * i] = true;
            if (i % primes[j] == 0) break;
        }
    }
}
```

### 试除法求所有约数

```cpp
vector<int> get_divisors(int x)
{
    vector<int> res;
    for (int i = 1; i <= x / i; i ++ )
        if (x % i == 0)
        {
            res.push_back(i);
            if (i != x / i) res.push_back(x / i);
        }
    sort(res.begin(), res.end());
    return res;
}
```

### 约数个数和约数之和

```cpp
如果 N = p1^c1 * p2^c2 * ... * pk^ck
约数个数：(c1 + 1) * (c2 + 1) * ... * (ck + 1)
约数之和：(p1^0 + p1^1 + ... + p1^c1) * ... * (pk^0 + pk^1 + ... + pk^ck)
```

### 欧几里得算法（最大公约数）

```cpp
int gcd(int a, int b)
{
    return b ? gcd(b, a % b) : a;
}
```

### 求欧拉函数

```cpp
int phi(int x)
{
    int res = x;
    for (int i = 2; i <= x / i; i ++ )
        if (x % i == 0)
        {
            res = res / i * (i - 1);
            while (x % i == 0) x /= i;
        }
    if (x > 1) res = res / x * (x - 1);

    return res;
}
```

### 快速幂

求 $m^k \bmod p$，时间复杂度 $O(\log k)$。

```cpp
int qmi(int m, int k, int p)
{
    int res = 1 % p, t = m;
    while (k)
    {
        if (k & 1) res = res * t % p;
        t = t * t % p;
        k >>= 1;
    }
    return res;
}
```

### 组合数（递推法）

```cpp
// c[a][b] 表示从 a 个苹果中选 b 个的方案数
for (int i = 0; i < N; i ++ )
    for (int j = 0; j <= i; j ++ )
        if (!j) c[i][j] = 1;
        else c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % mod;
```

### 组合数（预处理逆元）

先用快速幂求逆元（模数为质数时可用费马小定理），再预处理阶乘与阶乘逆元。

```cpp
// 预处理阶乘的余数和阶乘逆元的余数
fact[0] = infact[0] = 1;
for (int i = 1; i < N; i ++ )
{
    fact[i] = (LL)fact[i - 1] * i % mod;
    infact[i] = (LL)infact[i - 1] * qmi(i, mod - 2, mod) % mod;
}
```

### 组合数（Lucas 定理）

若 p 是质数，则对于任意整数 `1 <= m <= n`：

```cpp
C(n, m) = C(n % p, m % p) * C(n / p, m / p) (mod p)

int C(int a, int b, int p)      // 通过定理求组合数 C(a, b)
{
    if (a < b) return 0;

    LL x = 1, y = 1;            // x 是分子，y 是分母
    for (int i = a, j = 1; j <= b; i --, j ++ )
    {
        x = (LL)x * i % p;
        y = (LL)y * j % p;
    }

    return x * (LL)qmi(y, p - 2, p) % p;
}

int lucas(LL a, LL b, int p)
{
    if (a < p && b < p) return C(a, b, p);
    return (LL)C(a % p, b % p, p) * lucas(a / p, b / p, p) % p;
}
```

### 组合数（分解质因数法）

需要求出组合数的真实值、而不是对某个数的余数时用这种方式：

1. 筛出范围内的所有质数；
2. 通过 `C(a, b) = a! / b! / (a - b)!` 求出每个质因子的次数（n! 中 p 的次数是 `n/p + n/p^2 + ...`）；
3. 用高精度乘法将所有质因子相乘。

```cpp
int get(int n, int p)       // 求 n! 中 p 的次数
{
    int res = 0;
    while (n)
    {
        res += n / p;
        n /= p;
    }
    return res;
}

get_primes(a);              // 预处理范围内的所有质数

for (int i = 0; i < cnt; i ++ )     // 求每个质因数的次数
{
    int p = primes[i];
    sum[i] = get(a, p) - get(b, p) - get(a - b, p);
}

vector<int> res;
res.push_back(1);

for (int i = 0; i < cnt; i ++ )     // 用高精度乘法将所有质因子相乘
    for (int j = 0; j < sum[i]; j ++ )
        res = mul(res, primes[i]);  // mul 见「高精度乘低精度」
```

### 数论分块

```cpp
long long n;
cin >> n;

vector<long long> R;     // 存储每个区间的右端点（最大值）
vector<long long> V;     // 存储每个区间的下取整结果 v = [n / x]
vector<long long> Len;   // 存储每个区间的长度（R - L + 1）

// 从 l = 1 开始，每次迭代把 l 跳到下一个区间的起点（r + 1）
for (long long l = 1, r; l <= n; l = r + 1) {
    long long v = n / l;        // 1. 当前区间算出的下取整结果 v
    r = n / v;                  // 2. 算出现在能保持结果依然为 v 的最大右端点 r

    R.push_back(r);             // 记录右端点
    V.push_back(v);             // 记录下取整的值
    Len.push_back(r - l + 1);   // 记录区间长度
}
```

### 广义容斥原理

给定集合 $N$ 和 $n$ 个性质 $P_i$，令集合中具有性质 $P_i$ 的元素构成的子集为 $A_i$。计数函数 $\alpha(k)$：

$$
\alpha(k) = \sum_{1 \le i_1 < i_2 < \cdots < i_k \le n} \left| A_{i_1} \cap A_{i_2} \cap \cdots \cap A_{i_k} \right|
$$

令 $\beta(k)$ 表示集合 $N$ 中恰有 $k$ 种性质的元素个数，则有：

$$
\beta(k) = \sum_{i=0}^{n-k} (-1)^i \binom{k+i}{k} \alpha(k+i)
$$

展开形式：

$$
\beta(k) = \alpha(k) - \binom{k+1}{k}\alpha(k+1) + \binom{k+2}{k}\alpha(k+2) - \cdots + (-1)^{n-k}\binom{n}{k}\alpha(n)
$$

### 手动开根号

处理长整数类型时 `sqrt()` 的精度可能不够，可以用 `sqrtl()`，或手动实现一个开根号函数：

```cpp
LL calc(LL n) {
    LL l = 1, r = 1e9;
    while (l < r) {
        LL mid = (l + r + 1) / 2;
        if (mid * mid <= n) {
            l = mid;
        }
        else {
            r = mid - 1;
        }
    }
    return l;
}
```
