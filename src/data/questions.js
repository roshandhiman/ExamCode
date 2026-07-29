export const initialQuestionsData = {
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
          { input: "4\n2 7 11 15\n9", expectedOutput: "[0, 1]", isHidden: false },
          { input: "3\n3 2 4\n6", expectedOutput: "[1, 2]", isHidden: false },
          { input: "2\n3 3\n6", expectedOutput: "[0, 1]", isHidden: true },
          { input: "4\n1 5 8 11\n13", expectedOutput: "[1, 2]", isHidden: true },
          { input: "5\n-1 -8 0 4 10\n2", expectedOutput: "[0, 3]", isHidden: true },
          { input: "4\n100 200 500 1000\n700", expectedOutput: "[1, 2]", isHidden: true }
        ],
        testerCode: `import java.util.Scanner;
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

export const getQuestionsData = () => {
  const saved = localStorage.getItem('custom_questions_data');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse custom questions data", e);
    }
  }
  return initialQuestionsData;
};

export const saveQuestionsData = (data) => {
  localStorage.setItem('custom_questions_data', JSON.stringify(data));
};
