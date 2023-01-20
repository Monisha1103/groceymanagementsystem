package com.example.springboot;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.models.AdminLogin;
import com.example.springboot.models.AdminSignUp;
import com.example.springboot.models.ApiResponse;
import com.example.springboot.models.GroceryItem;
import com.example.springboot.models.GroceryListResponse;
import com.microsoft.sqlserver.jdbc.SQLServerDriver;

@RestController
public class GroceryController {
    
    @PostMapping
    @RequestMapping("api/AdminLogin")
    public ApiResponse SignIn(AdminLogin adminLogin)
    {
        ApiResponse response = new ApiResponse();
        try
        {
            Class.forName("com.mysql.jdbc.Grocery");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/dbname","root","root");
            //here dbname is database name, root is username and password
            
            Statement stmt=con.createStatement();  
            ResultSet rs=stmt.executeQuery("select Mobile, Password from AdminLogin");  
            while(rs.next()){
            String mobile = rs.getString("mobile");
            String password = rs.getString("password");
            }
            con.close();
            response.Message = "please check credentials";
            return response;
        }
        catch (Exception ex)
        {
            response.Message = ex.getMessage();
            return response;
        }
    }

    @PostMapping
    @RequestMapping("api/AdminSignUp")    
    public String SignUp(AdminSignUp adminSignUp)
    {
        try
        {
            Class.forName("com.mysql.jdbc.Driver");  
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/dbname","root","root");  
            //here dbname is database name, root is username and password  
            Statement stmt = con.createStatement();  
            ResultSet rs = stmt.executeQuery("INSERT INTO AdminLogin(Name,Email,Password,Address,Mobile,created_by,Created_date,IsActive)" + "VALUES('" + adminSignUp.Name + "', '" + adminSignUp.Email + "', '" + adminSignUp.Password + "', '" + adminSignUp.Address + "', '" + adminSignUp.Mobile + "', '" + adminSignUp.Created_by + "', '" + LocalDateTime.now().toString() + "', 1"+")");  
            while(rs.next()) 
            con.close();
            return "Admin details added sucessfully";
        }
        catch(Exception ex)
        {
            return ex.getLocalizedMessage();
        }
    }
    @PostMapping
    @RequestMapping("api/AddItem")
    public ApiResponse Additem(GroceryItem groceryItem)
    {
        ApiResponse response = new ApiResponse();
        try
        {
            Class.forName("com.mysql.jdbc.Grocery");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/dbname","root","root");
            //here dbname is database name, root is username and password
            
            Statement stmt=con.createStatement();  
            ResultSet rs=stmt.executeQuery("INSERT INTO GroceryData (GroceryName, Price, Type, img) SELECT '" + groceryItem.GroceryName+"',"+groceryItem.Price+", '"+groceryItem.Type+"', BulkColumn FROM Openrowset(Bulk '"+groceryItem.Image+"', Single_Blob) as Logo");  
            while(rs.next())
            con.close();
            response.Message = "Item added";
            return response;
        }
        catch(Exception ex)
        {
            response.Message = ex.getLocalizedMessage();
            return response;
        }
    }

    @PostMapping
    @RequestMapping("api/DeleteItem")
    public ApiResponse DeleteItem(Integer itemId)
    {
        ApiResponse response = new ApiResponse();
        try
        {
            Class.forName("com.mysql.jdbc.Grocery");
            Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/dbname","root","root");
            //here dbname is database name, root is username and password
            
            Statement stmt=con.createStatement();
            String selectQuery = "select GroceryId from GroceryData where GroceryId = "+itemId;
            ResultSet rs=stmt.executeQuery(selectQuery);  
            while(rs.next())
            {
                response.Message = "The item does not exist.";
                return response;
            }

            String deleteQuery = "DELETE FROM GroceryData WHERE GroceryId = "+itemId;
            stmt.executeQuery(deleteQuery); 
            response.Message = "Item deleted";
            con.close();
            return response;
        }
        catch (Exception ex)
        {
            response.Message = ex.getLocalizedMessage();
            return response;
        }
    }

    @GetMapping
    @RequestMapping("api/getCategory")
    public GroceryListResponse GetGrocery()
    {
        GroceryListResponse response = new GroceryListResponse();
        List<GroceryItem> groceryItemList = new ArrayList<GroceryItem>();
        try
        {
            
            //Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String dbURL = "jdbc:sqlserver://SYNCLAPN24735;databaseName=hospital";
            String user = "sa";
            String pass = "sa@1234";
            //Driver driver = (Driver) new com.microsoft.sqlserver.jdbc.SQLServerDriver();
            //DriverManager.registerDriver(driver);
            DriverManager.registerDriver((Driver) new SQLServerDriver());
            Connection con = DriverManager.getConnection(dbURL, user, pass);
            //Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/dbname","root","root");
            //here dbname is database name, root is username and password
            
            Statement stmt=con.createStatement();
            String selectQuery = "select * from GroceryData";
            ResultSet rs=stmt.executeQuery(selectQuery);
            while(rs.next())
            {
                GroceryItem groceryItem = new GroceryItem();
                groceryItem.Id = Integer.parseInt(rs.getString("GroceryId"));
                groceryItem.GroceryName = rs.getString("GroceryName");
                groceryItem.Price = rs.getDouble("Price");
                groceryItem.Type = rs.getString("Type");
                byte[] encodeImg = Base64.getEncoder().encode(rs.getString("img").getBytes());
                groceryItem.Image = "data:image/png;base64, " + new String(encodeImg);
                groceryItemList.add(groceryItem);
            }
            response.groceryItems = groceryItemList;
            //response.Message = "Data returned for the requested sub cateroy";
            return response;
        }
        catch(Exception ex)
        {
            //response.Message = ex.getLocalizedMessage();
            return response;
        }
    }
    @GetMapping
    @RequestMapping("api/sample")
    public GroceryListResponse Sample()
    // access_modifier return_type method_name
    {
        //items.add(new GroceryItem( Id = 1, GroceryName = "chips", Type ="snacks", Price=20.0));
        GroceryListResponse response = new GroceryListResponse();
        try
        {
            List<GroceryItem> groceryItemList = new ArrayList<GroceryItem>();
            GroceryItem groceryItem = new GroceryItem();
            groceryItem.Id = 1;
            groceryItem.Type = "snacks";
            groceryItem.Price = 20.0;
            groceryItem.GroceryName = "potato chips";
            // in the above API these values are getting from DB
            groceryItemList.add(groceryItem);
            response.groceryItems = groceryItemList;
            return response;
        }
        catch(Exception ex)
        {
            throw ex;
        }
    }
}
