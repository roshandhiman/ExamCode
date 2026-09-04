export const practiceTestPapers = [
  {
    id: "sample-paper-1",
    day: "Day 1",
    title: "Sample Test Paper 1",
    subtitle: "10 MCQs + 3 Coding Problems (Exam Special Prep)",
    totalMarks: 30,
    passingMarks: 12,
    examDate: "Exam: Special Prep",
    instructions: [
      "This test contains 10 Multiple Choice Questions (1 Mark each) and 3 Coding Problems (5, 5, and 10 Marks).",
      "For MCQs, select your choice to check and save your answer immediately.",
      "For Coding questions, complete the method body. All test cases are 100% visible and evaluated automatically."
    ],
    questions: [
      {
        id: 501,
        paperId: "sample-paper-1",
        number: "Q1",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "HashSet",
        difficulty: "Easy",
        marks: 1,
        tagline: "Select the correct option for HashSet case sensitivity.",
        concept: "HashSet.contains() string case sensitivity",
        statement: "What is the value of the result variable?",
        codeSnippet: `Set<String> cities = new HashSet<>();\ncities.add("London");\ncities.add("Paris");\ncities.add("New York");\nboolean result = cities.contains("london");`,
        options: ["true", "false", "Apple", "none of the above"],
        correctAnswer: "false"
      },
      {
        id: 502,
        paperId: "sample-paper-1",
        number: "Q2",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Wrapper Classes",
        difficulty: "Easy",
        marks: 1,
        tagline: "Select the primary purpose of Wrapper classes in Java.",
        concept: "Primitive encapsulation into objects",
        statement: "What is the main use of wrapper classes in Java?",
        options: ["Converting primitives to objects", "Making all methods static", "Defining custom data types", "None of the above"],
        correctAnswer: "Converting primitives to objects"
      },
      {
        id: 503,
        paperId: "sample-paper-1",
        number: "Q3",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Exceptions",
        difficulty: "Easy",
        marks: 1,
        tagline: "Select the keyword used to throw an exception explicitly.",
        concept: "throw vs throws keyword",
        statement: "Which keyword is used to explicitly throw an exception in Java?",
        options: ["throw", "exception", "catch", "throws"],
        correctAnswer: "throw"
      },
      {
        id: 504,
        paperId: "sample-paper-1",
        number: "Q4",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Operators",
        difficulty: "Easy",
        marks: 1,
        tagline: "Calculate the modulus output.",
        concept: "Remainder operator %",
        statement: "What will be the output of System.out.println(10 % 3);",
        codeSnippet: "System.out.println(10 % 3);",
        options: ["3", "1", "8", "10"],
        correctAnswer: "1"
      },
      {
        id: 505,
        paperId: "sample-paper-1",
        number: "Q5",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Exceptions",
        difficulty: "Easy",
        marks: 1,
        tagline: "Select the keyword used to declare & propagate exceptions.",
        concept: "Method signature exception declaration",
        statement: "Which of the following keywords is used by a calling function to declare and propagate an exception thrown by a called function instead of handling it?",
        options: ["try", "throw", "throws", "catch"],
        correctAnswer: "throws"
      },
      {
        id: 506,
        paperId: "sample-paper-1",
        number: "Q6",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "ArrayList",
        difficulty: "Easy",
        marks: 1,
        tagline: "ArrayList default initial capacity in Java.",
        concept: "Default collection sizing",
        statement: "What is the initial default capacity of an ArrayList in Java?",
        options: ["10", "16", "0", "12"],
        correctAnswer: "10"
      },
      {
        id: 507,
        paperId: "sample-paper-1",
        number: "Q7",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Collections",
        difficulty: "Easy",
        marks: 1,
        tagline: "Interface preventing duplicates.",
        concept: "Set uniqueness guarantee",
        statement: "Which interface in Java does not allow duplicate elements?",
        options: ["Set", "List", "Queue", "Map"],
        correctAnswer: "Set"
      },
      {
        id: 508,
        paperId: "sample-paper-1",
        number: "Q8",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Collections",
        difficulty: "Easy",
        marks: 1,
        tagline: "Thread safe dynamic array collection.",
        concept: "Vector synchronization",
        statement: "Which class in Java provides thread-safe operations on dynamic arrays?",
        options: ["Vector", "ArrayList", "LinkedList", "ArrayDeque"],
        correctAnswer: "Vector"
      },
      {
        id: 509,
        paperId: "sample-paper-1",
        number: "Q9",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Exceptions",
        difficulty: "Easy",
        marks: 1,
        tagline: "Invalid array index access exception.",
        concept: "Array bounds check exception",
        statement: "What exception is thrown when an array is accessed with an invalid index?",
        options: ["ArrayIndexOutOfBoundsException", "IndexOutOfBoundsException", "NullPointerException", "IllegalArgumentException"],
        correctAnswer: "ArrayIndexOutOfBoundsException"
      },
      {
        id: 510,
        paperId: "sample-paper-1",
        number: "Q10",
        type: "mcq",
        title: "MCQ 1 Marks",
        category: "Java Core",
        difficulty: "Easy",
        marks: 1,
        tagline: "Auto-imported package in Java.",
        concept: "java.lang automatic package import",
        statement: "Which package is automatically imported into every Java program?",
        options: ["java.lang", "java.util", "java.io", "java.net"],
        correctAnswer: "java.lang"
      },
      {
        id: 511,
        paperId: "sample-paper-1",
        number: "Q11",
        type: "coding",
        title: "Exam Topper",
        category: "Arrays & Logic",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf maxMarks(int[] marks, int N) ke andar code likhna.",
        concept: "Finding maximum element in array with negative numbers",
        statement: `The education board of India has conducted an all-India talent examination. Finally, the results are out, and the education board needs your help to find the maximum marks that are scored by any student.

Given an array of size N, denoting the marks of those students who appeared for the exam. Your task is to find the maximum marks out of it.

Assume that there were negative marking in the examination, i.e. for each wrong answer the students have got a -1 penalty. That means there is a possibility that some students may have scored negative marks as well.`,
        sampleInput: `7\n20 30 93 71 18 82 66`,
        sampleOutput: `93`,
        constraints: `1 <= N <= 10^5\n-1000 <= marks[i] <= 1000`,
        methodSignature: "static int maxMarks(int[] marks, int N)",
        prefixCode: `import java.util.*;

public class Main {
    static int maxMarks(int[] marks, int N) {
        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        TreeSet<Integer> a = new TreeSet<>();
        for (Integer num : marks) {
            a.add(num);
        }
        return a.last();`,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        int[] marks = new int[N];
        for (int i = 0; i < N; i++) {
            marks[i] = sc.nextInt();
        }
        System.out.println(maxMarks(marks, N));
    }
}`,
        referenceSolution: `        int max = marks[0];
        for (int i = 1; i < N; i++) {
            if (marks[i] > max) max = marks[i];
        }
        return max;`,
        testcases: [
          {
            id: 1,
            input: "7\n20 30 93 71 18 82 66",
            expectedOutput: "93",
            isHidden: false,
            explanation: "Sample input from examination board"
          },
          {
            id: 2,
            input: "5\n-10 -5 -20 -1 -50",
            expectedOutput: "-1",
            isHidden: false,
            explanation: "All negative marks scenario"
          },
          {
            id: 3,
            input: "1\n500",
            expectedOutput: "500",
            isHidden: false,
            explanation: "Single student"
          },
          {
            id: 4,
            input: "6\n0 0 0 0 0 0",
            expectedOutput: "0",
            isHidden: false,
            explanation: "All zero marks"
          },
          {
            id: 5,
            input: "8\n-100 200 -50 400 150 -300 400 99",
            expectedOutput: "400",
            isHidden: false,
            explanation: "Duplicate max values"
          },
          {
            id: 6,
            input: "4\n1000 -1000 999 -999",
            expectedOutput: "1000",
            isHidden: false,
            explanation: "Constraint boundary values"
          }
        ]
      },
      {
        id: 512,
        paperId: "sample-paper-1",
        number: "Q12",
        type: "coding",
        title: "MyCalculator Exception",
        category: "Exception Handling",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf power(int n, int p) ke andar try-catch + MyException handling code likhna.",
        concept: "Custom Exception throwing and catching with error codes",
        statement: `A scientific calculator allows users to calculate the value of n^p (n raised to the power p). Before performing the calculation, the calculator validates the input values.

If the inputs violate any of the validation rules, the program should throw a user-defined exception, handle it inside the calculation function, and print the appropriate error code.

The calculator processes multiple power calculations independently. A custom exception class MyException is already provided.

Task:
Implement the method static void power(int n, int p) inside the Main class. The method must enforce the following validation rules in order:

Rule 1 (Negative Inputs): If either n or p is negative, throw a MyException with the error code -1.
Rule 2 (Zero Inputs): If both n and p are zero, throw a MyException with the error code -2.

Calculation: If both inputs are valid, calculate the value of n^p (n raised to the power p)

The entire logic (validation, throwing, and catching) must be handled inside the power method using a try-catch block.`,
        sampleInput: `5\n2 3\n-3 2\n0 0\n5 0\n0 5`,
        sampleOutput: `8\n-1\n-2\n1\n0`,
        constraints: `-100 <= n, p <= 100`,
        methodSignature: "static void power(int n, int p)",
        prefixCode: `import java.util.*;

class MyException extends Exception {
    int errorCode;
    MyException(int errorCode) {
        this.errorCode = errorCode;
    }
}

public class Main {
    static void power(int n, int p) {
        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        try {
            if (n < 0 || p < 0) {
                throw new MyException(-1);
            }
            if (n == 0 && p == 0) {
                throw new MyException(-2);
            }
            double res = Math.pow(n, p);
            System.out.println((int)res);
        } catch (MyException e) {
            System.out.println(e.errorCode);
        }`,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            int p = sc.nextInt();
            power(n, p);
        }
    }
}`,
        referenceSolution: `        try {
            if (n < 0 || p < 0) {
                throw new MyException(-1);
            }
            if (n == 0 && p == 0) {
                throw new MyException(-2);
            }
            double res = Math.pow(n, p);
            System.out.println((int)res);
        } catch (MyException e) {
            System.out.println(e.errorCode);
        }`,
        testcases: [
          {
            id: 1,
            input: "5\n2 3\n-3 2\n0 0\n5 0\n0 5",
            expectedOutput: "8\n-1\n-2\n1\n0",
            isHidden: false,
            explanation: "Sample input tests negative, zero zero, and normal exponentiation"
          },
          {
            id: 2,
            input: "3\n3 4\n-1 -1\n2 10",
            expectedOutput: "81\n-1\n1024",
            isHidden: false,
            explanation: "Powers 3^4, negative exponents, 2^10"
          },
          {
            id: 3,
            input: "2\n0 0\n-5 0",
            expectedOutput: "-2\n-1",
            isHidden: false,
            explanation: "Zero zero rule and negative base rule"
          },
          {
            id: 4,
            input: "4\n10 2\n2 0\n0 2\n-2 -2",
            expectedOutput: "100\n1\n0\n-1",
            isHidden: false,
            explanation: "Base 10, zero exponent, zero base, both negative"
          },
          {
            id: 5,
            input: "3\n1 10\n0 0\n-10 5",
            expectedOutput: "1\n-2\n-1",
            isHidden: false,
            explanation: "1 raised to power, 0^0, negative base"
          },
          {
            id: 6,
            input: "2\n5 3\n3 5",
            expectedOutput: "125\n243",
            isHidden: false,
            explanation: "5^3 and 3^5"
          }
        ]
      },
      {
        id: 513,
        paperId: "sample-paper-1",
        number: "Q13",
        type: "coding",
        title: "Web Browser Tab History Analyzer",
        category: "LinkedList & Sets",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf findFrequentSites(LinkedList<Integer> history) ke andar code likhna.",
        concept: "LinkedList frequency filtering & preserving original insertion order",
        statement: `A modern web browser keeps track of the websites visited by a user during a browsing session. The browser stores the visited website IDs in a LinkedList, where each ID represents a website.

For performance analysis, the browser needs to identify the user's browsing session pattern.

A website is considered frequently visited if its ID appears more than once in the browsing history.

Your task is to analyze the browsing history and create a new LinkedList containing the website IDs that were visited multiple times.

Each website ID should appear only once in the result, and the order should be based on the first occurrence in the browsing history.

Rules:
1. A website is considered frequent if it appears more than once.
2. Add each frequent website ID to the result only once.
3. Preserve the order of its first appearance.
4. Do not modify the original history list.
5. If no website was visited more than once, return an empty LinkedList.`,
        sampleInput: `10\n101 205 310 101 450 205 101 520 310 600`,
        sampleOutput: `101 205 310`,
        constraints: `1 <= history.size() <= 10^5\n1 <= website ID <= 10^9`,
        methodSignature: "public static LinkedList<Integer> findFrequentSites(LinkedList<Integer> history)",
        prefixCode: `import java.util.*;

public class Main {
    public static LinkedList<Integer> findFrequentSites(LinkedList<Integer> history) {
        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        TreeSet<Integer> a = new TreeSet<>();
        TreeSet<Integer> b = new TreeSet<>();
        for (Integer num : history) {
            if (!a.add(num)) {
                b.add(num);
            }
        }
        LinkedList<Integer> c = new LinkedList<>();
        for (Integer val : history) {
            if (b.contains(val) && !c.contains(val)) {
                c.add(val);
            }
        }
        return c;`,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int N = sc.nextInt();
        LinkedList<Integer> history = new LinkedList<>();
        for (int i = 0; i < N; i++) {
            history.add(sc.nextInt());
        }
        LinkedList<Integer> result = findFrequentSites(history);
        if (result.isEmpty()) {
            System.out.println("EMPTY");
        } else {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < result.size(); i++) {
                sb.append(result.get(i));
                if (i < result.size() - 1) sb.append(" ");
            }
            System.out.println(sb.toString());
        }
    }
}`,
        referenceSolution: `        Set<Integer> seen = new HashSet<>();
        Set<Integer> duplicates = new HashSet<>();
        for (Integer num : history) {
            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }
        LinkedList<Integer> result = new LinkedList<>();
        for (Integer val : history) {
            if (duplicates.contains(val) && !result.contains(val)) {
                result.add(val);
            }
        }
        return result;`,
        testcases: [
          {
            id: 1,
            input: "10\n101 205 310 101 450 205 101 520 310 600",
            expectedOutput: "101 205 310",
            isHidden: false,
            explanation: "Sample input with frequent sites 101, 205, 310"
          },
          {
            id: 2,
            input: "5\n1 2 3 4 5",
            expectedOutput: "EMPTY",
            isHidden: false,
            explanation: "No duplicates found"
          },
          {
            id: 3,
            input: "6\n50 50 50 50 50 50",
            expectedOutput: "50",
            isHidden: false,
            explanation: "Single site repeated multiple times"
          },
          {
            id: 4,
            input: "8\n10 20 30 20 10 40 50 30",
            expectedOutput: "10 20 30",
            isHidden: false,
            explanation: "Multiple duplicates out of order"
          },
          {
            id: 5,
            input: "4\n99 99 88 88",
            expectedOutput: "99 88",
            isHidden: false,
            explanation: "Adjacent duplicate pairs"
          },
          {
            id: 6,
            input: "7\n5 1 2 3 1 4 5",
            expectedOutput: "5 1",
            isHidden: false,
            explanation: "Duplicates preserve first appearance order"
          }
        ]
      }
    ]
  },
  {
    id: "paper-1",
    day: "Day 2",
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
  },
  {
    id: "paper-2",
    day: "Day 2",
    title: "Practice Test Paper 2",
    subtitle: "New Logic & Harder Building Blocks (No Repeats • Lectures 1–30)",
    totalMarks: 120,
    passingMarks: 48,
    examDate: "Exam: 12th Sept",
    instructions: [
      "15 NEW non-repeating logic challenges: Prefix sums, Frequency maps, Range deletions, Abstract classes, Exception handling & Full Parsers.",
      "Method headers, Scanner parsing, and Main wrapper classes are LOCKED. Write logic inside the designated method body.",
      "Q1 to Q6 carry 5 Marks each; Q7 to Q15 carry 10 Marks each (Total: 120 Marks).",
      "Run Code tests sample cases. Submit judges all public and hidden edge test cases."
    ],
    questions: [
      {
        id: 101,
        paperId: "paper-2",
        number: "Q1",
        title: "Q1 — First Non-Repeating Character",
        category: "Strings",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf process(String s) ke andar code likhna.",
        concept: "Character frequency map + string traversal",
        statement: `Given a string \`s\`, find and print the **first character** that occurs exactly once in the string.

Case-sensitive inspection.

If a unique character exists:
\`\`\`
First Non-Repeating: <char>
\`\`\`

If no character is unique:
\`\`\`
No Unique Character
\`\`\``,
        sampleInput: `swiss`,
        sampleOutput: `First Non-Repeating: w`,
        constraints: `1 <= s.length() <= 10^5`,
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
        referenceSolution: `        Map<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);
        char ans = ' ';
        boolean found = false;
        for (char c : s.toCharArray()) {
            if (map.get(c) == 1) {
                ans = c;
                found = true;
                break;
            }
        }
        if (found) System.out.println("First Non-Repeating: " + ans);
        else System.out.println("No Unique Character");`,
        testcases: [
          {
            id: 1,
            input: "swiss",
            expectedOutput: "First Non-Repeating: w",
            isHidden: false,
            explanation: "'s' appears 3 times, 'w' appears 1 time (first unique)"
          },
          {
            id: 2,
            input: "aabbcc",
            expectedOutput: "No Unique Character",
            isHidden: false,
            explanation: "All characters appear twice"
          },
          {
            id: 3,
            input: "leetcode",
            expectedOutput: "First Non-Repeating: l",
            isHidden: true,
            explanation: "First character is unique"
          },
          {
            id: 4,
            input: "z",
            expectedOutput: "First Non-Repeating: z",
            isHidden: true,
            explanation: "Single character input"
          }
        ]
      },
      {
        id: 102,
        paperId: "paper-2",
        number: "Q2",
        title: "Q2 — Remove Consecutive Duplicate Characters",
        category: "Strings",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf process(String s) ke andar code likhna.",
        concept: "Adjacent character filtering, StringBuilder",
        statement: `Remove repeated consecutive characters from the string \`s\`, keeping only one instance of each consecutive run.

⚠️ **Note**: This is NOT character compression. Do NOT output numbers.

Example:
\`aaabbccdaa\` → \`abcda\`

Output format:
\`\`\`
<result_string>
\`\`\``,
        sampleInput: `aaabbccdaa`,
        sampleOutput: `abcda`,
        constraints: `1 <= s.length() <= 10^5`,
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
        referenceSolution: `        if (s == null || s.length() == 0) return;
        StringBuilder sb = new StringBuilder();
        sb.append(s.charAt(0));
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) != s.charAt(i - 1)) {
                sb.append(s.charAt(i));
            }
        }
        System.out.println(sb.toString());`,
        testcases: [
          {
            id: 1,
            input: "aaabbccdaa",
            expectedOutput: "abcda",
            isHidden: false,
            explanation: "Runs of a, b, c, d, a reduced to 1 each"
          },
          {
            id: 2,
            input: "hello",
            expectedOutput: "helo",
            isHidden: false,
            explanation: "ll reduced to single l"
          },
          {
            id: 3,
            input: "aaaaa",
            expectedOutput: "a",
            isHidden: true,
            explanation: "All identical characters"
          },
          {
            id: 4,
            input: "abcdef",
            expectedOutput: "abcdef",
            isHidden: true,
            explanation: "No consecutive duplicates"
          }
        ]
      },
      {
        id: 103,
        paperId: "paper-2",
        number: "Q3",
        title: "Q3 — Equilibrium Index",
        category: "Arrays",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(int[] a) ke andar code likhna.",
        concept: "Prefix sum logic, linear scan optimization",
        statement: `An index \`i\` is an equilibrium index if:
\`\`\`
sum of elements before i = sum of elements after i
\`\`\`
Find and print the **first** 0-based equilibrium index in array \`a\`.

If an equilibrium index exists:
\`\`\`
Equilibrium Index: <idx>
\`\`\`

If no equilibrium index exists:
\`\`\`
No Equilibrium Index
\`\`\``,
        sampleInput: `7
-7 1 5 2 -4 3 0`,
        sampleOutput: `Equilibrium Index: 3`,
        constraints: `1 <= a.length <= 10^5
-10^6 <= a[i] <= 10^6`,
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
        referenceSolution: `        long totalSum = 0;
        for (int x : a) totalSum += x;
        long leftSum = 0;
        int eqIdx = -1;
        for (int i = 0; i < a.length; i++) {
            long rightSum = totalSum - leftSum - a[i];
            if (leftSum == rightSum) {
                eqIdx = i;
                break;
            }
            leftSum += a[i];
        }
        if (eqIdx != -1) System.out.println("Equilibrium Index: " + eqIdx);
        else System.out.println("No Equilibrium Index");`,
        testcases: [
          {
            id: 1,
            input: "7\n-7 1 5 2 -4 3 0",
            expectedOutput: "Equilibrium Index: 3",
            isHidden: false,
            explanation: "At index 3 (val=2), left sum = -7+1+5=1, right sum = -4+3+0=1"
          },
          {
            id: 2,
            input: "3\n1 2 3",
            expectedOutput: "No Equilibrium Index",
            isHidden: false,
            explanation: "No equilibrium index exists"
          },
          {
            id: 3,
            input: "3\n1 2 1",
            expectedOutput: "Equilibrium Index: 1",
            isHidden: true,
            explanation: "Index 1 left sum=1, right sum=1"
          },
          {
            id: 4,
            input: "1\n100",
            expectedOutput: "Equilibrium Index: 0",
            isHidden: true,
            explanation: "Single element array index 0 left=0, right=0"
          }
        ]
      },
      {
        id: 104,
        paperId: "paper-2",
        number: "Q4",
        title: "Q4 — Move All Zeros to End",
        category: "Arrays",
        difficulty: "Easy",
        marks: 5,
        tagline: "Tera kaam: Sirf process(int[] a) ke andar code likhna.",
        concept: "Two-pointer write index, in-place reordering",
        statement: `Given an integer array \`a\`, move all \`0\` elements to the end of the array while **maintaining the relative order** of all non-zero elements.

⚠️ Do NOT sort the array!

Output format:
\`\`\`
<val1> <val2> ...
\`\`\``,
        sampleInput: `8
0 5 0 3 12 0 7 0`,
        sampleOutput: `5 3 12 7 0 0 0 0`,
        constraints: `1 <= a.length <= 10^5`,
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
        referenceSolution: `        int idx = 0;
        for (int x : a) {
            if (x != 0) a[idx++] = x;
        }
        while (idx < a.length) a[idx++] = 0;
        for (int i = 0; i < a.length; i++) {
            System.out.print(a[i] + (i == a.length - 1 ? "" : " "));
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "8\n0 5 0 3 12 0 7 0",
            expectedOutput: "5 3 12 7 0 0 0 0",
            isHidden: false,
            explanation: "Zeros moved to end preserving order 5 3 12 7"
          },
          {
            id: 2,
            input: "4\n1 2 3 4",
            expectedOutput: "1 2 3 4",
            isHidden: false,
            explanation: "No zeros in array"
          },
          {
            id: 3,
            input: "3\n0 0 0",
            expectedOutput: "0 0 0",
            isHidden: true,
            explanation: "All elements are zero"
          },
          {
            id: 4,
            input: "5\n10 0 0 20 0",
            expectedOutput: "10 20 0 0 0",
            isHidden: true,
            explanation: "Zeros in middle and end"
          }
        ]
      },
      {
        id: 105,
        paperId: "paper-2",
        number: "Q5",
        title: "Q5 — Longest Word With Vowels",
        category: "Strings",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(String s) ke andar code likhna.",
        concept: "split() + loop + condition + String methods",
        statement: `Given a sentence \`s\`, find the **longest word** that contains at least one vowel (\`a, e, i, o, u\`, case-insensitive).

⚠️ **Tie-breaker**: If multiple words share the maximum length, choose the **first** one that appears.

If a word containing a vowel exists:
\`\`\`
Longest: <word>
\`\`\`

If no word contains any vowel:
\`\`\`
No Such Word
\`\`\``,
        sampleInput: `Java is an amazing programming language`,
        sampleOutput: `Longest: programming`,
        constraints: `1 <= words <= 1000`,
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
        referenceSolution: `        String[] words = s.split("\\\\s+");
        String longest = null;
        for (String w : words) {
            String lower = w.toLowerCase();
            boolean hasVowel = false;
            for (int i = 0; i < lower.length(); i++) {
                char c = lower.charAt(i);
                if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
                    hasVowel = true;
                    break;
                }
            }
            if (hasVowel) {
                if (longest == null || w.length() > longest.length()) {
                    longest = w;
                }
            }
        }
        if (longest != null) System.out.println("Longest: " + longest);
        else System.out.println("No Such Word");`,
        testcases: [
          {
            id: 1,
            input: "Java is an amazing programming language",
            expectedOutput: "Longest: programming",
            isHidden: false,
            explanation: "'programming' has length 11 with vowels"
          },
          {
            id: 2,
            input: "fly dry rhythm",
            expectedOutput: "No Such Word",
            isHidden: false,
            explanation: "No words contain a e i o u"
          },
          {
            id: 3,
            input: "cat and dog",
            expectedOutput: "Longest: cat",
            isHidden: true,
            explanation: "All have length 3 with vowels, first is cat"
          },
          {
            id: 4,
            input: "my sky blue sky",
            expectedOutput: "Longest: blue",
            isHidden: true,
            explanation: "Only 'blue' contains a vowel"
          }
        ]
      },
      {
        id: 106,
        paperId: "paper-2",
        number: "Q6",
        title: "Q6 — Insert After Every Even Number",
        category: "Collections",
        difficulty: "Medium",
        marks: 5,
        tagline: "Tera kaam: Sirf process(ArrayList<Integer> list) ke andar code likhna.",
        concept: "Modifying ArrayList while traversing (index pointer adjustment)",
        statement: `Given an \`ArrayList<Integer>\`, iterate through the list and after **every even number**, insert its **double value** (\`val * 2\`).

⚠️ **Warning**: List size grows dynamically during iteration. Adjust loop index properly so you don't repeatedly double the newly inserted number!

Output format:
\`\`\`
<val1> <val2> ...
\`\`\``,
        sampleInput: `5
3 4 7 6 9`,
        sampleOutput: `3 4 8 7 6 12 9`,
        constraints: `1 <= list.size() <= 10^5`,
        methodSignature: "static void process(ArrayList<Integer> list)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(ArrayList<Integer> list) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }

        process(list);
    }
}`,
        referenceSolution: `        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) % 2 == 0) {
                list.add(i + 1, list.get(i) * 2);
                i++;
            }
        }
        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i) + (i == list.size() - 1 ? "" : " "));
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "5\n3 4 7 6 9",
            expectedOutput: "3 4 8 7 6 12 9",
            isHidden: false,
            explanation: "4 followed by 8, 6 followed by 12"
          },
          {
            id: 2,
            input: "3\n1 3 5",
            expectedOutput: "1 3 5",
            isHidden: false,
            explanation: "No even numbers"
          },
          {
            id: 3,
            input: "2\n2 4",
            expectedOutput: "2 4 4 8",
            isHidden: true,
            explanation: "All even numbers"
          },
          {
            id: 4,
            input: "1\n0",
            expectedOutput: "0 0",
            isHidden: true,
            explanation: "0 is even, doubled is 0"
          }
        ]
      },
      {
        id: 107,
        paperId: "paper-2",
        number: "Q7",
        title: "Q7 — Remove Elements Between Two Values",
        category: "Collections",
        difficulty: "Medium",
        marks: 10,
        tagline: "Tera kaam: Sirf process(LinkedList<Integer> list, int x, int y) ke andar code likhna.",
        concept: "LinkedList removal condition with range filtering (min < val < max)",
        statement: `Given a \`LinkedList<Integer>\` and two boundary values \`x\` and \`y\`, remove all elements strictly **between** \`x\` and \`y\`.

That is, remove elements where:
\`\`\`
min(x, y) < element < max(x, y)
\`\`\`

Print the remaining elements of the list separated by spaces.

Output format:
\`\`\`
<val1> <val2> ...
\`\`\``,
        sampleInput: `8
10 20 30 40 50 60 70 80
25 65`,
        sampleOutput: `10 20 70 80`,
        constraints: `1 <= list.size() <= 10^5`,
        methodSignature: "static void process(LinkedList<Integer> list, int x, int y)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(LinkedList<Integer> list, int x, int y) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        LinkedList<Integer> list = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int x = sc.nextInt();
        int y = sc.nextInt();

        process(list, x, y);
    }
}`,
        referenceSolution: `        int min = Math.min(x, y);
        int max = Math.max(x, y);
        list.removeIf(val -> val > min && val < max);
        for (int i = 0; i < list.size(); i++) {
            System.out.print(list.get(i) + (i == list.size() - 1 ? "" : " "));
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "8\n10 20 30 40 50 60 70 80\n25 65",
            expectedOutput: "10 20 70 80",
            isHidden: false,
            explanation: "Elements between 25 and 65 (30,40,50,60) removed"
          },
          {
            id: 2,
            input: "4\n10 20 30 40\n65 25",
            expectedOutput: "10 20 40",
            isHidden: false,
            explanation: "x and y order swapped: min=25, max=65"
          },
          {
            id: 3,
            input: "3\n5 10 15\n100 200",
            expectedOutput: "5 10 15",
            isHidden: true,
            explanation: "No elements fall between 100 and 200"
          },
          {
            id: 4,
            input: "5\n1 2 3 4 5\n0 6",
            expectedOutput: "",
            isHidden: true,
            explanation: "All elements fall between 0 and 6"
          }
        ]
      },
      {
        id: 108,
        paperId: "paper-2",
        number: "Q8",
        title: "Q8 — Elements Appearing in Exactly One Array",
        category: "Set & Map",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf process(int[] a, int[] b) ke andar code likhna.",
        concept: "Symmetric set difference (A \\ B) ∪ (B \\ A) using HashSet & TreeSet",
        statement: `Given two integer arrays \`a\` and \`b\`, print all unique elements that appear in **only one** of the arrays, but **not in both**.

Print each qualifying element **only once** in **sorted ascending order**.

Output format:
\`\`\`
<val1> <val2> ...
\`\`\``,
        sampleInput: `5
10 20 30 40 50
5
30 40 60 70 80`,
        sampleOutput: `10 20 50 60 70 80`,
        constraints: `1 <= a.length, b.length <= 10^5`,
        methodSignature: "static void process(int[] a, int[] b)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(int[] a, int[] b) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();

        int m = sc.nextInt();
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = sc.nextInt();

        process(a, b);
    }
}`,
        referenceSolution: `        Set<Integer> setA = new HashSet<>();
        Set<Integer> setB = new HashSet<>();
        for (int x : a) setA.add(x);
        for (int x : b) setB.add(x);

        Set<Integer> diff = new TreeSet<>();
        for (int x : setA) if (!setB.contains(x)) diff.add(x);
        for (int x : setB) if (!setA.contains(x)) diff.add(x);

        int i = 0;
        for (int val : diff) {
            System.out.print(val + (i == diff.size() - 1 ? "" : " "));
            i++;
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "5\n10 20 30 40 50\n5\n30 40 60 70 80",
            expectedOutput: "10 20 50 60 70 80",
            isHidden: false,
            explanation: "30 and 40 appear in both, excluded"
          },
          {
            id: 2,
            input: "3\n1 2 3\n3\n1 2 3",
            expectedOutput: "",
            isHidden: false,
            explanation: "Identical arrays, symmetric difference empty"
          },
          {
            id: 3,
            input: "2\n5 10\n2\n15 20",
            expectedOutput: "5 10 15 20",
            isHidden: true,
            explanation: "Completely disjoint arrays"
          },
          {
            id: 4,
            input: "4\n1 1 2 2\n3\n2 3 4",
            expectedOutput: "1 3 4",
            isHidden: true,
            explanation: "Duplicates handled cleanly"
          }
        ]
      },
      {
        id: 109,
        paperId: "paper-2",
        number: "Q9",
        title: "Q9 — Closest Value to X",
        category: "Set & Map",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf process(int[] a, int x) ke andar code likhna.",
        concept: "TreeSet floor() and ceiling() navigation",
        statement: `Store unique numbers from array \`a\` in a \`TreeSet<Integer>\`.
Given a target integer \`x\`, find the value in the set that is **closest to x**.

⚠️ **Tie-breaker**: If two values have equal absolute distance to \`x\`, choose the **smaller** value.

Output format:
\`\`\`
Closest: <val>
\`\`\``,
        sampleInput: `7
10 20 30 40 50 60 70
36`,
        sampleOutput: `Closest: 40`,
        constraints: `1 <= a.length <= 10^5`,
        methodSignature: "static void process(int[] a, int x)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(int[] a, int x) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();

        int x = sc.nextInt();

        process(a, x);
    }
}`,
        referenceSolution: `        TreeSet<Integer> set = new TreeSet<>();
        for (int num : a) set.add(num);
        Integer f = set.floor(x);
        Integer c = set.ceiling(x);
        if (f == null) System.out.println("Closest: " + c);
        else if (c == null) System.out.println("Closest: " + f);
        else {
            int distF = Math.abs(x - f);
            int distC = Math.abs(c - x);
            if (distF <= distC) System.out.println("Closest: " + f);
            else System.out.println("Closest: " + c);
        }`,
        testcases: [
          {
            id: 1,
            input: "7\n10 20 30 40 50 60 70\n36",
            expectedOutput: "Closest: 40",
            isHidden: false,
            explanation: "30 is dist 6, 40 is dist 4 -> 40 is closer"
          },
          {
            id: 2,
            input: "7\n10 20 30 40 50 60 70\n35",
            expectedOutput: "Closest: 30",
            isHidden: false,
            explanation: "30 and 40 are dist 5 -> tie breaker chooses smaller value 30"
          },
          {
            id: 3,
            input: "3\n100 200 300\n50",
            expectedOutput: "Closest: 100",
            isHidden: true,
            explanation: "Target smaller than all elements (floor is null)"
          },
          {
            id: 4,
            input: "3\n100 200 300\n500",
            expectedOutput: "Closest: 300",
            isHidden: true,
            explanation: "Target larger than all elements (ceiling is null)"
          }
        ]
      },
      {
        id: 110,
        paperId: "paper-2",
        number: "Q10",
        title: "Q10 — Character With Maximum Frequency",
        category: "Set & Map",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf process(String s) ke andar code likhna.",
        concept: "HashMap / LinkedHashMap frequency accumulation + tie breaker",
        statement: `Using \`HashMap<Character, Integer>\` (or \`LinkedHashMap\`), find the character that appears with the **maximum frequency** in string \`s\`.

⚠️ **Tie-breaker**: If multiple characters have the exact same maximum frequency, select the one that appears **first** in the string.

Output format:
\`\`\`
Most Frequent: <char>
Frequency: <count>
\`\`\``,
        sampleInput: `banana`,
        sampleOutput: `Most Frequent: a
Frequency: 3`,
        constraints: `1 <= s.length() <= 10^5`,
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
        referenceSolution: `        Map<Character, Integer> map = new LinkedHashMap<>();
        for (char c : s.toCharArray()) {
            map.put(c, map.getOrDefault(c, 0) + 1);
        }
        char maxChar = s.charAt(0);
        int maxFreq = 0;
        for (Map.Entry<Character, Integer> entry : map.entrySet()) {
            if (entry.getValue() > maxFreq) {
                maxFreq = entry.getValue();
                maxChar = entry.getKey();
            }
        }
        System.out.println("Most Frequent: " + maxChar);
        System.out.println("Frequency: " + maxFreq);`,
        testcases: [
          {
            id: 1,
            input: "banana",
            expectedOutput: "Most Frequent: a\nFrequency: 3",
            isHidden: false,
            explanation: "'a' appears 3 times"
          },
          {
            id: 2,
            input: "aabbcc",
            expectedOutput: "Most Frequent: a\nFrequency: 2",
            isHidden: false,
            explanation: "a, b, c all freq 2, first is 'a'"
          },
          {
            id: 3,
            input: "z",
            expectedOutput: "Most Frequent: z\nFrequency: 1",
            isHidden: true,
            explanation: "Single character"
          },
          {
            id: 4,
            input: "mississippi",
            expectedOutput: "Most Frequent: i\nFrequency: 4",
            isHidden: true,
            explanation: "'i' appears 4 times, 's' appears 4 times, 'i' appears first"
          }
        ]
      },
      {
        id: 111,
        paperId: "paper-2",
        number: "Q11",
        title: "Q11 — Anagram Check",
        category: "Set & Map",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf process(String s1, String s2) ke andar code likhna.",
        concept: "HashMap character frequency counting (ignore case)",
        statement: `Determine whether two strings \`s1\` and \`s2\` are **anagrams** of each other using a **frequency map**.

Ignore case differences.

If anagrams:
\`\`\`
Anagram
\`\`\`

If not anagrams:
\`\`\`
Not Anagram
\`\`\``,
        sampleInput: `listen
silent`,
        sampleOutput: `Anagram`,
        constraints: `1 <= s1.length(), s2.length() <= 10^5`,
        methodSignature: "static void process(String s1, String s2)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(String s1, String s2) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String s1 = sc.next();
        String s2 = sc.next();

        process(s1, s2);
    }
}`,
        referenceSolution: `        String str1 = s1.toLowerCase();
        String str2 = s2.toLowerCase();
        if (str1.length() != str2.length()) {
            System.out.println("Not Anagram");
            return;
        }
        Map<Character, Integer> map = new HashMap<>();
        for (char c : str1.toCharArray()) map.put(c, map.getOrDefault(c, 0) + 1);
        for (char c : str2.toCharArray()) map.put(c, map.getOrDefault(c, 0) - 1);
        boolean isAnagram = true;
        for (int count : map.values()) {
            if (count != 0) {
                isAnagram = false;
                break;
            }
        }
        if (isAnagram) System.out.println("Anagram");
        else System.out.println("Not Anagram");`,
        testcases: [
          {
            id: 1,
            input: "listen silent",
            expectedOutput: "Anagram",
            isHidden: false,
            explanation: "Rearranging letters of listen forms silent"
          },
          {
            id: 2,
            input: "hello world",
            expectedOutput: "Not Anagram",
            isHidden: false,
            explanation: "Different character frequencies"
          },
          {
            id: 3,
            input: "Triangle Integral",
            expectedOutput: "Anagram",
            isHidden: true,
            explanation: "Case insensitive anagram check"
          },
          {
            id: 4,
            input: "a ab",
            expectedOutput: "Not Anagram",
            isHidden: true,
            explanation: "Different lengths"
          }
        ]
      },
      {
        id: 112,
        paperId: "paper-2",
        number: "Q12",
        title: "Q12 — ATM Withdrawal (Custom Exceptions)",
        category: "Exceptions",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf withdraw(double balance, double amount) ke andar code likhna.",
        concept: "Custom Exceptions + Sequential Validation Rules",
        statement: `Simulate an ATM withdrawal method with custom exception handling rules:

