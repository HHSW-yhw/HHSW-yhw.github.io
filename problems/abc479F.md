# ABC479 F Narrow Passage

<!--
  这是文章骨架，和 about.md 是同一套写法：一个 # 大标题 + 若干 ## 小节。

  填的时候：
  - 每个 ## 下面那行「说明文字」删掉，换成你自己写的内容
  - 想再分一层就用 ###，右侧目录会自动显示出来
  - 行内公式写 $ ... $，块级公式写 $$ ... $$ 并单独占一行
  - 代码块用三个反引号包住，第一行写语言名（cpp / python）
-->

## 题意

有 $N$ 个人站在数轴上，第 $i$ 个人初始在坐标 $S_i$（$S_i$ 互不相同）。每次操作选一个人，把他从当前位置 $x$ 移到 $x-1$ 或 $x+1$；如果目的地已经有人，那么那个人被同时移到 $x$（相当于两人交换位置）。求让第 $i$ 个人最终到坐标 $T_i$（$T_i$ 互不相同）所需的最少操作次数。

$N \le 2 \times 10^5$，$0 \le S_i, T_i \le 10^9$。

## 思路

<!-- 从暴力想法开始讲，说清楚为什么会超时，再讲怎么优化 -->

观察到如果有人就交换位置，没人则直接移动。容易想到重排的最小操作数问题，但是有些操作不是交换。那么可以尝试统一一下操作类型，把直接移动看成人与空位的交换，这样这个问题就变成了人与一堆空位进行重排的最小操作数问题，一般用树状数组解决。但是数据范围过大，那么可以把求逆序对的动作拆成空位和空位之间的逆序值，人与人之间的逆序值，人与空位之间的逆序值。复杂度为：$O(N\log N)$

## 关键 trick：把状态写成序列，操作就是相邻交换

乍一看无从下手，实则观察到里面的交换操作就可以联想到经典的重排问题。其实本质是一样的，就是问你从第一个状态到第二个状态，只通过两两交换最少多少次能达到。只不过这次每个人之间有很多空位，操作不全是交换，那么就把空位也看作特殊的人，这样所有的操作都是交换了。这样就完成了问题转化。

转化完成之后还有一个重要结论：把第一个序列逐个标上序号1，2，3...，然后找到第二个序列对应的数，换成表上的序号，这样就变成了一个排序问题，并且最少次数就是新序列的逆序对数量。因为一次操作最多减少一个逆序对，所以答案一定大于等于逆序对数，但是只要不停找到大小逆序的相邻两个数进行交换，每一次交换都一定能减少一次，那么最少次数就能达到逆序对数。

## 关键 trick：长度 1e9 的逆序对怎么压缩

肯定不能直接算，注意到空位也被看做人，但实质上空位之间肯定没有交换（交换了也没意义）。那么空位之间的逆序数就是0，而且人之间的逆序数用树状数组就可以解决，非常经典。那么就只剩下人与空位的逆序数了。对于一个人，第一个序列他前面的空位的个数与第二个序列他前面的空位的个数的差的绝对值就是他所创造出的逆序数，求和即可。举个例子，人在第七个位置，前面六个都是空位，分别标上1-7，现在人被换到第五个位置，那么逆序数是2，并且从一开始前面的6个空位变为4个空位，说明有两个空位穿过了他，创造了逆序数，很好理解。

## 代码

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <list>
#include <map>
#include <set>
#include <unordered_map>
#include <stack>
#include <iomanip>
#include <queue>
using namespace std;
typedef long long LL;
typedef unsigned long long ULL;
const LL N = 2e5 + 10, MOD = 1e9 + 7, P = 13331;
typedef struct node {
	LL id, x;
	bool operator<(const node &u) {
		return x < u.x;
	}
}node;
LL n, ans, mp[N], a[N], c[N], ind[N], cnts[N], cntt[N], mps[N], mpt[N];
node s[N], t[N];
LL lowbit(LL x)                             //mps[i]代表原序列第i个点之前有多少个位置
{                                           //mpt[i]代表后序列第i个点之前有多少个位置
	return x & -x;
}
LL query(LL x)    
{
	LL ans = 0;
	for (LL i = x; i; i -= lowbit(i))
		ans += c[i];
	return ans;
}
void add(LL x, LL v) 
{
	for (LL i = x; i < N; i += lowbit(i))
		c[i] += v;
}                                                  //树状数组基本操作
void solve() {
	cin >> n;
	for (LL i = 1; i <= n;i++) {
		cin >> s[i].x;
		s[i].id = i;
	}
	for (LL i = 1; i <= n;i++) {
		cin >> t[i].x;
		t[i].id = i;
	}
	sort(s + 1, s + n + 1), sort(t + 1, t + n + 1);
	for (LL i = 1; i <= n;i++) {
		cnts[s[i].id] = i - 1;
		cntt[t[i].id] = i - 1;
		mps[s[i].id] = s[i].x;
		mpt[t[i].id] = t[i].x;
	}
	for (LL i = 1; i <= n;i++) {
		mp[s[i].id] = i;
	}
	for (LL i = 1; i <= n;i++) {
		a[i] = mp[t[i].id];
		ind[a[i]] = i;
	}
	for (LL i = n; i >= 1;i--) {
		ans += query(ind[i]);
		add(ind[i], 1);                                 //求人之间的逆序对
	}
	for (LL i = 1; i <= n;i++) {
		ans += abs((mps[i] - cnts[i]) - (mpt[i] - cntt[i]));
	}                               //求人与空位之间的逆序对，空位的数量等于前面的位置减去前面的人，再做差得出答案
	cout << ans << "\n";
}
int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	int t = 1;
	//cin >> t;
	while (t--) {
		solve();
	}
}
```

## 感想

<!-- 这题让你学到了什么、踩了什么坑、以后遇到类似的题有什么启发 -->

第一点：记住经典的重排最小交换数为逆序数的结论。第二点：遇到操作类问题可以考虑转化为序列问题。第三点：求逆序数很经典，使用树状数组，很经典的题。