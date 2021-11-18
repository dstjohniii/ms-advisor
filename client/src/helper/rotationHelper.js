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

/* returns an array of class numbers strings that are prerequisites to the 6000 level courses
 */
export function get6000Prereqs() {
  const a = [];
  courses
    .filter((c) => String(c.courseNum).startsWith("6"))
    .map((c) => c.prerequisites)
    .forEach((c) => c.forEach((b) => b.courseNum && a.push("" + b.courseNum)));
  return _union(a);
}

/* given a course number, returns an array of class numbers that are pre
 * requisites to the given course number.
 */
export function getPrereqs(courseNum) {}

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
