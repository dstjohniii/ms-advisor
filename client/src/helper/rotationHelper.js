import courses from "../data/ClassInfo.json";
import rotation from "../data/rotation_cleaned.csv";
import parseCSVFile from "./csvParser.js";
import initialData from "../data/initial-data";
import _union from "lodash/union";

export async function csvClassNumbers() {
  courses.forEach((course) => {
    const id = String(course.courseNum);
    initialData.classes[id] = {
      id,
      content: `CS ${id} - ${course.courseName}`,
    };
    initialData.columns["available-classes"].taskIds.push(id);
  });

  try {
    var data = await parseCSVFile(rotation);
    const rotationCourses = data.map((a) => {
      return a.Number;
    });
    return rotationCourses;
  } catch (err) {
    alert(err);
  }
}

export async function csvClasses() {
  courses.forEach((course) => {
    const id = String(course.courseNum);
    initialData.classes[id] = {
      id,
      content: `CS ${id} - ${course.courseName}`,
    };
    initialData.columns["available-classes"].taskIds.push(id);
  });

  try {
    var data = await parseCSVFile(rotation);
    return data;
  } catch (err) {
    alert(err);
  }
}

export async function getAvailableClasses() {
  const cClass = await csvClassNumbers();
  const filteredData = { ...initialData };
  const restrictedCourses = courses.filter((c) => c.restricted);
  const restrictedCourseNums = restrictedCourses.map((fc) =>
    String(fc.courseNum)
  );

  filteredData.classes = Object.entries(initialData.classes).reduce(
    (acc, [k, v]) => {
      if (restrictedCourseNums?.includes(k) || cClass?.includes(k)) {
        return { ...acc, [k]: v };
      }
      return acc;
    },
    {}
  );
  filteredData.columns["available-classes"].taskIds = _union(
    restrictedCourseNums,
    cClass
  );
  return filteredData;
}

export function isCourseRestricted(courseNum) {
  return (
    courses.filter(
      (c) => String(c.courseNum) === String(courseNum) && c.restricted
    ).length > 0
  );
}

/*
 * Given a program id, returns an array of required course ids. Excluding 6000.
 * programIds
 * MSCS = MS in CS
 * Traditional = traditional path in CS extra requirements
 * MSCB = Masters in Cybersecurity
 * GCAI = certificate in AI
 * GCCB = certificate in Cybersecurity
 * GCDS = certificate in Data science
 * GCIW = Certificate Internet/Web
 * GCMA = Certificate Mobile Apps
 */
export function getRequiredCourses(programId, csvData) {
  let compare = "R";
  if (programId === "traditional") {
    compare = "R*";
    programId = "MSCS";
  }

  return !csvData
    ? null
    : csvData
        .filter((c) => c[programId] === compare)
        .filter((c) => !c.Number.startsWith("6"))
        .map((c) => c.Number);
}

/*
 * Given a program id, returns an array of elective course ids.
 * programIds
 * MSCS = MS in CS
 * MSCB = Masters in Cybersecurity
 * GCAI = certificate in AI
 * GCCB = certificate in Cybersecurity
 * GCDS = certificate in Data science
 * GCIW = Certificate Internet/Web
 * GCMA = Certificate Mobile Apps
 */
export function getElectiveCourses(programId, csvData) {
  return !csvData
    ? null
    : csvData.filter((c) => c[programId] === "L").map((c) => c.Number);
}

/* Returns an array of class numbers strings that are prerequisites to the 6000 level courses
 */
export function get6000Prereqs() {
  const a = [];
  courses
    .filter((c) => String(c.courseNum).startsWith("6"))
    .map((c) => c.prerequisites)
    .forEach((c) => c.forEach((b) => b.courseNum && a.push("" + b.courseNum)));
  return _union(a);
}

/* Given a course number, returns an array of class numbers that are pre
 * requisites to the given course number.
 */
export function getPrereqIds(courseId) {
  const a = [];
  getPreqStructure(courseId).forEach((c) => {
    // FIXME handle arrays
    c.courseNum && a.push("" + c.courseNum);
  });
  return _union(a);
}

// given a course number, returns the prerequisite structure.
export function getPreqStructure(courseId) {
  return courses
    .filter((c) => String(c.courseNum) === String(courseId))
    .map((c) => c.prerequisites)[0];
}

/*  Given a course number, returns an array of logic operators that determine
 *  how to do the logic for the prerequisites. First will always be how all of
 *  prereqs logic together, the following are the logic for each array of prereqs
 *  in the order of array. We only support a single nested logic.
 *  EXAMPLE
 *    "OR",
      "Grad_Standing",
      [
        "AND",
        { "courseNum": 1320, "subject": "MATH" },
        { "courseNum": 2750, "subject": "CMP_SCI" }
      ],
      [
        "OR",
        { "courseNum": 1000, "subject": "MATH" },
        { "courseNum": 4000, "subject": "CMP_SCI" }
      ]
 *
 *  returns ['OR', 'AND', 'OR'] 
 */
export function getPrereqTypes(courseId) {
  const types = [];
  getPreqStructure(courseId).forEach((c) => {
    if (typeof c === "string" && c !== "Grad_Standing") {
      types.push(c);
    }
    if (
      c instanceof Array &&
      typeof c[0] === "string" &&
      !c[0] === "Grad_Standing"
    )
      types.push(c);
  });

  return types;
}

