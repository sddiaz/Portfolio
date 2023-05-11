using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using DataAccess;

namespace Testing.Models
{
    public class User
    {
        [Range(1000, 9999)]
        public int UserPass { get; set; }
        public string UserInfo { get; set; }
        public User()
        {
            UserPass = 123;
            UserInfo = "bruh";
        }
        #region SQL Procedures

        // Create a new user, passing in a password and their information. 
        public int CreateUser(int userPass, string userInfo)
        {
            User data = new User
            {
                UserPass = userPass,
                UserInfo = userInfo
            };

            string sql = @"INSERT INTO dbo.UserTable (UserPass, UserInfo) 
                           VALUES (@UserPass, @UserInfo);";
            return SqlDataAccess.SaveData(sql, data);
        }
        // Get a list of all users. 
        public List<User> GetUsers()
        {
            string sql = @"SELECT Id, UserPass, UserInfo
                           FROM dbo.UserTable;";
            return SqlDataAccess.LoadData<User>(sql);
        }
        // Get a single user based on their password. 
        public User getUserbyPass(int pass)
        {
            string sql = @"SELECT *
                           FROM dbo.UserTable
                           WHERE UserPass = " + pass + @";";
            var myUsers = SqlDataAccess.LoadData<User>(sql);
            return (myUsers.Count == 0) ? null : myUsers[0];
        }
        #endregion 
    }
}