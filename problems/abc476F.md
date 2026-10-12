# ABC476 F Chebyshev Cafe

<!--
  这是文章骨架，和 about.md 是同一套写法：一个 # 大标题 + 若干 ## 小节。

  填的时候：
  - 每个 ## 下面那行「说明文字」删掉，换成你自己写的内容
  - 想再分一层就用 ###，右侧目录会自动显示出来
  - 行内公式写 $ ... $，块级公式写 $$ ... $$ 并单独占一行
  - 代码块用三个反引号包住，第一行写语言名（cpp / python）
-->

## 题意

有一个 $N \times N$ 的网格，第 $i$ 行第 $j$ 列的格子记作 $(i,j)$，每个格子里都有一家咖啡馆。

住在格子 $(i,j)$ 的人数为

$$W(i,j) = (A_i \times B_j) \bmod M$$

其中数组 $A, B$ 的长度都是 $N$，由输入给出。

一个住在 $(s_r, s_c)$ 的人，走到 $(t_r, t_c)$ 的咖啡馆，交通费为

$$\max\big(|s_r - t_r|,\ |s_c - t_c|\big)$$

也就是**切比雪夫距离**。

记 $f(i,j)$ 为：**让全城所有人，都聚集到 $(i,j)$ 这家咖啡馆**所需要的交通费总和，即

$$f(i,j) = \sum_{1 \le s,t \le N} W(s,t) \cdot \max\big(|i - s|,\ |j - t|\big)$$

现在对每一个格子 $(i,j)$，算出

$$f(i,j) + (i-1)N + (j-1)$$

并输出这 $N^2$ 个值的 **按位异或**（$\oplus$）结果。

**数据范围**：$1 \le N \le 1500$，$2 \le M \le 2 \times 10^6$，$1 \le A_i, B_j \le M - 1$。

## 思路

<!-- 从暴力想法开始讲，说清楚为什么会超时，再讲怎么优化 -->

非常常用的套路：曼哈顿距离与切比雪夫距离转化。

一切从下面这个恒等式开始。对任意实数 $a, b$，都有

$$\max\big(|a|,\ |b|\big) = \frac{|a + b| + |a - b|}{2}$$

分类讨论同号异号即可得到这个等式是正确的。

### 从切比雪夫推导到曼哈顿

设有两个点 $(x_1, y_1)$ 和 $(x_2, y_2)$，它们的**切比雪夫距离**是

$$\max\big(|x_1 - x_2|,\ |y_1 - y_2|\big)$$

把恒等式套进来，取 $a = x_1 - x_2$、$b = y_1 - y_2$：

$$\max\big(|x_1 - x_2|,\ |y_1 - y_2|\big) = \frac{\big|(x_1 - x_2) + (y_1 - y_2)\big| + \big|(x_1 - x_2) - (y_1 - y_2)\big|}{2}$$

把两个括号各自重新整理：

$$(x_1 - x_2) + (y_1 - y_2) = (x_1 + y_1) - (x_2 + y_2)$$

$$(x_1 - x_2) - (y_1 - y_2) = (x_1 - y_1) - (x_2 - y_2)$$

代回去：

$$\max\big(|x_1 - x_2|,\ |y_1 - y_2|\big) = \frac{\big|(x_1 + y_1) - (x_2 + y_2)\big| + \big|(x_1 - y_1) - (x_2 - y_2)\big|}{2}$$

注意右边两个绝对值里，$x$ 和 $y$ 的组合方式是**一致的**：一个是"都取加"，一个是"都取减"。所以只要引入新坐标

$$u = x + y, \qquad v = x - y$$

右边就变成

$$\frac{|u_1 - u_2| + |v_1 - v_2|}{2}$$

这正好是**新坐标下的曼哈顿距离再除以 2**。于是

$$\max\big(|x_1 - x_2|, |y_1 - y_2|\big) = \frac{|u_1 - u_2| + |v_1 - v_2|}{2}$$

**切比雪夫距离 = 变换后坐标的曼哈顿距离 ÷ 2。**

### 从曼哈顿推导到切比雪夫

把上式中的 $x$ 换成 $u$、$y$ 换成 $v$（同时 $u$ 换成 $x$、$v$ 换成 $y$），又得到一个恒等式：

$$\max\big(|u_1 - u_2|, |v_1 - v_2|\big) = \frac{|x_1 - x_2| + |y_1 - y_2|}{2}, \qquad x = u + v,\ y = u - v$$

把分母 2 移到对面，再对调等号左右，得到

$$|x_1 - x_2| + |y_1 - y_2| = 2\max\big(|u_1 - u_2|, |v_1 - v_2|\big), \qquad u = \frac{x + y}{2},\ v = \frac{x - y}{2}$$

## 关键 trick：通过曼哈顿距离的加法性质把一个求和问题分摊到x轴和y轴两个一维区域

直接算 $f(i,j)$ 要枚举 $N^2$ 个源点，共 $O(N^4)$，且 $\max$ 绑死了 $i,j$，没法预处理。

