const fs = require('fs');
const path = require('path');

const paper4 = {
  id: "paper-4",
  day: "Day 5",
  title: "Practice Test Paper 4",
  subtitle: "Top 10 OOP Master Problems (100 Marks • Classes, Inheritance, Abstraction & Polymorphism)",
  totalMarks: 100,
  passingMarks: 40,
  examDate: "Exam: OOP Special Prep",
  instructions: [
    "This practice test contains 10 Core OOP Mixed Problems (10 Marks each = 100 Marks).",
    "Covers Part 1 (Classes & Encapsulation), Part 2 (Inheritance & Polymorphism), and Part 3 (Abstract Classes & Interfaces).",
    "Class Main and Scanner reading are locked. Complete the designated classes/methods.",
    "All test cases are 100% visible and evaluated automatically."
  ],
  questions: [
    {
      id: 801,
      paperId: "paper-4",
      number: "Q1",
      type: "coding",
      title: "Student Result System",
      category: "Classes & Methods",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: Student class ka constructor aur getGrade() method implement karna.",
      concept: "Class, constructor, this, method return, if-else ladder",
      statement: `Create a Student class with:
- name (String)
- marks (int)
- Parameterized constructor Student(String name, int marks)
- getGrade() method returning String based on rules:
  * marks >= 90 -> "A"
  * marks >= 75 -> "B"
  * marks >= 60 -> "C"
  * marks >= 40 -> "D"
  * otherwise   -> "F"`,
      sampleInput: "Rahul 82",
      sampleOutput: "Rahul\nB",
      constraints: "0 <= marks <= 100",
      methodSignature: "class Student { Student(String name, int marks); String getGrade(); }",
      prefixCode: `import java.util.*;`,
      starterUserCode: `class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        // YOUR CODE
    }

    String getGrade() {
        // YOUR CODE
        return "";
    }
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String name = sc.next();
        int marks = sc.nextInt();
        Student s = new Student(name, marks);
        System.out.println(s.name);
        System.out.println(s.getGrade());
    }
}`,
      referenceSolution: `class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    String getGrade() {
        if (marks >= 90) return "A";
        if (marks >= 75) return "B";
        if (marks >= 60) return "C";
        if (marks >= 40) return "D";
        return "F";
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "Rahul 82",
          expectedOutput: "Rahul\nB",
          isHidden: false,
          explanation: "82 gives Grade B"
        },
        {
          id: 2,
          input: "Priya 95",
          expectedOutput: "Priya\nA",
          isHidden: false,
          explanation: "95 gives Grade A"
        },
        {
          id: 3,
          input: "Amit 35",
          expectedOutput: "Amit\nF",
          isHidden: false,
          explanation: "35 gives Grade F"
        }
      ]
    },
    {
      id: 802,
      paperId: "paper-4",
      number: "Q2",
      type: "coding",
      title: "Employee Salary Calculation",
      category: "Inheritance & Polymorphism",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: Manager child class aur calculateSalary() override karna.",
      concept: "Inheritance (extends), constructor chaining (super), method overriding, polymorphism",
      statement: `Create a class hierarchy:
Employee (Parent):
- name (String)
- salary (double)
- Employee(String name, double salary) constructor
- calculateSalary() returning salary

Manager (Child extends Employee):
- bonus (double)
- Manager(String name, double salary, double bonus)
- Override calculateSalary() to return salary + bonus`,
      sampleInput: "Aman 40000 8000",
      sampleOutput: "48000.0",
      constraints: "salary >= 0, bonus >= 0",
      methodSignature: "class Manager extends Employee",
      prefixCode: `import java.util.*;

class Employee {
    String name;
    double salary;
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    double calculateSalary() {
        return salary;
    }
}`,
      starterUserCode: `class Manager extends Employee {
    double bonus;

    Manager(String name, double salary, double bonus) {
        super(name, salary);
        // YOUR CODE
    }

    @Override
    double calculateSalary() {
        // YOUR CODE
        return 0;
    }
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String name = sc.next();
        double salary = sc.nextDouble();
        double bonus = sc.nextDouble();
        Employee e = new Manager(name, salary, bonus);
        System.out.println(e.calculateSalary());
    }
}`,
      referenceSolution: `class Manager extends Employee {
    double bonus;

    Manager(String name, double salary, double bonus) {
        super(name, salary);
        this.bonus = bonus;
    }

    @Override
    double calculateSalary() {
        return salary + bonus;
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "Aman 40000 8000",
          expectedOutput: "48000.0",
          isHidden: false,
          explanation: "40000 + 8000 = 48000.0"
        },
        {
          id: 2,
          input: "Rohan 50000 5000",
          expectedOutput: "55000.0",
          isHidden: false,
          explanation: "50000 + 5000 = 55000.0"
        },
        {
          id: 3,
          input: "Neha 30000 0",
          expectedOutput: "30000.0",
          isHidden: false,
          explanation: "30000 + 0 = 30000.0"
        }
      ]
    },
    {
      id: 803,
      paperId: "paper-4",
      number: "Q3",
      type: "coding",
      title: "Bank Account + Encapsulation",
      category: "Encapsulation",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: BankAccount class ke deposit, withdraw, aur getBalance methods implement karna.",
      concept: "Private data members, getters, transaction validation",
      statement: `Create BankAccount with private balance:
- private double balance;
- BankAccount(double balance)
- deposit(double amount)
  * if amount <= 0: print "Invalid Deposit"
  * otherwise: add to balance
- withdraw(double amount)
  * if amount <= 0: print "Invalid Withdrawal"
  * if amount > balance: print "Insufficient Balance"
  * otherwise: subtract from balance
- getBalance(): return balance`,
      sampleInput: "5000 2000 1500",
      sampleOutput: "5500.0",
      constraints: "balance >= 0",
      methodSignature: "class BankAccount { void deposit(double); void withdraw(double); double getBalance(); }",
      prefixCode: `import java.util.*;`,
      starterUserCode: `class BankAccount {
    private double balance;

    BankAccount(double balance) {
        // YOUR CODE
    }

    void deposit(double amount) {
        // YOUR CODE
    }

    void withdraw(double amount) {
        // YOUR CODE
    }

    double getBalance() {
        // YOUR CODE
        return 0;
    }
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextDouble()) return;
        double initial = sc.nextDouble();
        double dep = sc.nextDouble();
        double w = sc.nextDouble();
        BankAccount b = new BankAccount(initial);
        b.deposit(dep);
        b.withdraw(w);
        System.out.println(b.getBalance());
    }
}`,
      referenceSolution: `class BankAccount {
    private double balance;

    BankAccount(double balance) {
        this.balance = balance;
    }

    void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid Deposit");
        } else {
            balance += amount;
        }
    }

    void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Invalid Withdrawal");
        } else if (amount > balance) {
            System.out.println("Insufficient Balance");
        } else {
            balance -= amount;
        }
    }

    double getBalance() {
        return balance;
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "5000 2000 1500",
          expectedOutput: "5500.0",
          isHidden: false,
          explanation: "5000 + 2000 - 1500 = 5500.0"
        },
        {
          id: 2,
          input: "3000 -500 1000",
          expectedOutput: "Invalid Deposit\n2000.0",
          isHidden: false,
          explanation: "Negative deposit rejected"
        },
        {
          id: 3,
          input: "1000 500 2000",
          expectedOutput: "Insufficient Balance\n1500.0",
          isHidden: false,
          explanation: "Withdrawal exceeds balance"
        }
      ]
    },
    {
      id: 804,
      paperId: "paper-4",
      number: "Q4",
      type: "coding",
      title: "Abstract Shape Calculator",
      category: "Abstract Class & Polymorphism",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: Circle aur Rectangle classes implement karke area() calculate karna.",
      concept: "Abstract class, abstract method, inheritance, overriding",
      statement: `Create abstract class Shape with abstract double area().
Create subclasses:
- Circle extends Shape:
  * double r
  * area = 3.14 * r * r
- Rectangle extends Shape:
  * double l, b
  * area = l * b`,
      sampleInput: "5 4 6",
      sampleOutput: "78.5\n24.0",
      constraints: "dimensions > 0",
      methodSignature: "class Circle extends Shape & class Rectangle extends Shape",
      prefixCode: `import java.util.*;

abstract class Shape {
    abstract double area();
}`,
      starterUserCode: `class Circle extends Shape {
    double r;
    Circle(double r) {
        // YOUR CODE
    }
    double area() {
        // YOUR CODE
        return 0;
    }
}

class Rectangle extends Shape {
    double l, b;
    Rectangle(double l, double b) {
        // YOUR CODE
    }
    double area() {
        // YOUR CODE
        return 0;
    }
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextDouble()) return;
        double r = sc.nextDouble();
        double l = sc.nextDouble();
        double b = sc.nextDouble();
        Shape s1 = new Circle(r);
        Shape s2 = new Rectangle(l, b);
        System.out.println(s1.area());
        System.out.println(s2.area());
    }
}`,
      referenceSolution: `class Circle extends Shape {
    double r;
    Circle(double r) {
        this.r = r;
    }
    double area() {
        return 3.14 * r * r;
    }
}

