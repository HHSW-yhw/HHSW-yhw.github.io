# ABC132 F Small Products

## 题意

<!-- -->

求出满足下列条件的长度为 $K$ 的正整数序列的数量：序列中任意相邻两个元素的乘积不超过 $N$。其中 $N$ 的范围为 $10^9$，$K$ 的范围为 $100$。

## 思路

<!-- -->

朴素想法肯定是 $dp[i][j]$，代表长度为 $i$ 并且结尾是 $j$ 的合法序列有多少种。转移方程就是先找到所有满足 $j \times k \le N$ 的 $k$，然后从把所有的 $dp[i-1][k]$ 加到 $dp[i][j]$ 上面。但是由于数据范围 $N$ 过大，肯定会超时。这时注意到一个性质，很多的 $j$ 都可以共用一个 $k$ 的取值范围。举个例子，$\lfloor 12/7 \rfloor = \lfloor 12/12 \rfloor = 1$，所以从 $7$ 到 $12$ 这 $6$ 个数字为结尾，前面的数肯定不能超过 $1$，因为他们作为除数的商都是一样的。所以想到数论分块减少复杂度，因为一个块里面的所有数共享一个转移过程。

## 关键 trick

<!-- -->

1. 对于 $N$，块的数量绝对不会超过 $2\sqrt{N}$。

因为对于小于 $\sqrt{N}$ 的数，就算他们一个人单独占据一个块，一共也就 $\sqrt{N}$ 个块。对于大于 $\sqrt{N}$ 的数，他们的商肯定小于 $\sqrt{N}$，那么一共能取到的值也不会超过 $\sqrt{N}$。那么复杂度就降到了 $O(K\sqrt{N})$。

2. 第 $j$ 个块的最右端 $r_j$，恰好等于 $val[cnt-j+1]$，其中 $cnt$ 是块的总数量，$val$ 代表每个块的元素被 $N$ 除过的商。

证明有点难，目前还没看懂。不过观察一下还是很容易得到的，并且我感觉这个性质跟对称性有关。因为你的 $val$ 是商，那被除数除商不就得到除数了吗，而且除数就是原来块的最右端，记住就好。那么对于第 $j$ 块的所有元素，你前面的元素大小肯定不能超过 $val[j]$，而 $val[j]$ 根据性质正好是 $r_{cnt-j+1}$，所以位于 $r_{cnt-j+1}$ 的前面的所有数都可以接，那正好就是前 $cnt-j+1$ 个块了。所以 dp 转移方程为：

$$dp[i][j] = pre[i-1][cnt-j+1]$$

其中 $pre[i][j]$ 是 $dp[i][1 \dots j]$ 带上块长的前缀和：

$$pre[i][j] = pre[i][j-1] + dp[i][j] \times len[j]$$

3. $r_j = \left\lfloor \dfrac{N}{val[j]} \right\rfloor$。

这是我的模板里面计算数论分块所用到的结论，也很重要，就贴在这里。假设 $v = \left\lfloor \dfrac{N}{val[j]} \right\rfloor$，那么根据性质可得：$(v+1) \times val[j]$ 严格大于 $N$，并且 $v \times val[j]$ 小于等于 $N$，可得一定是最右端的数。

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
const LL N = 2e5 + 10, MOD = 1e9 + 7;
LL n, k, cnt, ans, dp[105][N], pre[105][N];
vector<LL> en, val, len;
void solve() {
	cin >> n >> k;
	en.push_back(0), val.push_back(0), len.push_back(0);
	for (LL l = 1, r; l <= n;l=r+1) {
		LL v = n / l;
		r = n / v;
		en.push_back(r);
		val.push_back(v);
		len.push_back(r - l + 1);                                 //处理出块的最右端rj，商val[j]以及每个块的长度
	}
	cnt = en.size() - 1;
	for (LL i = 1; i <= cnt;i++) {
		dp[1][i] = 1;
		pre[1][i] = (pre[1][i - 1] + (dp[1][i] * len[i]) % MOD) % MOD;          //初始化
	}
	for (LL i = 2; i <= k;i++) {
		for (LL j = 1; j <= cnt;j++) {
			dp[i][j] = pre[i - 1][cnt - j + 1];                                 //核心转移方程，维护一个前缀和数组，dp[i][j]的值正好就是上一轮前cnt-j+1的序列的种类之和
			pre[i][j] = (pre[i][j - 1] + (dp[i][j] * len[j]) % MOD) % MOD;      //注意dp代表的是每个块里的任意一个数为j的时候的种类，但是总量的话要乘上块的长度
		}
	}
	cout << pre[k][cnt] << "\n";
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

<!-- -->

数论分块也是比较常用的技巧，我觉得本身这个思想也非常优雅。最关键的就是三个性质一定记住了，第一个和第三个很好理解，第二个也很容易观察到。
