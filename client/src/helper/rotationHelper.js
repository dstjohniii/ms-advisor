import classInfo from "../data/ClassInfo.json";
import rotation from "../data/rotation_cleaned.csv";
import parseCSVFile from "./csvParser.js";

var data = parseCSVFile(rotation);

export default function csvClasses() {
  var rotation = data[0];
  const rotationCourses = rotation.map((a) => {
    return a.Number;
  });
  return rotationCourses;
}