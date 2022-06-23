import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../helpers';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const getRightPartFormat = (part: CoursePart) => {
    switch (part.type) {
      case 'normal':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>{part.description}</em>
          </p>
        );
      case 'groupProject':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            project exercises {part.groupProjectCount}
          </p>          
        );
      case 'submission':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>{part.description}</em>
            <br />
            submit to {part.exerciseSubmissionLink}
          </p>
        );
      case 'special':
        return (
          <p>
            <b>{part.name} {part.exerciseCount}</b>
            <br />
            <em>{part.description}</em>
            <br />
            required skills: {part.requirements.join(', ')}
          </p>
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