class Rectangle extends Shape {
    double l, b;
    Rectangle(double l, double b) {
        this.l = l;
        this.b = b;
    }
    double area() {
        return l * b;
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "5 4 6",
          expectedOutput: "78.5\n24.0",
          isHidden: false,
          explanation: "3.14*5*5 = 78.5, 4*6 = 24.0"
        },
        {
          id: 2,
          input: "10 5 10",
          expectedOutput: "314.0\n50.0",
          isHidden: false,
          explanation: "3.14*10*10 = 314.0, 5*10 = 50.0"
        },
        {
          id: 3,
          input: "2 3 7",
          expectedOutput: "12.56\n21.0",
          isHidden: false,
          explanation: "3.14*2*2 = 12.56, 3*7 = 21.0"
        }
      ]
    },
    {
      id: 805,
      paperId: "paper-4",
      number: "Q5",
      type: "coding",
      title: "Multiple Interfaces Implementation",
      category: "Interfaces",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: Report class implement karke print() aur show() methods likhna.",
      concept: "Multiple interfaces, implements keyword, public methods",
      statement: `Create two interfaces:
- interface Printable { void print(); }
- interface Showable { void show(); }

Create class Report implementing both interfaces:
- print() should print: "Printing Report"
- show() should print: "Showing Report"`,
      sampleInput: "run",
      sampleOutput: "Printing Report\nShowing Report",
      constraints: "No special constraints",
      methodSignature: "class Report implements Printable, Showable",
      prefixCode: `import java.util.*;

interface Printable {
    void print();
}

interface Showable {
    void show();
}`,
      starterUserCode: `class Report implements Printable, Showable {
    // YOUR CODE
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Report r = new Report();
        r.print();
        r.show();
    }
}`,
      referenceSolution: `class Report implements Printable, Showable {
    public void print() {
        System.out.println("Printing Report");
    }
    public void show() {
        System.out.println("Showing Report");
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "run",
          expectedOutput: "Printing Report\nShowing Report",
          isHidden: false,
          explanation: "Calls both interface methods"
        }
      ]
    },
    {
      id: 806,
      paperId: "paper-4",
      number: "Q6",
      type: "coding",
      title: "Highest Price Product",
      category: "ArrayList & Objects",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: static Product highestPrice(ArrayList<Product> list) method implement karna.",
      concept: "Class, constructor, ArrayList traversal, object comparison, object return",
      statement: `Given a class Product with:
- String name
- double price

Implement the method:
static Product highestPrice(ArrayList<Product> list)
which returns the Product object having the maximum price.`,
      sampleInput: "3\nPen 20\nBag 900\nBook 300",
      sampleOutput: "Bag\n900.0",
      constraints: "1 <= list.size() <= 10^5",
      methodSignature: "static Product highestPrice(ArrayList<Product> list)",
      prefixCode: `import java.util.*;

class Product {
    String name;
    double price;
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class Main {
    static Product highestPrice(ArrayList<Product> list) {
        // 👇 YOUR CODE STARTS HERE`,
      starterUserCode: `        `,
      suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int n = sc.nextInt();
        ArrayList<Product> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String name = sc.next();
            double price = sc.nextDouble();
            list.add(new Product(name, price));
        }
        Product ans = highestPrice(list);
        if (ans != null) {
            System.out.println(ans.name);
            System.out.println(ans.price);
        }
    }
}`,
      referenceSolution: `        if (list == null || list.isEmpty()) return null;
        Product highest = list.get(0);
        for (int i = 1; i < list.size(); i++) {
            if (list.get(i).price > highest.price) {
                highest = list.get(i);
            }
        }
        return highest;`,
      testcases: [
        {
          id: 1,
          input: "3\nPen 20\nBag 900\nBook 300",
          expectedOutput: "Bag\n900.0",
          isHidden: false,
          explanation: "Bag has highest price 900.0"
        },
        {
          id: 2,
          input: "2\nLaptop 50000\nPhone 30000",
          expectedOutput: "Laptop\n50000.0",
          isHidden: false,
          explanation: "Laptop has highest price 50000.0"
        },
        {
          id: 3,
          input: "3\nItemA 100\nItemB 50\nItemC 250",
          expectedOutput: "ItemC\n250.0",
          isHidden: false,
          explanation: "ItemC has highest price 250.0"
        }
      ]
    },
    {
      id: 807,
      paperId: "paper-4",
      number: "Q7",
      type: "coding",
      title: "Age Validation Exception",
      category: "Custom Exception",
      difficulty: "Medium",
      marks: 10,
      tagline: "Tera kaam: checkAge(int age) method mein validation + exception throw karna.",
      concept: "Custom Exception, extends Exception, throw, throws",
      statement: `Create custom exception class InvalidAgeException extends Exception.
Implement method:
static void checkAge(int age) throws InvalidAgeException

Rules:
- age < 0  -> throw InvalidAgeException("Invalid Age")
- age < 18 -> throw InvalidAgeException("Not Eligible")
- otherwise -> print "Eligible"`,
      sampleInput: "16",
      sampleOutput: "Not Eligible",
      constraints: "-100 <= age <= 150",
      methodSignature: "static void checkAge(int age) throws InvalidAgeException",
      prefixCode: `import java.util.*;

class InvalidAgeException extends Exception {
    InvalidAgeException(String msg) {
        super(msg);
    }
}

public class Main {
    static void checkAge(int age) throws InvalidAgeException {
        // 👇 YOUR CODE STARTS HERE`,
      starterUserCode: `        `,
      suffixCode: `        // 👆 YOUR CODE ENDS HERE
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextInt()) return;
        int age = sc.nextInt();
        try {
            checkAge(age);
        } catch (InvalidAgeException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      referenceSolution: `        if (age < 0) {
            throw new InvalidAgeException("Invalid Age");
        }
        if (age < 18) {
            throw new InvalidAgeException("Not Eligible");
        }
        System.out.println("Eligible");`,
      testcases: [
        {
          id: 1,
          input: "16",
          expectedOutput: "Not Eligible",
          isHidden: false,
          explanation: "16 is under 18"
        },
        {
          id: 2,
          input: "-5",
          expectedOutput: "Invalid Age",
          isHidden: false,
          explanation: "Negative age is invalid"
        },
        {
          id: 3,
          input: "21",
          expectedOutput: "Eligible",
          isHidden: false,
          explanation: "21 is eligible"
        }
      ]
    },
    {
      id: 808,
      paperId: "paper-4",
      number: "Q8",
      type: "coding",
      title: "Developer Salary and Tax",
      category: "Abstract + Interface + Inheritance",
      difficulty: "Hard",
      marks: 10,
      tagline: "Tera kaam: Developer class implement karke finalSalary() aur tax() override karna.",
      concept: "Abstract class, interface, inheritance, super, polymorphism",
      statement: `Given:
interface Taxable { double tax(); }
abstract class Employee {
    String name; double salary;
    Employee(String name, double salary) { this.name = name; this.salary = salary; }
    abstract double finalSalary();
}

Create class Developer extends Employee implements Taxable:
- Developer(String name, double salary) -> calls super(name, salary)
- finalSalary(): returns salary + 5000 bonus
- tax(): returns finalSalary() * 0.10`,
      sampleInput: "Rohan 50000",
      sampleOutput: "55000.0\n5500.0",
      constraints: "salary >= 0",
      methodSignature: "class Developer extends Employee implements Taxable",
      prefixCode: `import java.util.*;

interface Taxable {
    double tax();
}

abstract class Employee {
    String name;
    double salary;
    Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    abstract double finalSalary();
}`,
      starterUserCode: `class Developer extends Employee implements Taxable {
    // YOUR CODE
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String name = sc.next();
        double salary = sc.nextDouble();
        Employee e = new Developer(name, salary);
        System.out.println(e.finalSalary());
        Taxable t = new Developer(name, salary);
        System.out.println(t.tax());
    }
}`,
      referenceSolution: `class Developer extends Employee implements Taxable {
    Developer(String name, double salary) {
        super(name, salary);
    }
    double finalSalary() {
        return salary + 5000;
    }
    public double tax() {
        return finalSalary() * 0.10;
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "Rohan 50000",
          expectedOutput: "55000.0\n5500.0",
          isHidden: false,
          explanation: "50000 + 5000 = 55000.0; 55000 * 0.10 = 5500.0"
        },
        {
          id: 2,
          input: "Aman 40000",
          expectedOutput: "45000.0\n4500.0",
          isHidden: false,
          explanation: "40000 + 5000 = 45000.0; 45000 * 0.10 = 4500.0"
        },
        {
          id: 3,
          input: "Neha 20000",
          expectedOutput: "25000.0\n2500.0",
          isHidden: false,
          explanation: "20000 + 5000 = 25000.0; 25000 * 0.10 = 2500.0"
        }
      ]
    },
    {
      id: 809,
      paperId: "paper-4",
      number: "Q9",
      type: "coding",
      title: "Email Generator from Name",
      category: "String & Methods",
      difficulty: "Easy",
      marks: 10,
      tagline: "Tera kaam: Person class ka getEmail() method implement karna.",
      concept: "Constructor, this, toLowerCase(), replace(), string concatenation",
      statement: `Create class Person with:
- String name
- Person(String name) constructor
- String getEmail() method:
  1. Convert name to lowercase
  2. Replace spaces with .
  3. Append "@college.com"
Example: "Rahul Kumar" becomes "rahul.kumar@college.com"`,
      sampleInput: "Rahul Kumar",
      sampleOutput: "rahul.kumar@college.com",
      constraints: "1 <= name.length() <= 100",
      methodSignature: "class Person { String getEmail(); }",
      prefixCode: `import java.util.*;`,
      starterUserCode: `class Person {
    String name;

    Person(String name) {
        // YOUR CODE
    }

    String getEmail() {
        // YOUR CODE
        return "";
    }
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLine()) return;
        String name = sc.nextLine();
        Person p = new Person(name);
        System.out.println(p.getEmail());
    }
}`,
      referenceSolution: `class Person {
    String name;

    Person(String name) {
        this.name = name;
    }

    String getEmail() {
        return name.toLowerCase().replace(" ", ".") + "@college.com";
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "Rahul Kumar",
          expectedOutput: "rahul.kumar@college.com",
          isHidden: false,
          explanation: "Lowercase and spaces replaced with dot"
        },
        {
          id: 2,
          input: "Amit Sharma",
          expectedOutput: "amit.sharma@college.com",
          isHidden: false,
          explanation: "Amit Sharma -> amit.sharma@college.com"
        },
        {
          id: 3,
          input: "John",
          expectedOutput: "john@college.com",
          isHidden: false,
          explanation: "Single word name"
        }
      ]
    },
    {
      id: 810,
      paperId: "paper-4",
      number: "Q10",
      type: "coding",
      title: "Product Discount & Final Price (Full OOP Mix)",
      category: "Mixed OOP Master",
      difficulty: "Hard",
      marks: 10,
      tagline: "Tera kaam: Electronics class implement karke getDiscount() aur finalPrice() likhna.",
      concept: "Full Mix: Abstract class, Interface, extends, implements, super, overriding, polymorphism",
      statement: `Create complete hierarchy:
interface Discountable {
    double getDiscount();
}

abstract class Product {
    String name;
    double price;
    Product(String name, double price) { this.name = name; this.price = price; }
    abstract double finalPrice();
}

Create class Electronics extends Product implements Discountable:
- Electronics(String name, double price) -> calls super(name, price)
- getDiscount(): returns 10% of price (0.10 * price)
- finalPrice(): returns price - getDiscount()`,
      sampleInput: "Laptop 50000",
      sampleOutput: "Laptop\n45000.0\n5000.0",
      constraints: "price >= 0",
      methodSignature: "class Electronics extends Product implements Discountable",
      prefixCode: `import java.util.*;

interface Discountable {
    double getDiscount();
}

abstract class Product {
    String name;
    double price;
    Product(String name, double price) {
        this.name = name;
        this.price = price;
    }
    abstract double finalPrice();
}`,
      starterUserCode: `class Electronics extends Product implements Discountable {
    // YOUR CODE
}

public class Main {`,
      suffixCode: `    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNext()) return;
        String name = sc.next();
        double price = sc.nextDouble();
        Product p = new Electronics(name, price);
        System.out.println(p.name);
        System.out.println(p.finalPrice());
        Discountable d = new Electronics(name, price);
        System.out.println(d.getDiscount());
    }
}`,
      referenceSolution: `class Electronics extends Product implements Discountable {
    Electronics(String name, double price) {
        super(name, price);
    }
    double finalPrice() {
        return price - getDiscount();
    }
    public double getDiscount() {
        return price * 0.10;
    }
}

