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
DROP TABLE IF EXISTS Good;
DROP TABLE IF EXISTS OrderType;
DROP TABLE IF EXISTS Supplier;
DROP TABLE IF EXISTS StoreOwnerInventory;
DROP TABLE IF EXISTS Product;


CREATE TABLE Supplier (
    ID INT PRIMARY KEY,  
    AgentName VARCHAR(20),
    CompanyName VARCHAR(100) NOT NULL,  
    NumberPhone VARCHAR(15)
);


CREATE TABLE Product (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    ProductName VARCHAR(50) NOT NULL
);

CREATE TABLE OrderType (
    ID INT IDENTITY(1,1) PRIMARY KEY,  
    ProductID INT NOT NULL,  
    SumP INT NOT NULL,  
    OStatus VARCHAR(50) NOT NULL,
    SupplierID INT,  
	FOREIGN KEY (ProductID) REFERENCES Product(ID),
    FOREIGN KEY (SupplierID) REFERENCES Supplier(ID)
);

CREATE TABLE Good (
    ID INT IDENTITY(1,1) PRIMARY KEY,  
	ProductID INT NOT NULL,
    PricePerItem DECIMAL(10,2) NOT NULL,  
    MinimumQuantityForOrder INT ,
    SupplierID INT NOT NULL,  
	FOREIGN KEY (ProductID) REFERENCES Product(ID),
    FOREIGN KEY (SupplierID) REFERENCES Supplier(ID)
);

CREATE TABLE StoreOwnerInventory (
    ID INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT NOT NULL,
    DesiredQuantity INT NOT NULL,
    CurrentQuantity INT NOT NULL,
	FOREIGN KEY (ProductID) REFERENCES Product(ID),
);
 --הכנסת נתונים לטבלת Supplier
INSERT INTO Supplier (ID, AgentName, CompanyName, NumberPhone)
VALUES 
(123456789, 'David', 'Fresh Market Ltd', '0521234567'),
(987654321, 'Sarah', 'Best Goods Inc', '0549876543'),
(567890123, 'Michael', 'Organic Supplies', '0534567890'),
(654321987, 'Rachel', 'Super Foods', '0551122334'),
(112233445, 'Tom', 'Wholesale Ltd', '0529988776');

INSERT INTO Product (ProductName)
VALUES 
('Milk'),
('Bread'),
('Eggs'),
('Chocolate'),
('Juice');
-- הכנסת נתונים לטבלת OrderType
INSERT INTO OrderType (ProductID, SumP, OStatus, SupplierID)
VALUES 
(1, 200, 'Open', 123456789),
(1, 150, 'Approve', 123456789),
(2, 300, 'Process', 987654321),
(3, 100, 'Open', 567890123),
(4, 250, 'Open', 654321987);

-- הכנסת נתונים לטבלת Good
INSERT INTO Good (ProductId, PricePerItem, MinimumQuantityForOrder, SupplierID)
VALUES 
(1, 5.50, 10, 123456789),
(2, 3.20, 20, 987654321),
(3, 10.00, 30, 567890123),
(4, 7.75, 5, 654321987),
(5, 8.50, 15, 112233445);

-- הכנסת נתונים לטבלת StoreOwnerInventory
INSERT INTO StoreOwnerInventory (ProductId, DesiredQuantity, CurrentQuantity)
VALUES 
(1, 25, 30),
(2, 20, 20),
(3, 50, 60),
(4,10 ,17),
(5, 15, 20);

