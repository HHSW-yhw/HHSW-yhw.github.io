# ABC368 F Dividing Game

<!--
  这是文章骨架，和 about.md 是同一套写法：一个 # 大标题 + 若干 ## 小节。

  填的时候：
  - 每个 ## 下面那行「说明文字」删掉，换成你自己写的内容
  - 想再分一层就用 ###，右侧目录会自动显示出来
  - 行内公式写 $ ... $，块级公式写 $$ ... $$ 并单独占一行
  - 代码块用三个反引号包住，第一行写语言名（cpp / python）
-->

## 题意

给定 $N$ 个正整数 $A_1, A_2, \dots, A_N$（每个都 $\ge 2$）。Anna 先手、Bruno 后手，两人轮流操作：选一个 $i$，把 $A_i$ 换成它的任意一个**真因子**（即 $A_i$ 的约数，且不等于 $A_i$ 自身）。

轮到谁无法操作谁就输。双方都按最优策略行动，判断谁获胜。

$N \le 10^5$，$2 \le A_i \le 10^5$。

## 思路

<!-- 从暴力想法开始讲，说清楚为什么会超时，再讲怎么优化 -->

首先直接硬找规律发现无从下手，情况太多太复杂，说明这道题不是无脑的找规律题。想到nim游戏的形式与之接近，并且符合sg函数的四点要求：
1. 公平，即接下来的操作只跟局面有关，跟人无关。（反例：象棋两个人能动的棋子不一样，跟人有关）
2. 无环加有限性，即游戏一定能结束
3. 独立性，即动一个游戏堆不影响其他游戏堆
4. 正常玩法，即不能动的人输而不是拿走最后一个操作的人输

那么只需处理出每个数的sg值，即可做出这道题。

## 关键 trick：sg函数与nim游戏的相关证明

### Nim 游戏

$N$ 堆石子，每次从一堆取走任意多个（至少一个），取走最后一个的人获胜。记异或和 $S = a_1 \oplus a_2 \oplus \cdots \oplus a_N$，结论是**先手必胜 $\iff S \ne 0$**。

证明只需要两条：

1. **$S = 0$ 时只能走到 $S' \ne 0$。** 一次只改一堆 $a_i \to a_i'$（$a_i' \ne a_i$），所以

$$S' = S \oplus a_i \oplus a_i' = a_i \oplus a_i' \ne 0$$

2. **$S \ne 0$ 时总能走到 $S' = 0$。** 设 $S$ 的最高位是第 $k$ 位，则必有某堆 $a_i$ 的第 $k$ 位也是 $1$。令 $a_i' = a_i \oplus S$，此时 $a_i' < a_i$（第 $k$ 位被消掉），所以「从第 $i$ 堆取走 $a_i - a_i'$ 个」是合法操作，走完后

$$S' = S \oplus a_i \oplus a_i' = 0$$

终局全为 $0$，$S = 0$，是必败态。由这两条：$S \ne 0$ 的人总能把 $S = 0$ 丢给对手，$S = 0$ 的人只能交出 $S \ne 0$，绕到最后面对全 $0$ 的一定是后者。故 $S \ne 0$ 先手必胜。

### SG 函数

对局面 $v$ 定义

$$g(v) = \operatorname{mex}\{\, g(u) : v \text{ 能一步走到 } u \,\}$$

（$\operatorname{mex}$ = 最小的没出现过的非负整数；走不动的局面 $g = 0$。）

由 mex 的定义可以直接读出两条性质：

1. **能走到任意更小的 SG 值**：$0, 1, \dots, g(v)-1$ 都出现在后继里；
2. **走不到相同的 SG 值**：$g(v)$ 本身没出现在后继里。

这两条和 Nim 里「石子数」的性质**逐字相同**，所以 **SG 值为 $k$ 的局面等价于一个大小为 $k$ 的 Nim 堆**。

**SG 定理**：若游戏能拆成 $m$ 个互相独立的子游戏，则

$$G = g_1 \oplus g_2 \oplus \cdots \oplus g_m$$

$G \ne 0$ 先手必胜，$G = 0$ 先手必败。

**证明**：把上面 Nim 的证明里的「石子数」换成「SG 值」，一字不用改 ——

- $G = 0$ 只能走到 $G' \ne 0$：一次只改一个子游戏 $g_i \to g_i'$，由性质 2 知 $g_i' \ne g_i$，故 $G' = g_i \oplus g_i' \ne 0$。
- $G \ne 0$ 总能走到 $G' = 0$：设 $G$ 的最高位是第 $k$ 位，必有某个 $g_i$ 的第 $k$ 位为 $1$。令 $g_i' = g_i \oplus G$，有 $g_i' < g_i$，由性质 1 存在后继的 SG 值恰为 $g_i'$，走完 $G' = 0$。
- 终局所有 $g_i = 0$，$G = 0$，必败。

故 $G \ne 0$ 先手必胜。

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
const LL N = 1e5 + 10, MOD = 1e9 + 7, P = 13331;
int n, lst, a[N], sg[N], mp[N], vis[N], ans[N];
vector<int> g[N];
int divide(int x)                    //采用记忆化搜索处理出每个数的sg值
{
	if (x==1) {
		vis[1] = 1;
		return 0;
	}
	if (vis[x]) {
		return ans[x];
	}
	for (int i = 1; i * i <= x;i++) {
		if (x%i==0) {
			g[x].push_back(i);
			g[x].push_back(x / i);
		}
	}
	for (int v:g[x]) {
		if (v==x) {
			continue;
		}
		mp[divide(v)]++;
	}
	for (int i = 0; i < N;i++) {
		if (mp[i]==0) {
			vis[x] = 1, ans[x] = i;         //求mex操作
			break;
		}
	}
	for (int v:g[x]) {
		if (v==x) {
			continue;
		}
		mp[divide(v)]--;
	}
	return ans[x];
}
void solve() {
	for (int i = 1; i <= 1e5;i++) {
		divide(i);
	}
	cin >> n;
	for (int i = 1; i <= n;i++) {
		cin >> a[i];
	}
	for (int i = 1; i <= n;i++) {
		lst ^= ans[a[i]];             //进行异或，根据异或值判定输赢
	}
	if (lst==0) {
		cout << "Bruno" << "\n";
	}
	else {
		cout << "Anna" << "\n";
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

注意看是否符合四个条件再做，这题很裸，学了新的知识点，但是没啥可讲的。
