export const practiceTestPapers = [
  {
    id: "paper-1",
    day: "Day 1",
    title: "Practice Test Paper 1",
    subtitle: "Core Java & Logic Foundations (End Term Prep • Lectures 1–30)",
    totalMarks: 80,
    passingMarks: 32,
    examDate: "Exam: 12th Sept",
    instructions: [
      "Lectures 1–30 syllabus covered: Strings, Arrays, 2D Matrices, ArrayList, LinkedList, HashSet, HashMap, and Comprehensive Logic.",
      "In every question, class Main, Scanner input reading, and method headers are LOCKED. You only write the required logic inside the designated method.",
      "Q1 to Q14 carry 5 Marks each; Q15 carries 10 Marks (Total: 80 Marks).",
      "Run Code executes visible sample test cases. Submit evaluates ALL test cases (including hidden edge cases) and awards marks."
    ],
    questions: [
      {
        id: 1,
        paperId: "paper-1",
        number: "Q1",
        title: "Q1 — String Basics",
        category: "Strings",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf process(String s) ke andar code likhna.",
        concept: "length(), charAt(), toUpperCase(), toLowerCase()",
        statement: `Given a string \`s\`, print the following details in exact format:
1. Length of string
2. First character
3. Last character
4. Complete uppercase version
5. Complete lowercase version

Output format:
\`\`\`
Length: <len>
First: <char>
Last: <char>
Upper: <upper>
Lower: <lower>
\`\`\``,
        sampleInput: `HeLLo`,
        sampleOutput: `Length: 5
First: H
Last: o
Upper: HELLO
Lower: hello`,
        constraints: `1 <= s.length() <= 1000
s contains printable characters.`,
        methodSignature: "static void process(String s)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(String s) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        process(s);
    }
}`,
        referenceSolution: `        System.out.println("Length: " + s.length());
        System.out.println("First: " + s.charAt(0));
        System.out.println("Last: " + s.charAt(s.length() - 1));
        System.out.println("Upper: " + s.toUpperCase());
        System.out.println("Lower: " + s.toLowerCase());`,
        testcases: [
          {
            id: 1,
            input: "HeLLo",
            expectedOutput: "Length: 5\nFirst: H\nLast: o\nUpper: HELLO\nLower: hello",
            isHidden: false,
            explanation: "Basic mixed case string"
          },
          {
            id: 2,
            input: "Java",
            expectedOutput: "Length: 4\nFirst: J\nLast: a\nUpper: JAVA\nLower: java",
            isHidden: false,
            explanation: "Short 4-character word"
          },
          {
            id: 3,
            input: "X",
            expectedOutput: "Length: 1\nFirst: X\nLast: X\nUpper: X\nLower: x",
            isHidden: true,
            explanation: "Single character edge case"
          },
          {
            id: 4,
            input: "EndTerm Exam 2026!",
            expectedOutput: "Length: 18\nFirst: E\nLast: !\nUpper: ENDTERM EXAM 2026!\nLower: endterm exam 2026!",
            isHidden: true,
            explanation: "String with spaces, numbers and special symbols"
          },
          {
            id: 5,
            input: "a b c",
            expectedOutput: "Length: 5\nFirst: a\nLast: c\nUpper: A B C\nLower: a b c",
            isHidden: true,
            explanation: "Spaces inside string"
          }
        ]
      },
      {
        id: 2,
        paperId: "paper-1",
        number: "Q2",
        title: "Q2 — String + Logic",
        category: "Strings",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf countVowels(String s) ke andar code likhna.",
        concept: "Case-insensitive character inspection, loops, conditionals",
        statement: `Count the total number of vowels (\`a, e, i, o, u\`) in the string \`s\`, case-insensitive.

Output format:
\`\`\`
Vowels: <count>
\`\`\``,
        sampleInput: `Programming`,
        sampleOutput: `Vowels: 3`,
        constraints: `1 <= s.length() <= 10^5
Characters include English letters, digits, and spaces.`,
        methodSignature: "static void countVowels(String s)",
        prefixCode: `import java.util.*;

public class Main {

    static void countVowels(String s) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        countVowels(s);
    }
}`,
        referenceSolution: `        int count = 0;
        String lower = s.toLowerCase();
        for (int i = 0; i < lower.length(); i++) {
            char c = lower.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                count++;
            }
        }
        System.out.println("Vowels: " + count);`,
        testcases: [
          {
            id: 1,
            input: "Programming",
            expectedOutput: "Vowels: 3",
            isHidden: false,
            explanation: "o, a, i are the 3 vowels"
          },
          {
            id: 2,
            input: "Education",
            expectedOutput: "Vowels: 5",
            isHidden: false,
            explanation: "Contains all five vowels"
          },
          {
            id: 3,
            input: "rhythm",
            expectedOutput: "Vowels: 0",
            isHidden: true,
            explanation: "Word with 0 vowels"
          },
          {
            id: 4,
            input: "AEIOU aeiou",
            expectedOutput: "Vowels: 10",
            isHidden: true,
            explanation: "Upper and lowercase vowels check"
          },
          {
            id: 5,
            input: "The quick brown fox jumps over the lazy dog",
            expectedOutput: "Vowels: 11",
            isHidden: true,
            explanation: "Sentence containing 11 vowels"
          }
        ]
      },
      {
        id: 3,
        paperId: "paper-1",
        number: "Q3",
        title: "Q3 — StringBuilder",
        category: "Strings",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf reverse(String s) ke andar code likhna.",
        concept: "new StringBuilder(s).reverse().toString()",
        statement: `Reverse the given string \`s\` using \`StringBuilder\` and print the reversed string.

Output format:
\`\`\`
<reversed_string>
\`\`\``,
        sampleInput: `JavaProgramming`,
        sampleOutput: `gnimmargorPavaJ`,
        constraints: `1 <= s.length() <= 10^5`,
        methodSignature: "static void reverse(String s)",
        prefixCode: `import java.util.*;

public class Main {

    static void reverse(String s) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        reverse(s);
    }
}`,
        referenceSolution: `        System.out.println(new StringBuilder(s).reverse().toString());`,
        testcases: [
          {
            id: 1,
            input: "JavaProgramming",
            expectedOutput: "gnimmargorPavaJ",
            isHidden: false,
            explanation: "Standard string reversal"
          },
          {
            id: 2,
            input: "hello",
            expectedOutput: "olleh",
            isHidden: false,
            explanation: "Simple 5-letter word reversal"
          },
          {
            id: 3,
            input: "racecar",
            expectedOutput: "racecar",
            isHidden: true,
            explanation: "Palindrome word reversal"
          },
          {
            id: 4,
            input: "123456789",
            expectedOutput: "987654321",
            isHidden: true,
            explanation: "Numeric string reversal"
          },
          {
            id: 5,
            input: "Keep practicing every day!",
            expectedOutput: "!yad yreve gnicitcarp peeK",
            isHidden: true,
            explanation: "String with spaces and punctuation"
          }
        ]
      },
      {
        id: 4,
        paperId: "paper-1",
        number: "Q4",
        title: "Q4 — String + split()",
        category: "Strings",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf processSentence(String s) ke andar code likhna.",
        concept: "split() + array + loops + length comparison",
        statement: `A sentence \`s\` is given. Print:
1. Total number of words
2. Longest word
3. Shortest word

⚠️ **Tie-breaker Rule**: If two or more words share the maximum or minimum length, choose the **first** one that appears in the sentence.

Output format:
\`\`\`
Words: <count>
Longest: <word>
Shortest: <word>
\`\`\``,
        sampleInput: `Java makes coding interesting`,
        sampleOutput: `Words: 4
Longest: interesting
Shortest: Java`,
        constraints: `1 <= words <= 1000
Words are separated by spaces.`,
        methodSignature: "static void processSentence(String s)",
        prefixCode: `import java.util.*;

public class Main {

    static void processSentence(String s) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        processSentence(s);
    }
}`,
        referenceSolution: `        String[] words = s.split("\\\\s+");
        String longest = words[0];
        String shortest = words[0];
        for (int i = 1; i < words.length; i++) {
            if (words[i].length() > longest.length()) {
                longest = words[i];
            }
            if (words[i].length() < shortest.length()) {
                shortest = words[i];
            }
        }
        System.out.println("Words: " + words.length);
        System.out.println("Longest: " + longest);
        System.out.println("Shortest: " + shortest);`,
        testcases: [
          {
            id: 1,
            input: "Java makes coding interesting",
            expectedOutput: "Words: 4\nLongest: interesting\nShortest: Java",
            isHidden: false,
            explanation: "Standard sentence"
          },
          {
            id: 2,
            input: "cat and dog",
            expectedOutput: "Words: 3\nLongest: cat\nShortest: cat",
            isHidden: false,
            explanation: "Tie breaker - all length 3, first word 'cat' selected for both"
          },
          {
            id: 3,
            input: "One two three four five",
            expectedOutput: "Words: 5\nLongest: three\nShortest: One",
            isHidden: true,
            explanation: "Tie breaker among 3-letter words (One, two)"
          },
          {
            id: 4,
            input: "Sun and sky are blue",
            expectedOutput: "Words: 5\nLongest: blue\nShortest: Sun",
            isHidden: true,
            explanation: "First shortest is Sun"
          },
          {
            id: 5,
            input: "Consistency is the ultimate key to success",
            expectedOutput: "Words: 7\nLongest: Consistency\nShortest: is",
            isHidden: true,
            explanation: "Shortest tie between 'is' and 'to'"
          }
        ]
      },
      {
        id: 5,
        paperId: "paper-1",
        number: "Q5",
        title: "Q5 — Compress String",
        category: "Strings",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf compress(String s) ke andar code likhna.",
        concept: "Consecutive run-length compression, linear scan",
        statement: `Compress consecutive repeating characters using character + frequency.

⚠️ **Important**: Only consecutive identical characters count together! Non-consecutive characters form separate frequency counts.

Examples:
- \`aaabca\` → \`a3b1c1a1\`
- \`aaaabbccdaa\` → \`a4b2c2d1a2\`

Output format:
\`\`\`
<compressed_string>
\`\`\``,
        sampleInput: `aaabca`,
        sampleOutput: `a3b1c1a1`,
        constraints: `1 <= s.length() <= 10^5
s contains lowercase/uppercase characters.`,
        methodSignature: "static void compress(String s)",
        prefixCode: `import java.util.*;

public class Main {

    static void compress(String s) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        compress(s);
    }
}`,
        referenceSolution: `        if (s == null || s.length() == 0) return;
        StringBuilder sb = new StringBuilder();
        int count = 1;
        for (int i = 0; i < s.length(); i++) {
            if (i + 1 < s.length() && s.charAt(i) == s.charAt(i + 1)) {
                count++;
            } else {
                sb.append(s.charAt(i)).append(count);
                count = 1;
            }
        }
        System.out.println(sb.toString());`,
        testcases: [
          {
            id: 1,
            input: "aaabca",
            expectedOutput: "a3b1c1a1",
            isHidden: false,
            explanation: "Consecutive compression with trailing a"
          },
          {
            id: 2,
            input: "aaaabbccdaa",
            expectedOutput: "a4b2c2d1a2",
            isHidden: false,
            explanation: "Multiple groups"
          },
          {
            id: 3,
            input: "a",
            expectedOutput: "a1",
            isHidden: true,
            explanation: "Single character string"
          },
          {
            id: 4,
            input: "abcdef",
            expectedOutput: "a1b1c1d1e1f1",
            isHidden: true,
            explanation: "All distinct characters"
          },
          {
            id: 5,
            input: "wwwwww",
            expectedOutput: "w6",
            isHidden: true,
            explanation: "All identical characters"
          },
          {
            id: 6,
            input: "aabbbbaaaaccc",
            expectedOutput: "a2b4a4c3",
            isHidden: true,
            explanation: "Repeating clusters of letters"
          }
        ]
      },
      {
        id: 6,
        paperId: "paper-1",
        number: "Q6",
        title: "Q6 — Array Min/Max + Index",
        category: "Arrays",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf analyze(int[] a) ke andar code likhna.",
        concept: "Tracking min/max values and first-occurrence 0-based indices",
        statement: `Given an integer array \`a\`, print:
1. Minimum value
2. 0-based index of minimum value
3. Maximum value
4. 0-based index of maximum value

⚠️ **Tie-breaker Rule**: If the minimum or maximum appears multiple times, print the **first** index.

Output format:
\`\`\`
Min: <min_val>
Min Index: <min_idx>
Max: <max_val>
Max Index: <max_idx>
\`\`\``,
        sampleInput: `5
40 10 70 10 70`,
        sampleOutput: `Min: 10
Min Index: 1
Max: 70
Max Index: 2`,
        constraints: `1 <= a.length <= 10^5
-10^9 <= a[i] <= 10^9`,
        methodSignature: "static void analyze(int[] a)",
        prefixCode: `import java.util.*;

public class Main {

    static void analyze(int[] a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        analyze(a);
    }
}`,
        referenceSolution: `        int min = a[0], minIdx = 0;
        int max = a[0], maxIdx = 0;
        for (int i = 1; i < a.length; i++) {
            if (a[i] < min) {
                min = a[i];
                minIdx = i;
            }
            if (a[i] > max) {
                max = a[i];
                maxIdx = i;
            }
        }
        System.out.println("Min: " + min);
        System.out.println("Min Index: " + minIdx);
        System.out.println("Max: " + max);
        System.out.println("Max Index: " + maxIdx);`,
        testcases: [
          {
            id: 1,
            input: "5\n40 10 70 10 70",
            expectedOutput: "Min: 10\nMin Index: 1\nMax: 70\nMax Index: 2",
            isHidden: false,
            explanation: "Tie breaker test"
          },
          {
            id: 2,
            input: "3\n5 1 9",
            expectedOutput: "Min: 1\nMin Index: 1\nMax: 9\nMax Index: 2",
            isHidden: false,
            explanation: "Simple 3-element array"
          },
          {
            id: 3,
            input: "1\n50",
            expectedOutput: "Min: 50\nMin Index: 0\nMax: 50\nMax Index: 0",
            isHidden: true,
            explanation: "Single element array"
          },
          {
            id: 4,
            input: "4\n-10 -50 20 -50",
            expectedOutput: "Min: -50\nMin Index: 1\nMax: 20\nMax Index: 2",
            isHidden: true,
            explanation: "Negative values tie"
          },
          {
            id: 5,
            input: "5\n5 5 5 5 5",
            expectedOutput: "Min: 5\nMin Index: 0\nMax: 5\nMax Index: 0",
            isHidden: true,
            explanation: "All identical elements"
          },
          {
            id: 6,
            input: "6\n100 20 500 10 500 5",
            expectedOutput: "Min: 5\nMin Index: 5\nMax: 500\nMax Index: 2",
            isHidden: true,
            explanation: "Max ties at indices 2 and 4"
          }
        ]
      },
      {
        id: 7,
        paperId: "paper-1",
        number: "Q7",
        title: "Q7 — Array Positive/Negative/Even/Odd",
        category: "Arrays",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf analyze(int[] a) ke andar code likhna.",
        concept: "Multi-condition filtering, parity, signed sum accumulators",
        statement: `Analyze the array \`a\` and print:
1. Positive count (\`val > 0\`)
2. Negative count (\`val < 0\`)
3. Even count (\`val % 2 == 0\`)
4. Odd count (\`val % 2 != 0\`)
5. Sum of positive numbers
6. Sum of negative numbers

⚠️ Note: \`0\` is even, but neither positive nor negative.

Output format:
\`\`\`
Positive: <count>
Negative: <count>
Even: <count>
Odd: <count>
Positive Sum: <sum>
Negative Sum: <sum>
\`\`\``,
        sampleInput: `6
10 -5 7 -8 4 -3`,
        sampleOutput: `Positive: 3
Negative: 3
Even: 3
Odd: 3
Positive Sum: 21
Negative Sum: -16`,
        constraints: `1 <= a.length <= 10^5
-10^6 <= a[i] <= 10^6`,
        methodSignature: "static void analyze(int[] a)",
        prefixCode: `import java.util.*;

public class Main {

    static void analyze(int[] a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        analyze(a);
    }
}`,
        referenceSolution: `        int posCount = 0, negCount = 0, evenCount = 0, oddCount = 0;
        int posSum = 0, negSum = 0;
        for (int val : a) {
            if (val > 0) {
                posCount++;
                posSum += val;
            } else if (val < 0) {
                negCount++;
                negSum += val;
            }
            if (val % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }
        System.out.println("Positive: " + posCount);
        System.out.println("Negative: " + negCount);
        System.out.println("Even: " + evenCount);
        System.out.println("Odd: " + oddCount);
        System.out.println("Positive Sum: " + posSum);
        System.out.println("Negative Sum: " + negSum);`,
        testcases: [
          {
            id: 1,
            input: "6\n10 -5 7 -8 4 -3",
            expectedOutput: "Positive: 3\nNegative: 3\nEven: 3\nOdd: 3\nPositive Sum: 21\nNegative Sum: -16",
            isHidden: false,
            explanation: "Sample with mix of positive, negative, even, odd"
          },
          {
            id: 2,
            input: "4\n1 2 3 4",
            expectedOutput: "Positive: 4\nNegative: 0\nEven: 2\nOdd: 2\nPositive Sum: 10\nNegative Sum: 0",
            isHidden: false,
            explanation: "All positive values"
          },
          {
            id: 3,
            input: "5\n0 2 4 -2 -4",
            expectedOutput: "Positive: 2\nNegative: 2\nEven: 5\nOdd: 0\nPositive Sum: 6\nNegative Sum: -6",
            isHidden: true,
            explanation: "Includes 0 which is even but neither pos nor neg"
          },
          {
            id: 4,
            input: "4\n-1 -3 -5 -7",
            expectedOutput: "Positive: 0\nNegative: 4\nEven: 0\nOdd: 4\nPositive Sum: 0\nNegative Sum: -16",
            isHidden: true,
            explanation: "All negative odd values"
          },
          {
            id: 5,
            input: "3\n1 3 5",
            expectedOutput: "Positive: 3\nNegative: 0\nEven: 0\nOdd: 3\nPositive Sum: 9\nNegative Sum: 0",
            isHidden: true,
            explanation: "All odd positive values"
          }
        ]
      },
      {
        id: 8,
        paperId: "paper-1",
        number: "Q8",
        title: "Q8 — Array Second Largest Distinct",
        category: "Arrays",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf findSecondLargest(int[] a) ke andar code likhna.",
        concept: "Distinct elements ordering, TreeSet / tracking 2 distinct maxima",
        statement: `Find the **second largest distinct** element in the integer array \`a\`.

If found, print:
\`\`\`
Second Largest: <val>
\`\`\`

If all elements in the array are identical, or no second distinct element exists:
\`\`\`
No Second Largest
\`\`\``,
        sampleInput: `7
10 50 20 50 40 30 40`,
        sampleOutput: `Second Largest: 40`,
        constraints: `1 <= a.length <= 10^5
-10^9 <= a[i] <= 10^9`,
        methodSignature: "static void findSecondLargest(int[] a)",
        prefixCode: `import java.util.*;

public class Main {

    static void findSecondLargest(int[] a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        findSecondLargest(a);
    }
}`,
        referenceSolution: `        TreeSet<Integer> set = new TreeSet<>();
        for (int x : a) set.add(x);
        if (set.size() < 2) {
            System.out.println("No Second Largest");
        } else {
            set.pollLast();
            System.out.println("Second Largest: " + set.last());
        }`,
        testcases: [
          {
            id: 1,
            input: "7\n10 50 20 50 40 30 40",
            expectedOutput: "Second Largest: 40",
            isHidden: false,
            explanation: "Distinct elements are 10,20,30,40,50 -> 2nd largest is 40"
          },
          {
            id: 2,
            input: "5\n10 10 10 10 10",
            expectedOutput: "No Second Largest",
            isHidden: false,
            explanation: "All identical elements"
          },
          {
            id: 3,
            input: "2\n5 10",
            expectedOutput: "Second Largest: 5",
            isHidden: true,
            explanation: "Two distinct elements"
          },
          {
            id: 4,
            input: "4\n-10 -20 -5 -2",
            expectedOutput: "Second Largest: -5",
            isHidden: true,
            explanation: "Negative values: largest -2, second largest -5"
          },
          {
            id: 5,
            input: "1\n100",
            expectedOutput: "No Second Largest",
            isHidden: true,
            explanation: "Array of size 1"
          },
          {
            id: 6,
            input: "6\n70 70 60 60 50 50",
            expectedOutput: "Second Largest: 60",
            isHidden: true,
            explanation: "Duplicates among top numbers"
          }
        ]
      },
      {
        id: 9,
        paperId: "paper-1",
        number: "Q9",
        title: "Q9 — 2D Array Diagonal",
        category: "2D Arrays",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf diagonalSum(int[][] a) ke andar code likhna.",
        concept: "Square matrix: main diagonal a[i][i] and secondary diagonal a[i][n-1-i]",
        statement: `For a square matrix \`a\` of size \`n x n\`, calculate and print:
1. Main Diagonal sum (\`a[i][i]\`)
2. Secondary Diagonal sum (\`a[i][n - 1 - i]\`)

Output format:
\`\`\`
Main Diagonal: <sum>
Secondary Diagonal: <sum>
\`\`\``,
        sampleInput: `3
1 2 3
4 5 6
7 8 9`,
        sampleOutput: `Main Diagonal: 15
Secondary Diagonal: 15`,
        constraints: `1 <= n <= 500
-10^6 <= a[i][j] <= 10^6`,
        methodSignature: "static void diagonalSum(int[][] a)",
        prefixCode: `import java.util.*;

public class Main {

    static void diagonalSum(int[][] a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[][] a = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                a[i][j] = sc.nextInt();
            }
        }

        diagonalSum(a);
    }
}`,
        referenceSolution: `        int n = a.length;
        int mainSum = 0, secSum = 0;
        for (int i = 0; i < n; i++) {
            mainSum += a[i][i];
            secSum += a[i][n - 1 - i];
        }
        System.out.println("Main Diagonal: " + mainSum);
        System.out.println("Secondary Diagonal: " + secSum);`,
        testcases: [
          {
            id: 1,
            input: "3\n1 2 3\n4 5 6\n7 8 9",
            expectedOutput: "Main Diagonal: 15\nSecondary Diagonal: 15",
            isHidden: false,
            explanation: "Main: 1+5+9=15, Sec: 3+5+7=15"
          },
          {
            id: 2,
            input: "2\n1 2\n3 4",
            expectedOutput: "Main Diagonal: 5\nSecondary Diagonal: 5",
            isHidden: false,
            explanation: "Main: 1+4=5, Sec: 2+3=5"
          },
          {
            id: 3,
            input: "1\n42",
            expectedOutput: "Main Diagonal: 42\nSecondary Diagonal: 42",
            isHidden: true,
            explanation: "1x1 matrix"
          },
          {
            id: 4,
            input: "4\n1 0 0 4\n0 2 3 0\n0 3 2 0\n4 0 0 1",
            expectedOutput: "Main Diagonal: 6\nSecondary Diagonal: 14",
            isHidden: true,
            explanation: "Main: 1+2+2+1=6, Sec: 4+3+3+4=14"
          },
          {
            id: 5,
            input: "3\n-1 2 -3\n4 -5 6\n-7 8 -9",
            expectedOutput: "Main Diagonal: -15\nSecondary Diagonal: -15",
            isHidden: true,
            explanation: "Negative values matrix"
          }
        ]
      },
      {
        id: 10,
        paperId: "paper-1",
        number: "Q10",
        title: "Q10 — 2D Matrix Row/Column Logic",
        category: "2D Arrays",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(int[][] a) ke andar code likhna.",
        concept: "Row-major and column-major matrix traversals with 1-based labels",
        statement: `Given a 2D matrix of size \`r x c\`, calculate and print:
1. Sum of each row from \`Row 1\` to \`Row r\`
2. Sum of each column from \`Column 1\` to \`Column c\`

Output format:
\`\`\`
Row 1: <sum>
Row 2: <sum>
...
Column 1: <sum>
Column 2: <sum>
...
\`\`\``,
        sampleInput: `2 3
1 2 3
4 5 6`,
        sampleOutput: `Row 1: 6
Row 2: 15
Column 1: 5
Column 2: 7
Column 3: 9`,
        constraints: `1 <= r, c <= 500
-10^6 <= a[i][j] <= 10^6`,
        methodSignature: "static void process(int[][] a)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(int[][] a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }

        process(a);
    }
}`,
        referenceSolution: `        int r = a.length;
        int c = a[0].length;
        for (int i = 0; i < r; i++) {
            int rowSum = 0;
            for (int j = 0; j < c; j++) {
                rowSum += a[i][j];
            }
            System.out.println("Row " + (i + 1) + ": " + rowSum);
        }
        for (int j = 0; j < c; j++) {
            int colSum = 0;
            for (int i = 0; i < r; i++) {
                colSum += a[i][j];
            }
            System.out.println("Column " + (j + 1) + ": " + colSum);
        }`,
        testcases: [
          {
            id: 1,
            input: "2 3\n1 2 3\n4 5 6",
            expectedOutput: "Row 1: 6\nRow 2: 15\nColumn 1: 5\nColumn 2: 7\nColumn 3: 9",
            isHidden: false,
            explanation: "2x3 matrix"
          },
          {
            id: 2,
            input: "1 1\n10",
            expectedOutput: "Row 1: 10\nColumn 1: 10",
            isHidden: false,
            explanation: "1x1 matrix"
          },
          {
            id: 3,
            input: "3 2\n1 4\n2 5\n3 6",
            expectedOutput: "Row 1: 5\nRow 2: 7\nRow 3: 9\nColumn 1: 6\nColumn 2: 15",
            isHidden: true,
            explanation: "3x2 matrix"
          },
          {
            id: 4,
            input: "3 3\n-1 -2 -3\n4 5 6\n0 0 0",
            expectedOutput: "Row 1: -6\nRow 2: 15\nRow 3: 0\nColumn 1: 3\nColumn 2: 3\nColumn 3: 3",
            isHidden: true,
            explanation: "Negative values and zero row"
          }
        ]
      },
      {
        id: 11,
        paperId: "paper-1",
        number: "Q11",
        title: "Q11 — ArrayList + Remove Condition",
        category: "Collections",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(ArrayList<Integer> a) ke andar code likhna.",
        concept: "ArrayList element removal condition: remove <= 0, avoiding ConcurrentModificationException",
        statement: `Remove all **negative numbers and zeros** (\`x <= 0\`) from the given \`ArrayList<Integer>\`.
Print the remaining elements on a single line separated by spaces.

⚠️ **Warning**: Do not remove elements while iterating using standard enhanced for-each loop. Use \`removeIf()\` or backward index iteration.

Output format:
\`\`\`
<val1> <val2> ...
\`\`\``,
        sampleInput: `7
10 -2 0 30 -5 40 0`,
        sampleOutput: `10 30 40`,
        constraints: `1 <= a.size() <= 10^5
-10^6 <= a.get(i) <= 10^6`,
        methodSignature: "static void process(ArrayList<Integer> a)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(ArrayList<Integer> a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        ArrayList<Integer> a = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            a.add(sc.nextInt());
        }

        process(a);
    }
}`,
        referenceSolution: `        a.removeIf(x -> x <= 0);
        for (int i = 0; i < a.size(); i++) {
            System.out.print(a.get(i) + (i == a.size() - 1 ? "" : " "));
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "7\n10 -2 0 30 -5 40 0",
            expectedOutput: "10 30 40",
            isHidden: false,
            explanation: "Standard removal of negatives and zeros"
          },
          {
            id: 2,
            input: "4\n1 2 3 4",
            expectedOutput: "1 2 3 4",
            isHidden: false,
            explanation: "No elements removed"
          },
          {
            id: 3,
            input: "5\n-1 -2 -3 0 0",
            expectedOutput: "",
            isHidden: true,
            explanation: "All elements removed"
          },
          {
            id: 4,
            input: "6\n0 0 0 -1 5 0",
            expectedOutput: "5",
            isHidden: true,
            explanation: "Only 1 element remains"
          },
          {
            id: 5,
            input: "8\n100 0 -50 200 -1 0 300 400",
            expectedOutput: "100 200 300 400",
            isHidden: true,
            explanation: "Multiple positive values remain"
          }
        ]
      },
      {
        id: 12,
        paperId: "paper-1",
        number: "Q12",
        title: "Q12 — LinkedList + First/Last + Logic",
        category: "Collections",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(LinkedList<Integer> a) ke andar code likhna.",
        concept: "LinkedList removeFirst(), removeLast(), Collections.min/max",
        statement: `Given a \`LinkedList<Integer>\`, perform the following:
1. Remove the first element (\`removeFirst()\`).
2. Remove the last element (\`removeLast()\`).
3. Print:
   - Remaining elements separated by space
   - Maximum of remaining elements
   - Minimum of remaining elements

Output format:
\`\`\`
Remaining: <val1> <val2> ...
Max: <max_val>
Min: <min_val>
\`\`\``,
        sampleInput: `6
20 50 10 40 30 60`,
        sampleOutput: `Remaining: 50 10 40 30
Max: 50
Min: 10`,
        constraints: `3 <= a.size() <= 10^5`,
        methodSignature: "static void process(LinkedList<Integer> a)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(LinkedList<Integer> a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        LinkedList<Integer> a = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            a.add(sc.nextInt());
        }

        process(a);
    }
}`,
        referenceSolution: `        a.removeFirst();
        a.removeLast();
        System.out.print("Remaining:");
        int max = Collections.max(a);
        int min = Collections.min(a);
        for (int x : a) {
            System.out.print(" " + x);
        }
        System.out.println();
        System.out.println("Max: " + max);
        System.out.println("Min: " + min);`,
        testcases: [
          {
            id: 1,
            input: "6\n20 50 10 40 30 60",
            expectedOutput: "Remaining: 50 10 40 30\nMax: 50\nMin: 10",
            isHidden: false,
            explanation: "First(20) and Last(60) removed"
          },
          {
            id: 2,
            input: "4\n10 99 2 5",
            expectedOutput: "Remaining: 99 2\nMax: 99\nMin: 2",
            isHidden: false,
            explanation: "First(10) and Last(5) removed"
          },
          {
            id: 3,
            input: "3\n100 75 200",
            expectedOutput: "Remaining: 75\nMax: 75\nMin: 75",
            isHidden: true,
            explanation: "Only 1 element remains after removing head and tail"
          },
          {
            id: 4,
            input: "5\n5 -10 -50 30 100",
            expectedOutput: "Remaining: -10 -50 30\nMax: 30\nMin: -50",
            isHidden: true,
            explanation: "Negative values in list"
          }
        ]
      },
      {
        id: 13,
        paperId: "paper-1",
        number: "Q13",
        title: "Q13 — HashSet + Frequency Logic",
        category: "Set & Map",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(int[] a) ke andar code likhna.",
        concept: "Counting frequencies, uniqueness filtering with Set/Map (> 2 occurrences)",
        statement: `Given an array \`a\`, print only those numbers whose **frequency is strictly greater than 2** (appears 3 or more times).
Each qualifying number must be printed **only once** (in the order of first appearance).

If every number in the array occurs at most twice (frequency <= 2), print:
\`\`\`
No More Than 2
\`\`\`

Output format:
\`\`\`
<num1> <num2> ...
\`\`\``,
        sampleInput: `10
10 20 10 30 40 20 50 10 20 60`,
        sampleOutput: `10 20`,
        constraints: `1 <= a.length <= 10^5
-10^9 <= a[i] <= 10^9`,
        methodSignature: "static void process(int[] a)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(int[] a) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }

        process(a);
    }
}`,
        referenceSolution: `        Map<Integer, Integer> map = new LinkedHashMap<>();
        for (int x : a) {
            map.put(x, map.getOrDefault(x, 0) + 1);
        }
        List<Integer> result = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if (entry.getValue() > 2) {
                result.add(entry.getKey());
            }
        }
        if (result.isEmpty()) {
            System.out.println("No More Than 2");
        } else {
            for (int i = 0; i < result.size(); i++) {
                System.out.print(result.get(i) + (i == result.size() - 1 ? "" : " "));
            }
            System.out.println();
        }`,
        testcases: [
          {
            id: 1,
            input: "10\n10 20 10 30 40 20 50 10 20 60",
            expectedOutput: "10 20",
            isHidden: false,
            explanation: "10 appears 3 times, 20 appears 3 times"
          },
          {
            id: 2,
            input: "6\n10 20 30 10 20 30",
            expectedOutput: "No More Than 2",
            isHidden: false,
            explanation: "Every number appears exactly 2 times"
          },
          {
            id: 3,
            input: "5\n7 7 7 7 7",
            expectedOutput: "7",
            isHidden: true,
            explanation: "Single number appearing 5 times"
          },
          {
            id: 4,
            input: "4\n1 2 3 4",
            expectedOutput: "No More Than 2",
            isHidden: true,
            explanation: "All frequencies are 1"
          },
          {
            id: 5,
            input: "8\n5 5 2 2 5 2 9 9",
            expectedOutput: "5 2",
            isHidden: true,
            explanation: "5 appears 3 times, 2 appears 3 times"
          }
        ]
      },
      {
        id: 14,
        paperId: "paper-1",
        number: "Q14",
        title: "Q14 — HashMap + String",
        category: "Set & Map",
        difficulty: "Hard",
        marks: 5,
        tagline: "Tera kaam: Sirf frequency(String s) ke andar code likhna.",
        concept: "HashMap / LinkedHashMap getOrDefault(), word frequency counting",
        statement: `Read a sentence \`s\` and count the frequency of every word using \`HashMap<String, Integer>\`.
Print each word and its frequency in the format:
\`\`\`
<word>: <count>
\`\`\`
Print words in the order of their **first appearance** in the sentence.`,
        sampleInput: `java code java programming code java`,
        sampleOutput: `java: 3
code: 2
programming: 1`,
        constraints: `1 <= words <= 10^5`,
        methodSignature: "static void frequency(String s)",
        prefixCode: `import java.util.*;

public class Main {

    static void frequency(String s) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s = sc.nextLine();

        frequency(s);
    }
}`,
        referenceSolution: `        String[] words = s.split("\\\\s+");
        Map<String, Integer> map = new LinkedHashMap<>();
        for (String w : words) {
            map.put(w, map.getOrDefault(w, 0) + 1);
        }
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }`,
        testcases: [
          {
            id: 1,
            input: "java code java programming code java",
            expectedOutput: "java: 3\ncode: 2\nprogramming: 1",
            isHidden: false,
            explanation: "java:3, code:2, programming:1"
          },
          {
            id: 2,
            input: "hello world hello",
            expectedOutput: "hello: 2\nworld: 1",
            isHidden: false,
            explanation: "hello:2, world:1"
          },
          {
            id: 3,
            input: "apple banana orange apple orange apple",
            expectedOutput: "apple: 3\nbanana: 1\norange: 2",
            isHidden: true,
            explanation: "apple:3, banana:1, orange:2"
          },
          {
            id: 4,
            input: "test test test test",
            expectedOutput: "test: 4",
            isHidden: true,
            explanation: "All words identical"
          },
          {
            id: 5,
            input: "single",
            expectedOutput: "single: 1",
            isHidden: true,
            explanation: "Single word input"
          }
        ]
      },
      {
        id: 15,
        paperId: "paper-1",
        number: "Q15",
        title: "Q15 — Employee Performance Analyzer",
        category: "Mixed Hard",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf process(String[] names, int[] marks) ke andar code likhna.",
        concept: "Full Mixed 10-Mark Question: Array, String, Min/Max, Average, Filter, StringBuilder Reversal",
        statement: `You are given employee names and their performance scores. Perform the following operations:

1. Find the employee with the **highest score**.
2. Find the employee with the **lowest score**.
3. Print their names, scores, and 0-based indices.
   ⚠️ If highest/lowest score occurs multiple times, use the **first occurrence**.
4. Calculate the **average score** (printed with 2 decimal places, e.g. \`70.00\`).
5. Print all employees whose score is strictly greater than the average score, separated by spaces.
6. Print the employee names in reverse order using \`StringBuilder\`.

Output format:
\`\`\`
Highest: <name>
Highest Score: <score>
Highest Index: <index>
Lowest: <name>
Lowest Score: <score>
Lowest Index: <index>
Average: <avg_2_decimals>
Above Average: <name1> <name2> ...
Reverse Names: <nameN> <nameN-1> ... <name1>
\`\`\``,
        sampleInput: `5
Aman 80
Riya 60
Karan 90
Simran 70
Raj 50`,
        sampleOutput: `Highest: Karan
Highest Score: 90
Highest Index: 2
Lowest: Raj
Lowest Score: 50
Lowest Index: 4
Average: 70.00
Above Average: Aman Karan
Reverse Names: Raj Simran Karan Riya Aman`,
        constraints: `1 <= n <= 10^5
0 <= marks[i] <= 100`,
        methodSignature: "static void process(String[] names, int[] marks)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(String[] names, int[] marks) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        String[] names = new String[n];
        int[] marks = new int[n];
        for (int i = 0; i < n; i++) {
            names[i] = sc.next();
            marks[i] = sc.nextInt();
        }

        process(names, marks);
    }
}`,
        referenceSolution: `        int n = names.length;
        int maxIdx = 0, minIdx = 0;
        double sum = 0;
        for (int i = 0; i < n; i++) {
            sum += marks[i];
            if (marks[i] > marks[maxIdx]) {
                maxIdx = i;
            }
            if (marks[i] < marks[minIdx]) {
                minIdx = i;
            }
        }
        double avg = sum / n;
        System.out.println("Highest: " + names[maxIdx]);
        System.out.println("Highest Score: " + marks[maxIdx]);
        System.out.println("Highest Index: " + maxIdx);
        System.out.println("Lowest: " + names[minIdx]);
        System.out.println("Lowest Score: " + marks[minIdx]);
        System.out.println("Lowest Index: " + minIdx);
        System.out.printf(Locale.US, "Average: %.2f\\n", avg);
        
        System.out.print("Above Average:");
        for (int i = 0; i < n; i++) {
            if (marks[i] > avg) {
                System.out.print(" " + names[i]);
            }
        }
        System.out.println();
        
        System.out.print("Reverse Names:");
        for (int i = n - 1; i >= 0; i--) {
            StringBuilder sb = new StringBuilder(names[i]);
            System.out.print(" " + sb.toString());
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "5\nAman 80\nRiya 60\nKaran 90\nSimran 70\nRaj 50",
            expectedOutput: `Highest: Karan\nHighest Score: 90\nHighest Index: 2\nLowest: Raj\nLowest Score: 50\nLowest Index: 4\nAverage: 70.00\nAbove Average: Aman Karan\nReverse Names: Raj Simran Karan Riya Aman`,
            isHidden: false,
            explanation: "Sample with 5 employees"
          },
          {
            id: 2,
            input: "3\nAlice 95\nBob 95\nCharlie 40",
            expectedOutput: `Highest: Alice\nHighest Score: 95\nHighest Index: 0\nLowest: Charlie\nLowest Score: 40\nLowest Index: 2\nAverage: 76.67\nAbove Average: Alice Bob\nReverse Names: Charlie Bob Alice`,
            isHidden: false,
            explanation: "Tie breaker test on highest score"
          },
          {
            id: 3,
            input: "2\nJohn 100\nDoe 50",
            expectedOutput: `Highest: John\nHighest Score: 100\nHighest Index: 0\nLowest: Doe\nLowest Score: 50\nLowest Index: 1\nAverage: 75.00\nAbove Average: John\nReverse Names: Doe John`,
            isHidden: true,
            explanation: "Two employees"
          },
          {
            id: 4,
            input: "4\nAlex 60\nBen 60\nChris 60\nDan 60",
            expectedOutput: `Highest: Alex\nHighest Score: 60\nHighest Index: 0\nLowest: Alex\nLowest Score: 60\nLowest Index: 0\nAverage: 60.00\nAbove Average:\nReverse Names: Dan Chris Ben Alex`,
            isHidden: true,
            explanation: "All employees have the exact same score"
          }
        ]
      }
    ]
  }
];

// LocalStorage helpers
export const getPracticePapers = () => {
  const saved = localStorage.getItem('practice_papers_data');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse stored practice papers", e);
    }
  }
  return practiceTestPapers;
};

export const savePracticePapers = (papers) => {
  localStorage.setItem('practice_papers_data', JSON.stringify(papers));
};

// User test progress helpers: tracks score, code, pass status per question
export const getUserProgress = () => {
  const saved = localStorage.getItem('user_exam_progress');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse user progress", e);
    }
  }
  return {};
};

export const saveQuestionProgress = (questionId, { userCode, marksEarned, totalMarks, passedCount, totalCount, status }) => {
  const progress = getUserProgress();
  progress[questionId] = {
    userCode,
    marksEarned,
    totalMarks,
    passedCount,
    totalCount,
    status, // 'passed' | 'partial' | 'failed'
    timestamp: Date.now()
  };
  localStorage.setItem('user_exam_progress', JSON.stringify(progress));
};

export const resetAllProgress = () => {
  localStorage.removeItem('user_exam_progress');
};
