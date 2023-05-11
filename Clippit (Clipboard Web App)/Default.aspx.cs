using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Dapper;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using Testing.Models;

namespace Testing
{
    public partial class _Default : Page
    {
    protected void Page_Load(object sender, EventArgs e)
    {
    }

    public void GetCode_Click(object sender, EventArgs e)
    {
        // if the user didn't enter anything useful, don't bother continuing. 
        if (String.IsNullOrWhiteSpace(copyBox.Text))
        {
            ScriptManager.RegisterClientScriptBlock(Page, Page.GetType(), "alertMessage", "alert('" + "Please enter something first" + "')", true);
        }
        else
        {
            // Generate a Random Password for the user
            int currentPass = GenerateRandNumber();
            // Grab the user's text
            string userInfo = copyBox.Text;
            // Initial check to see if that random password already exists
            User checkForUsers = new User().getUserbyPass(currentPass);
            while (checkForUsers != null) // generate a new code until we find one that doesn't exist
            {
                currentPass = GenerateRandNumber();
                User tryAgain = new User().getUserbyPass(currentPass);
                // If the password we tried is NOT being used ... 
                if (tryAgain == null)
                {
                    // ... Exit the loop. 
                    checkForUsers = null; 
                }
            }
            // Once we find a unique code, add the user (password and info) to the database
            var newUser = new User().CreateUser(currentPass, userInfo);
            codeLabel.Text = "Your Code Is: " + currentPass.ToString(); 
            codeLabel.Visible = true;
        }
    }
    public void EnterCode(object sender, EventArgs e)
        {
        var myCode = userCodeHere.Value.ToString();
        // If there are not 4 digits (required password length), throw an error
        if (myCode.Count() != 4)
            {
            ScriptManager.RegisterClientScriptBlock(Page, Page.GetType(), "alertMessage", "alert('" + "Your code must be 4 digits" + "')", true);
            }
        // If there are characters OTHER than digits, throw an error. 
        else if (!myCode.All(c => c >= '0' && c <= '9'))
            {
            ScriptManager.RegisterClientScriptBlock(Page, Page.GetType(), "alertMessage", "alert('" + "Your code must only contain digits." + "')", true);
            }
        else
            {
            // Try to grab the right user's information
            var currentUser = new User().getUserbyPass(Int32.Parse(myCode));
            // If the code doesn't match any in the database, throw an error
            if (currentUser == null)
                {
                ScriptManager.RegisterClientScriptBlock(Page, Page.GetType(), "alertMessage", "alert('" + "This code could not be found in our database." + "')", true);
                }
            // Otherwise, display it
            else
                {
                    pasteBox.Text = currentUser.UserInfo;
                }
            }
        }
        public int GenerateRandNumber() // Generate UserP
            {
                int _min = 1000;
                int _max = 9999;
                Random _rdm = new Random();
                return _rdm.Next(_min, _max);
            }
    }
}