import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Todo from './Todo';

test('renders note content', () => {
  const dummyFunction = () => {
    return null;
  };
  
  const todo = {
    text: 'a new todo',
    done: false
	};

  render(<Todo todo={todo} onClickDelete={dummyFunction} onClickComplete={dummyFunction} />);

  const createdElement = screen.getByText('a new todo');
  expect(createdElement).toBeDefined();
});

test('renders right text about completion', () => {
  const dummyFunction = () => {
    return null;
  };
  
  const todo = {
    text: 'a new todo',
    done: false
	};

  render(<Todo todo={todo} onClickDelete={dummyFunction} onClickComplete={dummyFunction} />);

  const createdElement = screen.getByText('This todo is not done');
  expect(createdElement).toBeDefined();
});