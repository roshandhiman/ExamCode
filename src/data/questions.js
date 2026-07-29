export const questionsData = {
  python: {
    arrays: []
  },
  java: {
    arrays: [
      {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
        constraints: `2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
        sampleInput: `nums = [2,7,11,15], target = 9`,
        sampleOutput: `[0, 1]`,
        starterCode: `import java.util.Arrays;
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}
`,
        testcases: [
          { input: "4\n2 7 11 15\n9", expectedOutput: "[0, 1]" },
          { input: "3\n3 2 4\n6", expectedOutput: "[1, 2]" },
          { input: "2\n3 3\n6", expectedOutput: "[0, 1]" }
        ],
        testerCode: `
import java.util.Scanner;
import java.util.Arrays;

class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if(!scanner.hasNextInt()) return;
        int n = scanner.nextInt();
        int[] nums = new int[n];
        for(int i=0; i<n; i++) {
            nums[i] = scanner.nextInt();
        }
        int target = scanner.nextInt();
        
        Solution solution = new Solution();
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}
`
      }
    ],
    strings: [],
    linkedlist: []
  },
  c: {
    arrays: []
  }
};