**Validation Order**:
1. \`amount <= 0\` → throw \`InvalidAmountException("Invalid Amount")\`
2. \`amount > balance\` → throw \`InsufficientBalanceException("Insufficient Balance")\`
3. \`amount % 100 != 0\` → throw \`InvalidDenominationException("Invalid Denomination")\`

If all validations pass:
\`\`\`
Withdrawal Successful
Remaining Balance: <bal_with_2_decimals>
\`\`\`

If any exception is thrown, catch it and print \`e.getMessage()\`.

Output format for success:
\`\`\`
Withdrawal Successful
Remaining Balance: 3800.00
\`\`\``,
        sampleInput: `5000
1200`,
        sampleOutput: `Withdrawal Successful
Remaining Balance: 3800.00`,
        constraints: `0 <= balance, amount <= 10^7`,
        methodSignature: "static void withdraw(double balance, double amount)",
        prefixCode: `import java.util.*;

// 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `// 1. Define custom exceptions: InvalidAmountException, InsufficientBalanceException, InvalidDenominationException

// 2. Define ProcessHelper class with withdraw(double balance, double amount) method

class ProcessHelper {
    static void withdraw(double balance, double amount) {
        // Write validation & withdrawal logic here
    }
}`,
        suffixCode: `// 👆 YOUR CODE ENDS HERE

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double balance = sc.nextDouble();
        double amount = sc.nextDouble();
        ProcessHelper.withdraw(balance, amount);
    }
}`,
        referenceSolution: `class InvalidAmountException extends Exception {
    public InvalidAmountException(String message) { super(message); }
}
class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String message) { super(message); }
}
class InvalidDenominationException extends Exception {
    public InvalidDenominationException(String message) { super(message); }
}

