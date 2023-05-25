using SchedulePrototype.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;

namespace SchedulePrototype
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            List<Cable> myList = SchedulePrototype.Models.Cable.GetCables();
            CableTable.ItemsSource = myList;
        }

        #region Table Functions
        private void CableTable_CellEditEnding(object sender, DataGridCellEditEndingEventArgs e)
        {
            if (e.EditAction == DataGridEditAction.Commit && CableTable != null)
            {
                // Get the edited value
                var newValue = ((TextBox)e.EditingElement).Text;

                // Get the Cable object that corresponds to the edited row
                var cable = e.Row.Item as Cable;

                // Update the appropriate property based on the edited column
                switch (e.Column.Header)
                {
                    case "EquipmentID":
                        cable.EquipmentID = newValue;
                        break;
                    case "Source":
                        cable.Source = newValue;
                        break;
                    case "Destination":
                        cable.Destination = newValue;
                        break;
                    case "Load":
                        cable.Load = newValue;
                        break;
                    case "VoltageLevel":
                        cable.VoltageLevel = newValue;
                        break;
                    case "InsulationType":
                        cable.InsulationType = newValue;
                        break;
                }

                // Call the UpdateCable method to save the changes to the database
                Cable.UpdateCable(cable.OtiID, cable);
                MessageBox.Show("Update Successful");
            }
        }
        private void CableTable_MouseEnter(object sender, MouseEventArgs e)
        {
            Mouse.OverrideCursor = Cursors.Hand;
        }
        private void CableTable_MouseLeave(object sender, MouseEventArgs e)
        {
            Mouse.OverrideCursor = null;
        }
        private void searchTxt_TextChanged(object sender, TextChangedEventArgs e)
        {
            if (CableTable != null)
            {
                string substring = searchTxt.Text.ToLower();
                List<Cable> tempList = Cable.GetCables().Where(x => x.OtiID.ToLower().Contains(substring)).ToList();
                CableTable.ItemsSource = tempList;
            }
        }

        #endregion

        #region Button Events

        private void CreateBtn_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                Cable.CreateCable(otiIdTxt.Text, equipmentTxt.Text, sourceTxt.Text,
                destinationTxt.Text, loadTxt.Text, voltageTxt.Text, insulationTxt.Text);
                MessageBox.Show("Successfully added item to database");
                List<Cable> myList = SchedulePrototype.Models.Cable.GetCables();
                CableTable.ItemsSource = myList;
            }
            catch (Exception exc)
            {
                MessageBox.Show(exc.Message);
            }
        }
        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            if (CableTable.SelectedItems.Count != 0)
            {
                foreach (var v in CableTable.SelectedItems)
                {
                    Cable currentCable = v as Cable;
                    SchedulePrototype.Models.Cable.DeleteCable(currentCable.OtiID);
                }
                List<Cable> myList = SchedulePrototype.Models.Cable.GetCables();
                CableTable.ItemsSource = myList;
                MessageBox.Show("Successfully deleted selected item(s)");
            }
            else
            {
                MessageBox.Show("Please Select a Cable to remove.");
            }
        }
        private void ImportBtn_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Here we would import from our desired third party software...");
        }

        #endregion
    }
}
