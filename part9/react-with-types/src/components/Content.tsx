import React from 'react';
import { CourseInfo } from '../types';

const Content = ({courses}: {courses: Array<CourseInfo>}) => {
  return(
    <div>
      {courses.map(course => <p key={course.name}>{course.name} {course.exerciseCount}</p>)}
    </div>
  );
};

export default Content;