class ProcessHelper {
    static void withdraw(double balance, double amount) {
        try {
            if (amount <= 0) throw new InvalidAmountException("Invalid Amount");
            if (amount > balance) throw new InsufficientBalanceException("Insufficient Balance");
            if (amount % 100 != 0) throw new InvalidDenominationException("Invalid Denomination");
            double rem = balance - amount;
            System.out.println("Withdrawal Successful");
            System.out.printf(Locale.US, "Remaining Balance: %.2f\\n", rem);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}`,
        testcases: [
          {
            id: 1,
            input: "5000 1200",
            expectedOutput: "Withdrawal Successful\nRemaining Balance: 3800.00",
            isHidden: false,
            explanation: "Valid withdrawal of 1200 from 5000"
          },
          {
            id: 2,
            input: "5000 1250",
            expectedOutput: "Invalid Denomination",
            isHidden: false,
            explanation: "1250 is not a multiple of 100"
          },
          {
            id: 3,
            input: "2000 3000",
            expectedOutput: "Insufficient Balance",
            isHidden: true,
            explanation: "Amount exceeds balance"
          },
          {
            id: 4,
            input: "1000 -500",
            expectedOutput: "Invalid Amount",
            isHidden: true,
            explanation: "Amount <= 0"
          }
        ]
      },
      {
        id: 113,
        paperId: "paper-2",
        number: "Q13",
        title: "Q13 — Abstract Vehicle System",
        category: "OOP",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Vehicle abstract class, Car/Bike subclasses aur process logic likhna.",
        concept: "Abstract classes, inheritance, method overriding, object array scanning",
        statement: `Given vehicle arrays of types (\`Car\` / \`Bike\`), brands, and distances:

1. Create \`abstract class Vehicle\` with private field \`brand\`, constructor, getter \`getBrand()\`, and \`abstract double calculateCost()\`.
2. Create \`class Car extends Vehicle\` with cost = \`distance * 12\`.
3. Create \`class Bike extends Vehicle\` with cost = \`distance * 5\`.
4. Implement process logic in \`ProcessHelper.process(types, brands, distances)\` to instantiate objects and print the vehicle with maximum travel cost.

⚠️ **Tie-breaker**: Choose the **first** vehicle if maximum cost occurs multiple times.

Output format:
\`\`\`
Maximum Cost Vehicle: <brand>
Cost: <cost_with_2_decimals>
Index: <0_based_index>
\`\`\``,
        sampleInput: `4
Car Toyota 100
Bike Honda 200
Car BMW 80
Bike Yamaha 150`,
        sampleOutput: `Maximum Cost Vehicle: Toyota
Cost: 1200.00
Index: 0`,
        constraints: `1 <= n <= 10^4`,
        methodSignature: "abstract class Vehicle + Car/Bike subclasses + process()",
        prefixCode: `import java.util.*;

// 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `// 1. Define abstract class Vehicle (brand, constructor, getBrand, abstract calculateCost)

// 2. Define class Car extends Vehicle (distance * 12)

// 3. Define class Bike extends Vehicle (distance * 5)

// 4. Define ProcessHelper with static void process(String[] types, String[] brands, double[] distances)

class ProcessHelper {
    static void process(String[] types, String[] brands, double[] distances) {
        // Instantiate Vehicle objects & calculate maximum cost
    }
}`,
        suffixCode: `// 👆 YOUR CODE ENDS HERE

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] types = new String[n];
        String[] brands = new String[n];
        double[] distances = new double[n];
        for (int i = 0; i < n; i++) {
            types[i] = sc.next();
            brands[i] = sc.next();
            distances[i] = sc.nextDouble();
        }
        ProcessHelper.process(types, brands, distances);
    }
}`,
        referenceSolution: `abstract class Vehicle {
    private String brand;
    public Vehicle(String brand) { this.brand = brand; }
    public String getBrand() { return brand; }
    public abstract double calculateCost();
}

