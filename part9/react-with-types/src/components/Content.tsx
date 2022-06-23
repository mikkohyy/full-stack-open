import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({courses}: {courses: Array<CoursePart>}) => {
  return(
    <div>
      {courses.map(course => <Part key={course.name} coursePart={course} />)}
    </div>
  );
};

export default Content;