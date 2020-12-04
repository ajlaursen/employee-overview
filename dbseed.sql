USE employeeDB;
DELETE FROM department;
DELETE FROM role;
DELETE FROM employee;




INSERT INTO department (name)
VALUES
    ("Human Resources"),
    ("IT"),
    ("Accounting"),
    ("Marketing"),
    ("Research and Development");

INSERT INTO role(title, salary, department_id)
VALUES
    ("Manager", 100000, 1),
    ("Assitant the manager", 50000, 1),
    ("Salesman", 50000, 4),
    ("Receptionist", 50000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Bob", "starky", 1, null),
    ("sharon", "babushka", 2, 1);

    