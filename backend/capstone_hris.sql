CREATE TABLE `department` (
  `ID` int(11) NOT NULL,
  `deptName` enum(
    'Content',
    'Human Resource',
    'Information Technology',
    'Marketing',
    'Multimedia',
    'Research'
  ) NOT NULL
);
INSERT INTO `department` (`ID`, `deptName`)
VALUES (1, 'Content'),
  (2, 'Human Resource'),
  (3, 'Information Technology'),
  (4, 'Marketing'),
  (5, 'Multimedia'),
  (6, 'Research');
CREATE TABLE `department_employee` (
  `employeeID` int(11) NOT NULL,
  `deptID` int(11) NOT NULL
);
INSERT INTO `department_employee` (`employeeID`, `deptID`)
VALUES (2, 3),
  (2, 5);
CREATE TABLE `employees` (
  `ID` int(11) NOT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `firstName` varchar(50) DEFAULT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `placeOfBirth` varchar(100) DEFAULT NULL,
  `sex` enum('Male', 'Female') DEFAULT NULL,
  `civilStatus` enum(
    'Single',
    'Married',
    'Widowed',
    'Separated',
    'Other/s'
  ) DEFAULT NULL,
  `height` decimal(4, 2) DEFAULT NULL,
  `weight` decimal(5, 2) DEFAULT NULL,
  `bloodType` varchar(10) DEFAULT NULL,
  `gsisIDNo` varchar(20) DEFAULT NULL,
  `pagIbigIDNo` varchar(20) DEFAULT NULL,
  `philhealthNo` varchar(20) DEFAULT NULL,
  `sssNo` varchar(20) DEFAULT NULL,
  `tinNo` varchar(20) DEFAULT NULL,
  `agencyEmployeeNo` varchar(50) DEFAULT NULL,
  `citizenship` enum('Filipino', 'Dual Citizenship') DEFAULT NULL,
  `telephoneNo` varchar(20) DEFAULT NULL,
  `mobileNo` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
);
CREATE TABLE `employees_overview` (
  `ID` int(11) NOT NULL,
  `typeID` int(11) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `middleName` varchar(50) DEFAULT NULL,
  `dateOfBirth` date NOT NULL,
  `mobileNo` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL
);
CREATE TABLE `type` (
  `ID` int(11) NOT NULL,
  `typeName` enum('Employee', 'Intern') NOT NULL
);
INSERT INTO `type` (`ID`, `typeName`)
VALUES (1, 'Employee'),
  (2, 'Intern');
CREATE TABLE `users_login` (
  `userId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `dateModified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
);
INSERT INTO `users_login` (
    `userId`,
    `username`,
    `password`,
    `email`,
    `isActive`,
    `dateCreated`,
    `dateModified`
  )
VALUES (
    1,
    'admin',
    'c@pst0n3',
    'admin@capstone-intel.com',
    1,
    '2023-09-14 04:04:44',
    '2023-09-14 04:04:44'
  );
ALTER TABLE `department`
ADD PRIMARY KEY (`ID`);
ALTER TABLE `department_employee`
ADD PRIMARY KEY (`employeeID`, `deptID`),
  ADD KEY `deptID` (`deptID`);
ALTER TABLE `employees`
ADD PRIMARY KEY (`ID`);
ALTER TABLE `employees_overview`
ADD PRIMARY KEY (`ID`),
  ADD KEY `employeeType` (`typeID`);
ALTER TABLE `type`
ADD PRIMARY KEY (`ID`);
ALTER TABLE `users_login`
ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);
ALTER TABLE `department`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 7;
ALTER TABLE `employees`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
ALTER TABLE `employees_overview`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 7;
ALTER TABLE `type`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 3;
ALTER TABLE `users_login`
MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 2;
ALTER TABLE `department_employee`
ADD CONSTRAINT `department_employee_ibfk_1` FOREIGN KEY (`employeeID`) REFERENCES `employees_overview` (`ID`),
  ADD CONSTRAINT `department_employee_ibfk_2` FOREIGN KEY (`deptID`) REFERENCES `department` (`ID`);
ALTER TABLE `employees_overview`
ADD CONSTRAINT `employeeDept` FOREIGN KEY (`ID`) REFERENCES `department_employee` (`employeeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `employeeType` FOREIGN KEY (`typeID`) REFERENCES `type` (`ID`);
COMMIT;