public class Main {`,
      testcases: [
        {
          id: 1,
          input: "Laptop 50000",
          expectedOutput: "Laptop\n45000.0\n5000.0",
          isHidden: false,
          explanation: "Discount 5000.0, final price 45000.0"
        },
        {
          id: 2,
          input: "Phone 20000",
          expectedOutput: "Phone\n18000.0\n2000.0",
          isHidden: false,
          explanation: "Discount 2000.0, final price 18000.0"
        },
        {
          id: 3,
          input: "Watch 5000",
          expectedOutput: "Watch\n4500.0\n500.0",
          isHidden: false,
          explanation: "Discount 500.0, final price 4500.0"
        }
      ]
    }
  ]
};

const questionsPath = path.join(__dirname, '../src/data/questions.js');
let content = fs.readFileSync(questionsPath, 'utf8');

// Insert paper4 at the very beginning of practiceTestPapers
const target = "export const practiceTestPapers = [";
const replacement = "export const practiceTestPapers = [\n" + JSON.stringify(paper4, null, 2) + ",\n";

if (!content.includes('"paper-4"')) {
  content = content.replace(target, replacement);
  // Update active paper fallback to paper-4
  content = content.replace(
    /return localStorage\.getItem\('active_paper_id'\) \|\| '.*';/,
    "return localStorage.getItem('active_paper_id') || 'paper-4';"
  );
  // Bump version to bust cache
  content = content.replace(
    /const PAPERS_DATA_VERSION = '.*';/,
    "const PAPERS_DATA_VERSION = 'v7_paper4_added';"
  );
  fs.writeFileSync(questionsPath, content, 'utf8');
  console.log("Successfully injected paper-4 into questions.js!");
} else {
  console.log("paper-4 already exists in questions.js!");
}
