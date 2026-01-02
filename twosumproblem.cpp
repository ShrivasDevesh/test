// ...existing code...
#include <bits/stdc++.h>
using namespace std;

bool twoSum(const int arr[], int n, int target, int &i_out, int &j_out) {
    unordered_map<int,int> idx; // value -> index
    for (int i = 0; i < n; ++i) {
        int need = target - arr[i];
        auto it = idx.find(need);
        if (it != idx.end()) {
            i_out = it->second;
            j_out = i;
            return true;
        }
        idx[arr[i]] = i;
    }
    return false;
}

int main() {
    int arr[6] = {1,3,4,5,6,7};
    int n = sizeof(arr) / sizeof(arr[0]);

    int key;
    if (!(cin >> key)) return 0;

    int i, j;
    if (twoSum(arr, n, key, i, j)) {
        cout << "Found: indices " << i << " and " << j
             << ", values " << arr[i] << " + " << arr[j] << " = " << key << '\n';
    } else {
        cout << "No pair sums to " << key << '\n';
    }
    return 0;
}
// ...existing code...