取 $x_1-x_2=i-s$、$y_1-y_2=j-t$，套恒等式：

$$\max\big(|i-s|,\ |j-t|\big) = \frac{\big|(i+j)-(s+t)\big| + \big|(i-j)-(s-t)\big|}{2}$$

代入 $f(i,j)$：

$$f(i,j) = \frac{1}{2}\underbrace{\sum_{s,t} W(s,t)\big|(i+j)-(s+t)\big|}_{g_1(i+j)} + \frac{1}{2}\underbrace{\sum_{s,t} W(s,t)\big|(i-j)-(s-t)\big|}_{g_2(i-j)}$$

$\max$ 被拆成两项，各自只依赖

$$p = i+j, \qquad q = i-j$$

于是二维问题塌缩成两个独立的一维问题。先按对角线归并：

$$W_1[k] = \sum_{s+t=k} W(s,t), \qquad W_2[k] = \sum_{s-t=k} W(s,t)$$

则两个一维部分的值为

$$g_1(p) = \sum_{k} W_1[k]\,|p-k|, \qquad g_2(q) = \sum_{k} W_2[k]\,|q-k|$$

最终

$$f(i,j) = \frac{g_1(i+j) + g_2(i-j)}{2}$$

于是答案

$$\bigoplus_{i=1}^{N}\bigoplus_{j=1}^{N}\left(\frac{g_1(i+j) + g_2(i-j)}{2} + (i-1)N + (j-1)\right)$$

对单个 $p$，计算 $g_1(p)$ 需枚举 $O(N)$ 种 $k$，是 $O(N)$；但 $p=i+j$ 只有 $2N$ 种取值，把每个 $p$ 的 $g_1$ 都算出来预存，共 $2N \times O(N) = O(N^2)$。$g_2$ 同理。之后逐格求 $f$ 只需取值，合计 $O(N^2)$。

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
const LL N = 2e3 + 10, MOD = 1e9 + 7, P = 13331;
LL n, m, a[N], b[N], mp[N][N], cntu[2 * N], u[2 * N], cntv[2 * N], v[2 * N], sumu[2 * N], sumv[2 * N], ans[N][N], lst;
void solve() {
	cin >> n >> m;
	for (LL i = 1; i <= n;i++) {
		cin >> a[i];
	}
	for (LL i = 1; i <= n;i++) {
		cin >> b[i];
	}
	for (LL i = 1; i <= n;i++) {
		for (LL j = 1; j <= n;j++) {
			mp[i][j] = (a[i] * b[j]) % m;                //计算每一个格子有多少人
		}
	}
	for (LL i = 1; i <= n;i++) {
		for (LL j = 1; j <= n;j++) {
			cntu[i + j]++, u[i + j] += mp[i][j];
			cntv[i - j + n]++, v[i - j + n] += mp[i][j];   //预处理W1[k]和W2[k]
		}
	}
	for (LL i = 2; i <= 2 * n;i++) {
		for (LL j = 2; j <= 2 * n;j++) {
			sumu[i] += u[j] * abs(i - j);                  //对于p的每种取值，分别计算对应的g1(p)
		}
	}
	for (LL i = 1; i <= 2 * n - 1;i++) {
		for (LL j = 1; j <= 2 * n - 1;j++) {
			sumv[i] += v[j] * abs(i - j);                  //对于q的每种取值，分别计算对应的g2(q)
		}
	}
	for (LL i = 1; i <= n;i++) {
		for (LL j = 1; j <= n;j++) {
			ans[i][j] = (sumu[i + j] + sumv[i - j + n]) / 2;     
			ans[i][j] += (i - 1) * n + (j - 1);               //把计算好的答案赋值到每个格子
		}
	}
	for (LL i = 1; i <= n;i++) {
		for (LL j = 1; j <= n;j++) {
			lst ^= ans[i][j];                    //最后的异或答案
		}
	}
	cout << lst << "\n";
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

一开始题目的各种取模异或操作给我吓到了，还真以为要利用异或或者取模的性质呢，结果一点关系也没有！异或取模是为了防止出现规律并减少输入量，最后的异或是为了减少输出量并避免爆LL，加上(i-1)*n+j是为了防止出现对称导致异或为0出现规律。这些都是为了防止出现投机取巧的做法，让人只能想到距离转化，而非解出这道题需用到的地方！

这个套路很常用，以后只要记住最基本的公式就能推导出来转化了。记住当遇到求距离和的时候就要用到曼哈顿距离，因为曼哈顿距离之和可以拆成x方向的和和y方向的和。当遇到求最大值的时候就用切比雪夫距离，因为切比雪夫距离最大值可以拆成x方向的最大值和y方向的最大值，解除了两个方向的耦合，减少复杂度。

### 类似的题

1. P3964 [TJOI2013] 松鼠聚会
2. [ABC351E] Jump Distance Sum
3. [ABC178E] Dist Max

备注：两种坐标变换涉及到除以2的操作，一定要注意奇数除以2会丢失小数点，再乘回来的时候数值就变了，会导致wa，如果莫名其妙出错，请检查这一点！