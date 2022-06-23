import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({courses}: {courses: Array<CoursePart>}) => {
  return(
    <div>
      {courses.map(course => {return (
        <div key={course.name}>
          <b>{course.name} {course.exerciseCount}</b>
          <Part key={`${course.name}-${course.exerciseCount}`} coursePart={course} />
          <br />
        </div>
      );
    })}
    </div>
  );
};

export default Content;