let db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the mydb database.');
    }
});

const dropQuery = `
    DROP TABLE IF EXISTS person
`;

const insertQuery = `
  CREATE TABLE IF NOT EXISTS person(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name VARCHAR(20),
    user_password VARCHAR(20),
    user_email VARCHAR(50),
    user_grade VARCHAR(7),
    user_class VARCHAR(20),
    user_number VARCHAR(50)
  )
`;

const dummyDataQuery = `
  insert into person(user_name, user_password, user_email, user_grade, user_class, user_number) values ('doraemong', 'daenamuhelicopter', 'doraemong@naver.com', '2','4', '17'),
    ('kukaro', 'wordpass', 'kukaro@gmail.com', '1','1', '8'),
    ('jiharu', 'password', 'jiharu@gsm.hs.kr', '3','2', '10')
`;

db.serialize(() => {
    db.each(dropQuery);
    db.each(insertQuery);
    db.each(dummyDataQuery);
});

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Close the database connection.');
    }
});
