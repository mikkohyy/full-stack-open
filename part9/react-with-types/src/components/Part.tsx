import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../helpers';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const getRightPartFormat = (part: CoursePart) => {
    switch (part.type) {
      case 'normal':
        return (
          <em>{part.description}</em>
        );
      case 'groupProject':
        return (
          <>
            project exercises {part.groupProjectCount}
          </>          
        );
      case 'submission':
        return (
          <>
            <em>{part.description}</em>
            <br />
            submit to {part.exerciseSubmissionLink}
          </>
        );
      case 'special':
        return (
          <>
            <em>{part.description}</em>
            <br />
            required skills: {part.requirements.join(', ')}
          </>
        ); 
      default:
        return assertNever(part);
    }
  };
  
  return(
    <div>
      {getRightPartFormat(coursePart)}
    </div>
  );
};

export default Part;