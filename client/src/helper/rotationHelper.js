import classInfo from "../data/ClassInfo.json";
import rotation from "../data/rotation_cleaned.csv";
import parseCSVFile from "./csvParser.js";

export default async function csvClasses() {
  var data = await parseCSVFile(rotation);
  const rotationCourses = data.map((a) => {
    return a.Number;
  });
  return rotationCourses;
}
