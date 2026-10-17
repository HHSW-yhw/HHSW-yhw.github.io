# ARC205 D Non-Ancestor Matching

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

给定一棵树，让点两两配对，配对的点之间不能有祖宗关系，问最多能配多少对。$n\le 5\times10^5$。

## 思路

<!-- 从暴力想法开始讲，说清楚为什么会超时，再讲怎么优化 -->

这题不该想不到：固定根做树形 dp，$dp[u]$ 直接设成最大配对数，再掰儿子到 $u$ 的转移。这种套路做过很多遍了，树上问题先考虑树形 dp。

设 $dp[u]$ 为子树 $u$ 的最大配对数，等于各子树内部的配对数之和加上子树之间的配对数。麻烦在于每个子树不必都取到自己的 $dp[v]$：多留点给外面配可能更划算。

不同子树之间的点两两都能配，于是问题变成 $N$ 堆石子的最大匹配（见后面的 trick）。设 $r_v=sz[v]-2dp[v]$ 是 $v$ 最少剩的点，$x=\max r_v$，$d$ 是其余儿子的节点总数：$x\le d$ 就能全配（外面点不够就拆别的子树里配好的对，拆一对白赚一对）；$x>d$ 则主堆注定有 $x-d$ 个点落单，答案就定了。

## 关键 trick：最大配对数的相关结论

一句话：**排成一列，对折，前后半截一一配对。**

### 结论

$N$ 堆石子，第 $i$ 堆 $a_i$ 颗，总数 $S=\sum a_i$，最大堆 $M=\max a_i$，每次从两堆各取一颗配成一对（同堆不能配）。最多配的对数是

$$\text{ans}=\min\left(\left\lfloor\frac{S}{2}\right\rfloor,\ S-M\right)$$

上界两条：① 每对两颗，故对数 $\le\lfloor S/2\rfloor$；② 每对至多取一颗最大堆的石头，即至少消耗一颗非最大堆的石头，而非最大堆只有 $S-M$ 颗，故对数 $\le S-M$。

下面证明这个上界能取到。

### 折纸：最大堆不超过一半

此时 $2M\le S$，即 $M\le\lfloor S/2\rfloor$，上界是 $\lfloor S/2\rfloor$。构造分三步。

1. 每堆排成一段，堆与堆首尾相接，得一条长 $S$ 的链；同一堆是连续的一段。
2. 令 $K=\lfloor S/2\rfloor$，把第 $i$ 颗与第 $i+K$ 颗配对（$i=1,\dots,K$）：整条链对折，前半截贴到后半截上。$S$ 偶时正好 $K$ 对；$S$ 奇时最后一颗落单，仍是 $K$ 对。
3. 每对必不同堆。反证：若 $(i,i+K)$ 同堆，这段至少长 $(i+K)-i+1=K+1$；但一堆的长度不超过 $M\le K$，矛盾。

例：$3,3,2$ 三堆拼成 $111\,222\,33$，$K=4$，配对 $(1,5),(2,6),(3,7),(4,8)$，没一对同堆。

### 最大堆超过一半

此时 $M>\lfloor S/2\rfloor$，$\min$ 取 $S-M$：最大堆的石头逐个去配非最大堆的石头，非最大堆正好 $S-M$ 颗，配出 $S-M$ 对。人话：**要么对半分完，要么被最大堆卡住。**

### 贪心的理解方式

只要 $2M\le S$，每次从最大的两堆各取一块配对，之后仍有 $2M'\le S'$，于是能一直配到 $S<2$，共 $\lfloor S/2\rfloor$ 对。

设取的两堆为 $p\ge q$：$p$ 是最大堆 $M$，$q$ 是第二大的那堆。取过的两堆都 $\le p-1$，所以 $M'$ 要么 $\le p-1$，要么 $=p$（那只能是没碰过的堆）。

