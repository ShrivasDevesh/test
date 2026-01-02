#include <bits/stdc++.h>
using namespace std;
int duplicatevalue(int arr[], int size){
    int count = 1;
    for(int i = 0; i<size; i++){
        for(int j = i+1; j<size; j++){
            if(arr[i] == arr[j]){
                cout<<arr[i] << "is duplicate value is :";
                count++;
                cout<< count;
                
            }
        }
    }
}

int main() {
    int arr[10] ={1, 2,2, 3, 4, 5, 6, 7,8,9};

    duplicatevalue(arr, 10);
    

    return 0;
}
