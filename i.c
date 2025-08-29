#include <stdio.h>

void rotateArray(int arr[], int n, int r) {
    r = r % n; 
    for (int i = 0; i < n; i++) {
        printf("%d", arr[(i + r) % n]);
        
        if (i < n - 1) {
            printf(" ");
        }
    }
    printf("\n");
}

int main() {
    int t;
    scanf("%d", &t); 

    while (t--) {
        int n;
        scanf("%d", &n); // Number of elements in the array

        int arr[50]; // Maximum size of the array is 50
        for (int i = 0; i < n; i++) {
            scanf("%d", &arr[i]);
        }

        int r;
        scanf("%d", &r); // Number of rotations

        rotateArray(arr, n, r);
    }

    return 0;
}