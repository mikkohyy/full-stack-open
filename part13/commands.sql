CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (
    author, url, title
) values (
    'Swizec Teller',
    'https://swizec.com/blog/what-makes-a-real-image/',
    'What makes a real image?'
);

insert into blogs (
    author, url, title, likes
) values (
    'Robert C. Martin',
    'https://blog.cleancoder.com/uncle-bob/2021/06/25/OnTypes.html',
    'On Types',
    2
);

insert into blogs (
    url, title
) values (
    'https://reactpatterns.js.org/blog/react-hooks-cheat-sheet',
    'React Hooks Cheat Sheet'
);