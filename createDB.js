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
    user_name VARCHAR(20) NOT NULL,
    user_password VARCHAR(20) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_grade VARCHAR(7) NOT NULL,
    user_class VARCHAR(20) NOT NULL,
    user_number VARCHAR(50) NOT NULL
  )
`;

const insertQuery2 = `
    CREATE TABLE IF NOT EXISTS bulletin_board(
        listnum INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(50),
        kind VARCHAR(20),
        story TEXT,
        user_name VARCHAR(20)
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
