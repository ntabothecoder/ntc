-- Table to store student information
CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reg_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    course_name TEXT,
    email TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table to track daily attendance (The Roll Call)
CREATE TABLE attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    date DATE NOT NULL,
    status TEXT CHECK(status IN ('Present', 'Absent', 'Late')),
    remarks TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id)
);