class Car extends Vehicle {
    private double distance;
    public Car(String brand, double distance) { super(brand); this.distance = distance; }
    public double calculateCost() { return distance * 12; }
}

class Bike extends Vehicle {
    private double distance;
    public Bike(String brand, double distance) { super(brand); this.distance = distance; }
    public double calculateCost() { return distance * 5; }
}

class ProcessHelper {
    static void process(String[] types, String[] brands, double[] distances) {
        int n = types.length;
        Vehicle[] vehicles = new Vehicle[n];
        for (int i = 0; i < n; i++) {
            if (types[i].equalsIgnoreCase("Car")) {
                vehicles[i] = new Car(brands[i], distances[i]);
            } else {
                vehicles[i] = new Bike(brands[i], distances[i]);
            }
        }
        int maxIdx = 0;
        double maxCost = vehicles[0].calculateCost();
        for (int i = 1; i < n; i++) {
            double cost = vehicles[i].calculateCost();
            if (cost > maxCost) {
                maxCost = cost;
                maxIdx = i;
            }
        }
        System.out.println("Maximum Cost Vehicle: " + vehicles[maxIdx].getBrand());
        System.out.printf(Locale.US, "Cost: %.2f\\n", maxCost);
        System.out.println("Index: " + maxIdx);
    }
}`,
        testcases: [
          {
            id: 1,
            input: "4\nCar Toyota 100\nBike Honda 200\nCar BMW 80\nBike Yamaha 150",
            expectedOutput: "Maximum Cost Vehicle: Toyota\nCost: 1200.00\nIndex: 0",
            isHidden: false,
            explanation: "Car Toyota cost = 100*12 = 1200"
          },
          {
            id: 2,
            input: "2\nBike Suzuki 500\nCar Ford 100",
            expectedOutput: "Maximum Cost Vehicle: Suzuki\nCost: 2500.00\nIndex: 0",
            isHidden: false,
            explanation: "Bike Suzuki cost = 500*5 = 2500"
          },
          {
            id: 3,
            input: "3\nCar Nissan 50\nCar Honda 50\nBike TVS 100",
            expectedOutput: "Maximum Cost Vehicle: Nissan\nCost: 600.00\nIndex: 0",
            isHidden: true,
            explanation: "Tie breaker selects first vehicle Nissan"
          }
        ]
      },
      {
        id: 114,
        paperId: "paper-2",
        number: "Q14",
        title: "Q14 — Employee Email Generator",
        category: "OOP",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Employee class private fields/getters aur email generator logic likhna.",
        concept: "Encapsulation, private fields, getters, String manipulation",
        statement: `Given employee names and IDs:

