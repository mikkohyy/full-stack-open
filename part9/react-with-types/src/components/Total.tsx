import React from 'react';
import { CourseInfo } from '../types';

const Total = ({ courses }: { courses: CourseInfo[] }) => {
  return(
    <div>
      <p>
        Number of exercises{" "}
        {courses.reduce((carry:number, part: CourseInfo) => carry + part.exerciseCount, 0)}
      </p>
  </div>
  );

};

export default Total;