import classInfo from "../data/ClassInfo.json";
import rotation from "../data/rotation_cleaned.csv";
import parseCSVFile from "./csvParser.js";
import { parse } from "csv-parse/lib/sync";

var data = parseCSVFile(rotation);

export default function csvClasses() {
  var rotation = data[0];
  const rotationCourses = rotation.map((a) => {
    return a.Number;
  });
  return rotationCourses;
}

// export default async function csvClasses() {
//   const csvData = await parseCSVFile(rotation);
//   const rotationCourses = csvData.map((a) => {
//     return a;
//   });
//   csvData.map((d) => rotationCourses.push(d.Number));
//   console.log(`csvData`, await rotationCourses);
//   return rotationCourses;
// }

// function parseCSVFile2(rotation) {
//   fs.readFile("./file.csv", async (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(await neatCsv(data));
//   });

//   var fs = require("fs");
//   const input = `
//   "key_1","key_2"
//   "value 1","value 2"
//   `;
//   // fs.readFileSync(rotation, "utf-8");
//   const records = parse(input, {
//     columns: true,
//     skip_empty_lines: true,
//   });
//   return records;
// }