1. Define \`class Employee\` with private fields \`name\` and \`id\`, constructor, and getters \`getName()\` and \`getId()\`.
2. Implement email generator logic in \`ProcessHelper.process(names, ids)\`.
3. For each employee, generate email as \`<first_letter_lowercase><id>@company.com\`.
4. Print the employee with the **longest original name**.

Output format:
\`\`\`
a101@company.com
r202@company.com
k303@company.com
Longest Name: KaRaN
\`\`\``,
        sampleInput: `3
aMan 101
RIYA 202
KaRaN 303`,
        sampleOutput: `a101@company.com
r202@company.com
k303@company.com
Longest Name: KaRaN`,
        constraints: `1 <= n <= 10^4`,
        methodSignature: "class Employee + getters + process()",
        prefixCode: `import java.util.*;

// 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `// 1. Define class Employee with private fields name, id, constructor, getName(), getId()

// 2. Define ProcessHelper class with static void process(String[] names, int[] ids)

class ProcessHelper {
    static void process(String[] names, int[] ids) {
        // Instantiate Employee objects, generate emails, & find longest name
    }
}`,
        suffixCode: `// 👆 YOUR CODE ENDS HERE

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] names = new String[n];
        int[] ids = new int[n];
        for (int i = 0; i < n; i++) {
            names[i] = sc.next();
            ids[i] = sc.nextInt();
        }
        ProcessHelper.process(names, ids);
    }
}`,
        referenceSolution: `class Employee {
    private String name;
    private int id;
    public Employee(String name, int id) { this.name = name; this.id = id; }
    public String getName() { return name; }
    public int getId() { return id; }
}

