using System;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Data.SqlClient;

using SQL_Connection = Microsoft.Data.SqlClient.SqlConnection;
namespace SchedulePrototype.Models
{
    public static class SqlDataAccess
    {
        public static string GetConnectionString(string connectionName = "ScheduleDB")
        {
            return ConfigurationManager.ConnectionStrings[connectionName].ConnectionString;
        }
        public static List<T> LoadData<T>(string sql)
        {
            using (IDbConnection cnn = new SQL_Connection(GetConnectionString()))
            {
                return cnn.Query<T>(sql).ToList();
            }
        }
        public static int SaveData<T>(string sql, T data)
        {
            using (IDbConnection cnn = new SQL_Connection(GetConnectionString()))
            {
                return cnn.Execute(sql, data);
            }
        }
    }
}
