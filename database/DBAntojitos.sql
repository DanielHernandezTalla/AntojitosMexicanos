
CREATE TABLE tblProduct(
	idProduct INT PRIMARY KEY NOT NULL,
	nameProduct varchar(50) NOT NULL,
	descriptionProduct VARCHAR(50),
	precio INT NOT NULL, 
	imageURL VARCHAR(50), 
	imageSRC VARCHAR(50),
	specifications VARCHAR(50)
)

CREATE TABLE tblSection(
	idSection INT PRIMARY KEY NOT NULL,
	title VARCHAR(50) NOT NULL,
	position INT NOT NULL
)

CREATE TABLE tblSectionXProduct(
	idSection INT FOREIGN KEY REFERENCES tblSection(idSection),
	idProduct INT FOREIGN KEY REFERENCES tblProduct(idProduct)
)

go

CREATE VIEW vwProductsBySection
AS
	select s.title, s.position, p.idProduct, p.nameProduct, p.descriptionProduct, p.precio, p.imageURL, p.imageSRC
		from tblSection s join tblSectionXProduct sp
			on s.idSection = sp.idSection join tblProduct p
			on p.idProduct = sp.idProduct

go

CREATE TABLE tblOrderClient(
	idOrderClient INT PRIMARY KEY NOT NULL,
	nameClient VARCHAR(50) NOT NULL,
	noteClient VARCHAR(255),
	fecha DATE NOT NULL,
)

CREATE TABLE detOrderClient(
	idOrderClient INT FOREIGN KEY REFERENCES tblOrderClient(idOrderClient),
	idProduct INT FOREIGN KEY REFERENCES tblProduct(idProduct),
	quantity TINYINT NOT NULL,
	precio MONEY NOT NULL,
	subTotal MONEY NOT NULL,
	specifications VARCHAR(50)
)

ALTER PROCEDURE [dbo].[spINSOrderClient](
	@nameClient VARCHAR(50),
	@noteClient VARCHAR(255)
)
AS	
BEGIN 
	
	DECLARE @idOrderClient INT 
	SELECT @idOrderClient = IIF(MAX(idOrderClient) IS NULL, 1, MAX(idOrderClient) +1) FROM tblOrderClient
	
	INSERT INTO tblOrderClient VALUES(
		@idOrderClient,
		@nameClient,
		@noteClient,
		GETDATE()
	)

	SELECT @idOrderClient[idOrder]

END

CREATE PROCEDURE spINSdetOrderClient(
	@idOrderClient INT,
	@idProduct INT,
	@quantity TINYINT,
	@specifications varchar(50)
)
AS	
BEGIN 
	
	DECLARE @precio MONEY
	SELECT @precio = precio FROM tblProduct
	WHERE idProduct = @idProduct

	INSERT INTO detOrderClient VALUES(
		@idOrderClient,
		@idProduct,
		@quantity,
		@precio,
		@quantity * @precio,
		@specifications
	)

END