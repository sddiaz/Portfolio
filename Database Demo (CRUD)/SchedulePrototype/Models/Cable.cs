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
using SchedulePrototype;

namespace SchedulePrototype.Models
{
    public class Cable
    {
        public string OtiID { get; set; }
        public string EquipmentID { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string Load { get; set; }
        public string VoltageLevel { get; set; }
        public string InsulationType { get; set; }

        public Cable()
        {
            OtiID = null;
            EquipmentID = null;
            Source = null;
            Destination = null;
            Load = null; 
            VoltageLevel = null;
            InsulationType = null;
        }
        public Cable(string otiID, string equipmentID, string source, string destination, string load, string voltageLevel, string insulationType)
        {
            OtiID = otiID;
            EquipmentID = equipmentID;
            Source = source;
            Destination = destination;
            Load = load;
            VoltageLevel = voltageLevel;
            InsulationType = insulationType;
        }

        #region SQL Procedures

        // Create a new cable with basic info
        public static int CreateCable(string otiID, string equipmentID, string source, string destination, string load, string voltageLevel, string insulationType)
        {
            Cable data = new Cable
            {
                OtiID = otiID,
                EquipmentID = equipmentID,
                Source = source,
                Destination = destination,
                Load = load,
                VoltageLevel = voltageLevel,
                InsulationType = insulationType,
            };
            string sql = @"INSERT INTO dbo.Cable (OtiID, EquipmentID, Source, Destination, Load, VoltageLevel, InsulationType) 
                           VALUES (@OtiID, @EquipmentID, @Source, @Destination, @Load, @VoltageLevel, @InsulationType);";
            return SqlDataAccess.SaveData(sql, data);
        }
        // Get a list of all cables. 
        public static List<Cable> GetCables()
        {
            string sql = @"SELECT OtiID, EquipmentID, Source, Destination, Load, VoltageLevel, InsulationType
                           FROM dbo.Cable;";
            return SqlDataAccess.LoadData<Cable>(sql);
        }
        public static void DeleteCable(string OtiID)
        {
            string sql = @"DELETE FROM dbo.Cable WHERE OtiID = @OtiID;";
            SqlDataAccess.SaveData(sql, new { OtiID });
        }

        public static void UpdateCable(string otiID, Cable newCable)
        {
            string sql = @"UPDATE dbo.Cable 
                   SET EquipmentID = @EquipmentID, 
                       Source = @Source, 
                       Destination = @Destination, 
                       Load = @Load, 
                       VoltageLevel = @VoltageLevel, 
                       InsulationType = @InsulationType 
                   WHERE OtiID = @OtiID;";
            SqlDataAccess.SaveData(sql, new { OtiID = otiID, newCable.EquipmentID, newCable.Source, newCable.Destination, newCable.Load, newCable.VoltageLevel, newCable.InsulationType });
        }

        #endregion
    }
}