/* Determines if course has its prerequisites satisfied by the given data.
 * This does not take into account information from the tabinfo
 */
export function isPrereqsSatisfied(courseId, data, plannedCourses) {
  const preStruct = getPreqStructure(courseId);
  // const semesters = getSemesters(data);
  return preReqinternal(preStruct, plannedCourses);
}

function preReqinternal(prereqs, plannedCourses) {
  const first = prereqs[0];
  if (typeof first !== "string")
    return plannedCourses.includes(prereqs[0].courseNum);

  const slicedPreqs = prereqs.slice(1);
  if (first === "OR") {
    let response = false;
    slicedPreqs.forEach((s) => {
      if (response) return;
      if (s === "Grad_Standing") {
        response = true;
      } else if (s instanceof Array) {
        response = preReqinternal(s, plannedCourses);
      } else if (plannedCourses.includes(s.courseNum)) response = true;
    });
    return response;
  }

  if (first === "AND") {
    let response = true;
    slicedPreqs.forEach((s) => {
      if (!response) return;
      if (s === "Grad_Standing") {
        response = true;
      } else if (s instanceof Array) {
        response = preReqinternal(s, plannedCourses);
      } else if (!plannedCourses.includes(s.courseNum)) response = false;
    });
    return response;
  }
}

/* Determines if course has its prerequisites satisfied by the given data,
 * and tabinfo
 */
export function isPrereqsSatisfiedComplete(
  courseId,
  data,
  tabInfo,
  plannedCourses
) {
  const preStruct = getPreqStructure(courseId);
  // const semesters = getSemesters(data);
  return preReqinternalComplete(preStruct, plannedCourses, tabInfo);
}

// returns true if the course has been completed already.
export function isCourseComplete(courseId, tabInfo) {
  return (
    tabInfo.completed.includes("" + courseId) ||
    tabInfo.waived.includes("" + courseId)
  );
}

function preReqinternalComplete(prereqs, plannedCourses, tabInfo) {
  const first = prereqs[0];
  if (typeof first !== "string")
    return (
      plannedCourses.includes("" + prereqs[0].courseNum) ||
      isCourseComplete(prereqs[0].courseNum, tabInfo)
    );

  const slicedPreqs = prereqs.slice(1);
  if (first === "OR") {
    let response = false;
    slicedPreqs.forEach((s) => {
      if (response) return;
      if (s === "Grad_Standing") {
        response = true;
      } else if (s instanceof Array) {
        response = preReqinternalComplete(s, plannedCourses, tabInfo);
      } else if (
        // isCourseSelectedSemesters(s.courseNum, plannedCourses) ||
        plannedCourses.includes("" + s.courseNum) ||
        isCourseComplete(s.courseNum, tabInfo)
      )
        response = true;
    });
    return response;
  }

  if (first === "AND") {
    let response = true;
    slicedPreqs.forEach((s) => {
      if (!response) return;
      if (s === "Grad_Standing") {
        response = true;
      } else if (s instanceof Array) {
        response = preReqinternalComplete(s, plannedCourses, tabInfo);
      } else if (
        // !isCourseSelectedSemesters(s.courseNum, plannedCourses) ||
        !plannedCourses.includes("" + s.courseNum) ||
        isCourseComplete(s.courseNum, tabInfo)
      )
        response = false;
    });
    return response;
  }
}

// Determines if the given course is selected in the dataset.
export function isCourseSelected(courseId, data) {
  let response = false;
  getSemesters(data).forEach((s) => {
    if (s.taskIds.includes(String(courseId))) response = true;
  });
  return response;
}

// Determines if the given course is selected in the semesters.
export function isCourseSelectedSemesters(courseId, semesters) {
  let response = false;
  semesters.forEach((s) => {
    if (s.taskIds.includes(String(courseId))) response = true;
  });
  return response;
}

// retrieves all columns for the dataset
export function getDataColumns(data) {
  return Object.entries(data.columns).map((c) => c[1]);
}

// retrieves all semesters for the dataset
export function getSemesters(data) {
  return getDataColumns(data).filter((c) => c.id !== "available-classes");
}

/*
 * semester comes in as semester-year
 * FS = fall
 * SS = summer
 * SP = spring
 * Example: FS-2022
 */
export function isOffered(classId, semesterId, classes) {
  try {
    let response = false;
    let found = false;
    classes.forEach((c) => {
      if (c.Number === classId) {
        found = true;
        const offeredSemesters = c.Semesters.split(" ");
        offeredSemesters.forEach((s) => {
          if (semesterId.startsWith(s)) {
            if (c["even or odd"]) {
              const year = semesterId.split("-")[1];
              if (isEven(year) && c["even or odd"] === "even") {
                response = true;
              }
              if (isOdd(year) && c["even or odd"] === "odd") {
                response = true;
              }
            } else {
              response = true;
            }
          }
        });
      }
    });
    if (!found) {
      return true;
    }
    return response;
  } catch (e) {
    console.error(`error in rotationHelper.js/isOffered`, e);
    return false;
  }
}

function isEven(n) {
  return n % 2 === 0;
}
function isOdd(n) {
  return Math.abs(n % 2) === 1;
}