class ProcessHelper {
    static void process(String[] names, int[] ids) {
        int n = names.length;
        Employee[] emps = new Employee[n];
        for (int i = 0; i < n; i++) {
            emps[i] = new Employee(names[i], ids[i]);
        }
        String longestName = emps[0].getName();
        for (int i = 0; i < n; i++) {
            String name = emps[i].getName();
            char firstChar = Character.toLowerCase(name.charAt(0));
            System.out.println(firstChar + "" + emps[i].getId() + "@company.com");
            if (name.length() > longestName.length()) {
                longestName = name;
            }
        }
        System.out.println("Longest Name: " + longestName);
    }
}`,
        testcases: [
          {
            id: 1,
            input: "3\naMan 101\nRIYA 202\nKaRaN 303",
            expectedOutput: "a101@company.com\nr202@company.com\nk303@company.com\nLongest Name: KaRaN",
            isHidden: false,
            explanation: "Emails generated and longest name KaRaN"
          },
          {
            id: 2,
            input: "2\nBob 50\nAlice 99",
            expectedOutput: "b50@company.com\na99@company.com\nLongest Name: Alice",
            isHidden: false,
            explanation: "Alice is longer than Bob"
          },
          {
            id: 3,
            input: "1\nZ 7",
            expectedOutput: "z7@company.com\nLongest Name: Z",
            isHidden: true,
            explanation: "Single character name"
          }
        ]
      },
      {
        id: 115,
        paperId: "paper-2",
        number: "Q15",
        title: "Q15 — Student Code Validator",
        category: "Mixed Hard",
        difficulty: "Hard",
        marks: 10,
        tagline: "Tera kaam: Sirf process(String[] data) ke andar code likhna.",
        concept: "Full Mixed Hard: String parsing, Exception handling, Integer.parseInt(), HashSet, TreeSet, Average filter",
        statement: `Given an array of \`name:marks\` formatted strings:

1. Split string by \`:\`.
2. Convert marks using \`Integer.parseInt()\`.
3. If marks cannot be parsed, or if marks < 0 or > 100, print:
   \`\`\`
   Invalid Marks: <raw_marks>
   \`\`\`
   and skip the record.
4. Store valid student names and marks.
5. Find top student (highest marks, first tie).
6. Calculate average of valid marks (formatted to 2 decimal places e.g. \`78.00\`).
7. Store unique valid marks in a \`HashSet<Integer>\` (insertion order / unique).
8. Store unique valid marks in a \`TreeSet<Integer>\` (ascending sorted).
9. Print all students scoring strictly above average.

Output format:
\`\`\`
Invalid Marks: <invalid_val1>
...
Top Student: <name>
Top Marks: <marks>
Average: <avg_2_decimals>
Above Average: <name1> <name2> ...
Unique Marks: <mark1> <mark2> ...
Sorted Marks: <mark1> <mark2> ...
\`\`\``,
        sampleInput: `7
Aman:80
Riya:95
Karan:abc
Simran:70
Raj:95
Neha:50
Arjun:110`,
        sampleOutput: `Invalid Marks: abc
Invalid Marks: 110
Top Student: Riya
Top Marks: 95
Average: 78.00
Above Average: Aman Riya Raj
Unique Marks: 80 95 70 50
Sorted Marks: 50 70 80 95`,
        constraints: `1 <= n <= 10^5`,
        methodSignature: "static void process(String[] data)",
        prefixCode: `import java.util.*;

public class Main {

    static void process(String[] data) {

        // 👇 YOUR CODE STARTS HERE`,
        starterUserCode: `        `,
        suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        String[] data = new String[n];
        for (int i = 0; i < n; i++) {
            data[i] = sc.next();
        }

        process(data);
    }
}`,
        referenceSolution: `        List<String> validNames = new ArrayList<>();
        List<Integer> validMarks = new ArrayList<>();
        Set<Integer> uniqueSet = new LinkedHashSet<>();
        TreeSet<Integer> sortedSet = new TreeSet<>();

        for (String entry : data) {
            String[] parts = entry.split(":");
            String name = parts[0];
            String rawMark = parts.length > 1 ? parts[1] : "";
            try {
                int mark = Integer.parseInt(rawMark);
                if (mark < 0 || mark > 100) {
                    System.out.println("Invalid Marks: " + rawMark);
                } else {
                    validNames.add(name);
                    validMarks.add(mark);
                    uniqueSet.add(mark);
                    sortedSet.add(mark);
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid Marks: " + rawMark);
            }
        }

        if (validMarks.isEmpty()) return;

        int topIdx = 0;
        double sum = 0;
        for (int i = 0; i < validMarks.size(); i++) {
            int m = validMarks.get(i);
            sum += m;
            if (m > validMarks.get(topIdx)) {
                topIdx = i;
            }
        }
        double avg = sum / validMarks.size();

        System.out.println("Top Student: " + validNames.get(topIdx));
        System.out.println("Top Marks: " + validMarks.get(topIdx));
        System.out.printf(Locale.US, "Average: %.2f\\n", avg);

        System.out.print("Above Average:");
        for (int i = 0; i < validMarks.size(); i++) {
            if (validMarks.get(i) > avg) {
                System.out.print(" " + validNames.get(i));
            }
        }
        System.out.println();

        System.out.print("Unique Marks:");
        for (int mark : uniqueSet) {
            System.out.print(" " + mark);
        }
        System.out.println();

        System.out.print("Sorted Marks:");
        for (int mark : sortedSet) {
            System.out.print(" " + mark);
        }
        System.out.println();`,
        testcases: [
          {
            id: 1,
            input: "7\nAman:80\nRiya:95\nKaran:abc\nSimran:70\nRaj:95\nNeha:50\nArjun:110",
            expectedOutput: `Invalid Marks: abc
Invalid Marks: 110
Top Student: Riya
Top Marks: 95
Average: 78.00
Above Average: Aman Riya Raj
Unique Marks: 80 95 70 50
Sorted Marks: 50 70 80 95`,
            isHidden: false,
            explanation: "Invalid abc and 110 filtered out, top student Riya"
          },
          {
            id: 2,
            input: "3\nAlice:90\nBob:90\nCharlie:50",
            expectedOutput: `Top Student: Alice
Top Marks: 90
Average: 76.67
Above Average: Alice Bob
Unique Marks: 90 50
Sorted Marks: 50 90`,
            isHidden: false,
            explanation: "All valid marks, tie for top student chooses first Alice"
          },
          {
            id: 3,
            input: "2\nJohn:-5\nJane:xyz",
            expectedOutput: `Invalid Marks: -5
Invalid Marks: xyz`,
            isHidden: true,
            explanation: "All inputs invalid"
          }
        ]
      }
    ]
  }
];

// Active Paper Helper
export const getActivePaperId = () => {
  return localStorage.getItem('active_paper_id') || 'sample-paper-1';
};

export const setActivePaperId = (paperId) => {
  localStorage.setItem('active_paper_id', paperId);
};

// Practice Papers helpers
export const getPracticePapers = () => {
  const saved = localStorage.getItem('practice_papers_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.some(p => p.id === 'sample-paper-1')) {
        return parsed;
      }
    } catch (e) {
      console.error("Failed to parse stored practice papers", e);
    }
  }
  return practiceTestPapers;
};

export const savePracticePapers = (papers) => {
  localStorage.setItem('practice_papers_data', JSON.stringify(papers));
};

// Backward compatibility helper
export const getQuestionsData = () => getPracticePapers();
export const saveQuestionsData = (data) => savePracticePapers(data);

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

export const saveDraftCode = (questionId, userCode) => {
  const progress = getUserProgress();
  const existing = progress[questionId] || {};
  progress[questionId] = {
    ...existing,
    userCode,
    updatedAt: Date.now()
  };
  localStorage.setItem('user_exam_progress', JSON.stringify(progress));
};

export const saveQuestionProgress = (questionId, { userCode, marksEarned, totalMarks, passedCount, totalCount, status }) => {
  const progress = getUserProgress();
  progress[questionId] = {
    ...progress[questionId],
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
