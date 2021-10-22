import courses from "../data/ClassInfo.json";
import rotation from "../data/rotation_cleaned.csv";
import parseCSVFile from "./csvParser.js";
import initialData from "../data/initial-data";
import _union from "lodash/union";

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
    const rotationCourses = data.map((a) => {
      return a.Number;
    });
    return rotationCourses;
  } catch (err) {
    alert(err);
  }
}

export async function getAvailableClasses() {
  const cClass = await csvClasses();
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