- $M'\le p-1$：$2M'\le2p-2\le S-2=S'$。
- $M'=p$：若 $q<p$，没碰过的堆都 $\le q<p$，故 $q=p$，至少三堆为 $p$，$S\ge3p$；$p\ge2$ 时 $2p\le3p-2\le S'$，$p=1$ 时全是 $1$，$S'\ge2$ 时 $2M'=2\le S'$，$S'<2$ 已经停了。

例：$2,2,2\to1,1,2\to1,0,1\to0,0,0$，$3$ 对。

### 搬到树上

$u$ 的每个儿子 $v$ 贡献一堆，最少剩 $r_v=sz[v]-2dp[v]$，也能拆对放到 $sz[v]$。又因不同儿子子树里的两点必无祖宗关系，堆间可以随便配。记 $T=sz[u]-1$（$u$ 是子孙的祖宗，永远配不上），$x=\max r_v$ 为主堆，$d=T-sz[\text{main}]$。

上界：主堆那 $x$ 个点只能和外面 $d$ 个点配，至少 $\max(0,x-d)$ 个落单，故

$$dp[u]\le\left\lfloor\frac{T-\max(0,x-d)}{2}\right\rfloor=\min\left(\left\lfloor\frac{T}{2}\right\rfloor,\ dp[\text{main}]+d\right)$$

取到：$x>d$ 时主堆内部配 $dp[\text{main}]$ 对，剩 $x$ 个里挑 $d$ 个和外面配，共 $dp[\text{main}]+d$ 对；$x\le d$ 时上界退成 $\lfloor T/2\rfloor$，即除 $u$ 外全配上，拆非主堆的对补人即可（拆一对白赚一对，够拆）。于是

$$dp[u]=\min\left(\left\lfloor\frac{T}{2}\right\rfloor,\ dp[\text{main}]+T-sz[\text{main}]\right)$$

代码那两行就是把这个 $\min$ 拆开写，第二行展开正好是 $dp[\text{main}]+d$。

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
const LL N = 5e5 + 10, MOD = 1e9 + 7, P = 13331;
int n, dp[N], sz[N];
vector<int> g[N];
void dfs(int u,int fa) {               //计算出每个子树的大小，便于计算出每个子树有多少点不能配对
	sz[u] = 1;
	for (int v:g[u]) {
		if (v==fa) {
			continue;
		}
		dfs(v, u);
		sz[u] += sz[v];
	}
}
void calc(int u,int fa) {
	vector<int> h;
	int maxx = -1e9, maind = 0, tot = 0;
	for (int v:g[u]) {
		if (v==fa) {
			continue;
		}
		calc(v, u);
		if (sz[v] - dp[v] * 2>maxx) {
			maxx = sz[v] - dp[v] * 2;
			maind = v;
		}
		tot += sz[v];
		h.push_back(sz[v] - dp[v] * 2);
	}
	if (sz[u]==1) {
		dp[u] = 0;
		return;
	}
	if (maxx<=tot-sz[maind]) {
		dp[u] = (sz[u] - 1) / 2;
	}
	else {
		dp[u] = (sz[u] - 1 - (maxx - (tot - sz[maind]))) / 2;
	}
}
void solve() {
	cin >> n;
	for (int i = 1; i <= n;i++) {
		g[i].clear(), sz[i] = 0, dp[i] = 0;
	}
	for (int i = 2; i <= n;i++) {
		int a;
		cin >> a;
		g[i].push_back(a);
		g[a].push_back(i);
	}
	dfs(1, 0), calc(1, 0);
	cout << dp[1] << "\n";
}
int main()
{
	ios::sync_with_stdio(0);
	cin.tie(0), cout.tie(0);
	int t = 1;
	cin >> t;
	while (t--) {
		solve();
	}
}
```

## 感想

<!-- 这题让你学到了什么、踩了什么坑、以后遇到类似的题有什么启发 -->

遇到树上问题一定要考虑树形 dp！！！答案是什么，$dp$ 就设什么，再把值拆成子树内和子树间，最后按最大堆的大小确定拆几对。最大配对数这个结论也一定记住，用处很多。
