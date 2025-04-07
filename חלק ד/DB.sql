-- שימוש בדאטהבייס
USE Store_Data_Base;

--SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'OrderType';
--SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Good';
--שלב 1: מחיקת כל הקשרים הזרים בכל הטבלאות
DECLARE @sql NVARCHAR(MAX) = N'';

SELECT @sql += '
ALTER TABLE [' + sch.name + '].[' + t.name + '] DROP CONSTRAINT [' + fk.name + '];'
FROM sys.foreign_keys fk
JOIN sys.tables t ON fk.parent_object_id = t.object_id
JOIN sys.schemas sch ON t.schema_id = sch.schema_id;

EXEC sp_executesql @sql;

-- מחיקת הטבלאות עצמן אם קיימות
DROP TABLE IF EXISTS GoodDetail;
DROP TABLE IF EXISTS OrderDetail;
DROP TABLE IF EXISTS Good;
DROP TABLE IF EXISTS OrderType;
DROP TABLE IF EXISTS Supplier;

-- שלב 3: יצירת הטבלאות מחדש כולל 

CREATE TABLE Supplier (
    ID INT PRIMARY KEY,  
    AgentName VARCHAR(20),
    CompanyName VARCHAR(100) NOT NULL,  
    NumberPhone VARCHAR(15)
);

CREATE TABLE OrderType (
    ID INT IDENTITY(1,1) PRIMARY KEY,  
    ProductName VARCHAR(20) NOT NULL,  
    SumP INT NOT NULL,  
    OStatus VARCHAR(50) NOT NULL,
    SupplierID INT,  
    FOREIGN KEY (SupplierID) REFERENCES Supplier(ID)
);

CREATE TABLE Good (
    ID INT IDENTITY(1,1) PRIMARY KEY,  
    ProductName VARCHAR(20),  
    PricePerItem DECIMAL(10,2),  
    MinimumQuantityForOrder INT,
    SupplierID INT,  
    FOREIGN KEY (SupplierID) REFERENCES Supplier(ID)
);

-- הכנסת נתונים לטבלת Supplier
INSERT INTO Supplier (ID, AgentName, CompanyName, NumberPhone)
VALUES 
(123456789, 'David', 'Fresh Market Ltd', '0521234567'),
(987654321, 'Sarah', 'Best Goods Inc', '0549876543'),
(567890123, 'Michael', 'Organic Supplies', '0534567890'),
(654321987, 'Rachel', 'Super Foods', '0551122334'),
(112233445, 'Tom', 'Wholesale Ltd', '0529988776');

-- הכנסת נתונים לטבלת OrderType
INSERT INTO OrderType (ProductName, SumP, OStatus, SupplierID)
VALUES 
('Milk', 200, 'Open', 123456789),
('Bread', 150, 'Approve', 123456789),
('Eggs', 300, 'Process', 987654321),
('Chocolate', 100, 'Open', 567890123),
('Juice', 250, 'Open', 654321987);

-- הכנסת נתונים לטבלת Good
INSERT INTO Good (ProductName, PricePerItem, MinimumQuantityForOrder, SupplierID)
VALUES 
('Milk', 5.50, 10, 123456789),
('Bread', 3.20, 20, 987654321),
('Eggs', 10.00, 30, 567890123),
('Chocolate', 7.75, 5, 654321987),
('Juice', 8.50, 15, 112233445);
