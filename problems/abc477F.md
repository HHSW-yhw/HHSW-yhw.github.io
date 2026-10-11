# ABC477 F Count Cells in a Window

<!--
  这是文章骨架，和 about.md 是同一套写法：一个 # 大标题 + 若干 ## 小节。

  填的时候：
  - 每个 ## 下面那行「说明文字」删掉，换成你自己写的内容
  - 想再分一层就用 ###，右侧目录会自动显示出来
  - 行内公式写 $ ... $，块级公式写 $$ ... $$ 并单独占一行
  - 代码块用三个反引号包住，第一行写语言名（cpp / python）
-->

## 题意

<!-- 用自己的话把题目要求说一遍：给了什么、要你算什么、数据范围多大 -->

给定一个n*m的方格，接下来n行给出l，r，代表这一行第l个格子到第r个格子是被涂黑的。给定q个询问，形式为a，b，c，d，问从第a行到第b行，从第c列到第d列这个矩形区域中有多少格子被涂黑。n，m，q的数据范围都是2e5。

## 思路

<!-- 从暴力想法开始讲，说清楚为什么会超时，再讲怎么优化 -->

直接做肯定会超时。因为对于一次询问，一行一行数就是2e5，并且一共有q个询问。但是我们可以观察到这个询问有着前缀和的性质，即把c，d固定，a到b的答案就等于前b列的答案前缀和减去前a-1列的答案前缀和，那么对于这q次询问，就没有必要每一次都一行一行数，而是从前往后扫描，扫描到第a-1行的时候就给所有以第a行开头的询问的答案减去前a-1行第c列到第d列所有黑方块的数量，这样一共就只有2q次计算，扫描的时候记录一下前缀和就能做到。但是每一次询问的c，d都不一样，光记录总数肯定是不行，可以创建一个数组，a[i]代表第i列目前有多少黑方块，然后求c到d的和用线段树维护就能做到logn，总复杂度为O(qlogn)。

## 关键 trick：线段树与答案挂载

<!-- 这篇文章的重点。把「答案挂载」这个思想讲透：挂在哪里、什么时候挂、为什么这样能避免重复计算 -->

首先这道题给出很多个区间肯定是不能一个一个数，而是要用到前缀和。按理说光用前缀和复杂度就是O(q)，但是这道题每一个询问的前缀和的宽度cd都不一样，无法存储所有的情况。那就只能把答案分解，在遇到每一行，只把包含这一行的询问的cd值计算出来，而不是全部记录，这就是挂载的原因。然后对于某一行，要计算很多个cd之间的数量，一个一个数肯定还是超时。注意到输入是区间加，求解也是区间和，想到可以利用线段树的性质实现快速的区间加和区间求和。

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
LL n, m, q, st[N], en[N], a[N], b[N], c[N], d[N], ans[N];
vector<int> g[N], h[N];
typedef struct tree {
	LL l, r, sum, lazytag;
}tree;
tree tr[N << 2];
LL arr[N];
void pushup(LL id) {
	tr[id].sum = tr[id << 1].sum + tr[id << 1 | 1].sum;
	return;
}
void pushdown(LL id) {
	if (!tr[id].lazytag) {
		return;
	}
	else {
		tr[id << 1].lazytag += tr[id].lazytag;
		tr[id << 1 | 1].lazytag += tr[id].lazytag;
		LL mid = (tr[id].l + tr[id].r) >> 1;
		tr[id << 1].sum += (mid - tr[id].l + 1) * tr[id].lazytag;
		tr[id << 1 | 1].sum += (tr[id].r - mid) * tr[id].lazytag;
		tr[id].lazytag = 0;
	}
	return;
}
void build(LL id,LL l,LL r) {
	tr[id].l = l, tr[id].r = r;
	if (l==r) {
		tr[id].sum = arr[l];
		return;
	}
	else {
		LL mid = (l + r) >> 1;
		build(id << 1, l, mid);
		build(id << 1 | 1, mid + 1, r);
		pushup(id);
	}
	return;
}
void change(LL id,LL l,LL r,LL k) {
	if (l<=tr[id].l&&tr[id].r<=r) {
		tr[id].lazytag += k;
		tr[id].sum += (tr[id].r - tr[id].l + 1) * k;
	}
	else {
		pushdown(id);
		LL mid = (tr[id].l + tr[id].r) >> 1;
		if (l<=mid) {
			change(id << 1, l, r, k);
		}
		if (r>mid) {
			change(id << 1 | 1, l, r, k);
		}
		pushup(id);
	}
	return;
}
LL query(LL id,LL l,LL r) {
	if (l<=tr[id].l&&tr[id].r<=r) {
		return tr[id].sum;
	}
	else {
		pushdown(id);
		LL mid = (tr[id].l + tr[id].r) >> 1;
		LL sum = 0;
		if (l<=mid) {
			sum += query(id << 1, l, r);
		}
		if (mid<r) {
			sum += query(id << 1 | 1, l, r);
		}
		return sum;
	}
}
void solve() {
	cin >> n >> m >> q;
	for (int i = 1; i <= n;i++) {
		cin >> st[i] >> en[i];
	}
	for (int i = 1; i <= q;i++) {
		cin >> a[i] >> b[i] >> c[i] >> d[i];
		g[a[i] - 1].push_back(i);
		h[b[i]].push_back(i);                  //答案挂载，g，h数组
	}
	build(1, 1, m);
	for (int i = 1; i <= n;i++) {
		change(1, st[i], en[i], 1);            //对于题目的输入进行区间加
		for (int u:g[i]) {
			ans[u] -= query(1, c[u], d[u]);      
		}
		for (int u:h[i]) {
			ans[u] += query(1, c[u], d[u]);      //查询出区间和利用挂载数组将答案直接加入
		}
	}
	for (int i = 1; i <= q;i++) {
		cout << ans[i] << "\n";
	}
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

以后遇到各种区间问题，想到前缀和，当前缀和出现超内存或者超时的情况想到挂载来减少运算数量。遇到区间加和区间求和问题想到线段树。