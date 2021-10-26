# Mini_Python Interpreter Design Using C++

Name : Suryateja Kurella

PSID : 2050296

Language Used : C++

Project Description :

In this project, we are given a project to design a Mini Python Interpreter design using C++



----------------------

1. I used only `C++` for this project.

2. Used regexes wherever necessary.

3. Implemented an optional feature `Subtraction`.

4. Implemented if-else, nested if-else(any number of levels possible).

5. Implemented Lambda expressions(similar patterns defined in the provided test cases).

6. Implemented string concatenations, handled spaces, arithmetic addition operations.



----------------------
My Approach :

1. Initially I get the input from a text file dynamically using command line arguments.


2. The input text file is then cleaned for comments and blank lines in `readFile` method


3. I verify for any lambda statements intially and update my symbol table accordingly.


4. In the `main` method I call `run` method which in turn calls `lexer` and `make_tokens` methods, where the lexical
   Analysis and Tokenizing is performed and the Symbol table is updated accordingly.


5. I lookup any new variables in the lines with the Symbol Table and perform the operations accordingly.


6. I used regexes to identify identifiers, variables, lambda expressions etc.


7. The output of the program is printed in console and also output to file `output.txt`
