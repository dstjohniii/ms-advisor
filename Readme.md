# Production site

https://dstjohniii.github.io/ms-advisor/

# Install and Deploy

see https://github.com/dstjohniii/ms-advisor/tree/main/client#readme

to create a static build do `npm run build` in the client directory and all the production static files will be in the build directory.

To deploy just move the static files to a web server.

# Maintenance

The main two files you have to keep updated is /client/data/ClassInfo.json and /client/data/rotation_cleaned.csv. There is also a /client/data/Certificates.json that holds the value from the rotation_cleaned.csv and the label to display.

## ClassInfo.json

This is a large array of all possible classes with numerous fields that define the class. To add a new class just add a new object to the array and update the information.

```
{
    "courseNum": 1000,
    "courseName": "Class title",
    "subject": "CMP_SCI",
    "description": "Description about the class.",
    "core": false,
    "restricted": true,
    "credits": 0,
    "prerequisites": [
      "OR",
      { "courseNum": 1030, "subject": "MATH" },
      { "courseNum": 1045, "subject": "MATH" },
      { "courseNum": 1100, "subject": "MATH" },
      { "courseNum": 1800, "subject": "MATH" }
    ]
  }
```

* **courseNum:** is an integer
* **core:** is true if the class is needed for every path of the computer science graduate program.
* **restricted:** is true if the class is needed to be approved for the computer science graduate program.
* **credits:** is how many credits the course is worth towards the computer science graduate program.
* **prerequisites:** this is an array of all the required courses to take this class. If the first element is a string then it is either a AND or OR. Using boolean logic this gives details about to determine if all the prerequisites are satisfied. If an element is an array it will have the first element be an array with OR and AND, this allows for nested boolean logic. A normal class will have a subject and courseNum.

## rotation_cleaned.csv

This file is a cleaned up version of the rotation_full.xlsx that explains which classes are offered and when they are offered. If a class is not in this rotation then it will not show in the application.

* **Number:** course number
* **MSCS:** courses required for all paths will be marked with an `R`, and courses for just the traditional path will be marked with an `R*`.
* **GC\*:** any header that starts with GC and matches the value in the Certificates.json file will be used for certificates, courses required will be marked with a `R` and electives marked with an `L`.
* **Semesters:** Space seperated list of what semesters the course is offered, ie. `FS SP SS` for all semesters
* **even or odd**: if a course is only offered every other year than this will say if the years it is offered is `even` or `odd`.

# Suggested environment

- IDE: VS code, vs code plays really nice with react and is a light weight IDE that you can install greate extensions like prettier.

## Suggested VS Code Extensions

- **Prettier** - the most useful extension you can get by far.
- ES7 React/Redux/GraphQL/React-Native snippets
- ESLint - linter to help improve your code.
- Bracket Pair Colorizer - helps keep track of all the brackets in javascript.
- Live Share - Useful when pair programming

# Guides

## What is ReactJS

https://www.youtube.com/watch?v=JPT3bFIwJYA&ab_channel=Academind

## Guide used to create ReactJS

https://www.youtube.com/watch?v=dGcsHMXbSOA&ab_channel=DevEd

# Useful Libraries and Components

- https://mui.com/
- https://reactrouter.com/web/guides/quick-start
