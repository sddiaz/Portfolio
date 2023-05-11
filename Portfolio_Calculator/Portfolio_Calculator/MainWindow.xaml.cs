using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Threading;
namespace Portfolio_Calculator
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        #region Globals 
        public List<Decimal> Operands = new List<Decimal>();
        public List<Decimal> previousAnswers = new List<Decimal>();
        public char currentOperation;
        public char lastOperation;
        public int operationCount = 0;
        public int expressionCount = 0;
        #endregion
        public MainWindow()
        {
            InitializeComponent();
            timer();

            #region Proportionality relative to Screen
            if (SystemParameters.PrimaryScreenWidth == 2560)
            {
                moon.HorizontalAlignment = HorizontalAlignment.Right;
                moon.VerticalAlignment = VerticalAlignment.Center;
                sun.HorizontalAlignment = HorizontalAlignment.Left;
                sun.VerticalAlignment = VerticalAlignment.Center;
            }
            else
            {
                divide.FontSize = 40;
                plusMinus.FontSize = 30;
                percent.FontSize = 30; 
            }
            double buttonSize = SystemParameters.PrimaryScreenWidth * 0.04; 
            GridLengthConverter myConverter = new GridLengthConverter(); 
            this.Height = SystemParameters.PrimaryScreenHeight * 0.82;
            this.Width = SystemParameters.PrimaryScreenWidth * 0.22;
            darkModeGrid.Height = SystemParameters.PrimaryScreenHeight * 0.03;
            darkModeGrid.Width = SystemParameters.PrimaryScreenWidth * 0.035;
            this.mainGrid.RowDefinitions[0].Height = (GridLength)myConverter.ConvertFromString((SystemParameters.PrimaryScreenHeight * 0.32).ToString());
            this.mainGrid.RowDefinitions[1].Height = (GridLength)myConverter.ConvertFromString((SystemParameters.PrimaryScreenHeight * 0.47).ToString());
            #endregion
        }

        #region Timer
        // This is the clock in the top left of the design
        public void timer()
        {
            DispatcherTimer timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromSeconds(1);
            timer.Tick += timer_Tick;
            timer.Start();
        }

        void timer_Tick(object sender, EventArgs e)
        {
            timeLabel.Content = DateTime.Now.ToString("h:mm");
        }
        #endregion

        #region Operators
        // Clears content
        private void AC_Click(object sender, RoutedEventArgs e)
        {
        // If there is any content.. go ahead and clear it. This includes variables too. 
            if (numberLabel.Content != null && numberLabel.Content.ToString() != string.Empty)
            {
                // Clear entries, reset operator count. 
                numberLabel.Content = "";
                Operands.Clear();
                operationCount = 0;
            }
        }

        // Changes sign
        private void plusMinus_Click(object sender, RoutedEventArgs e)
        {
            // If our expression isn't null (to start with). 
            if (numberLabel.Content != null && numberLabel.Content.ToString() != string.Empty)
            {
            // Grab the string we are looking at 
                string currentString = numberLabel.Content.ToString(); // Easier on the eyes.
                // If there is an operand already, we'll need another operand for which to change it's sign. 
                if (Operands.Count == 1 && currentString[currentString.Count() - 1] == ' ')
                    {
                        MessageBox.Show("Please input a number first.");
                    }
                    // If there is already a negative sign.. 
                    else if (currentString.ElementAt(0) != '-')
                    {
                    // If there is only 1 number
                        if (Operands.Count == 0)
                        {
                        // Flip the sign of the first number. 
                            numberLabel.Content = currentString.Insert(0, "-");
                        }
                        // else if there is 2 numbers, flip the sign of the second. 
                        else if (Operands.Count == 1 && currentOperation != null)
                        {
                            flip2ndSign(); 
                        }
                        // Don't just flip the sign text-wise, but change the integer value of the number to negative. 
                        else if (Operands.Count == 1)
                        {
                            Operands[0] = Operands[0] * -1;
                        }
                    }
                    else
                    {
                    // If there is already a negative sign, and only 1 number, remove the negative sign. 
                        if (Operands.Count == 0)
                        {
                            numberLabel.Content = currentString.Replace("-", "");
                        }
                   // If there is already a negative sign, and 2 numbers, remove the negative sign from the second operand. 
                        else
                        {
                            flip2ndSign();
                        }
                    }
            }
            else if (Operands.Count == 0)
            {
                MessageBox.Show("Please input a number first.");
            }
        }

        // Divides by 100
        private void percent_Click(object sender, RoutedEventArgs e)
        {
        // If there's numbers on the screen.. do the following
            if (numberLabel.Content != null && numberLabel.Content.ToString() != string.Empty)
            {
                // If we're dealing with two numbers at once, divive the last one. 
                if (Operands.Count > 0)
                {
                    numberLabel.Content = Operands.ElementAt(Operands.Count - 1) / 100;
                }
                // Else simply divide the first one
                else
                {
                    numberLabel.Content = Decimal.Parse(numberLabel.Content.ToString()) / 100;

                }
            }
            else
            {
                MessageBox.Show("Please input a number first.");
            }
        }

        // Spits out answer
        private void enter_Click(object sender, RoutedEventArgs e)
        {
        // Make sure we have something to work with. 
            if (numberLabel.Content != null && numberLabel.Content.ToString() != string.Empty)
            {
                try
                {
                // Read the text on the screen, we should have two numbers (operands) and an operation sign. 
                // Perform a calculation based on the data we have, and clear our current statement / operands / operation. Then display the answer above the main line. 
                    var currentString = numberLabel.Content.ToString();
                    Decimal secondNumber = Decimal.Parse(currentString.Substring(currentString.LastIndexOf(' ') + 1));
                    // Everything after the LAST space will be our next number.
                    Operands.Add(secondNumber);
                    // Populate both texts. (Alternating last expression color);  
                    numberLabel.Content = performCalculation(Operands[Operands.Count - 2], Operands[Operands.Count - 1], currentOperation.ToString());
                    if (expressionCount % 2 == 0)
                    {
                        previousExpressionLabel.Foreground = makeBrush((Color)ColorConverter.ConvertFromString("#72F2EB"), (Color)ColorConverter.ConvertFromString("Black"), 0.1, 1.5);
                    }
                    else
                    {
                        previousExpressionLabel.Foreground = makeBrush((Color)ColorConverter.ConvertFromString("#BD2A2E"), (Color)ColorConverter.ConvertFromString("Black"), 0.1, 1.5); ;
                    }
                    previousExpressionLabel.Content = numberLabel.Content; // previous expression 
                    Operands.Clear();
                    operationCount = 0;
                    expressionCount++;
                }
                // Not enough operands (need 2)
                catch
                {
                    MessageBox.Show("You need two operands to perform an operation.");
                }
            }
                // Not enough operands (need 2)
            else
            {
                MessageBox.Show("You need two operands to perform an operation.");

            }
        }

        // We need at least one number before we can click the operation button. 
        // All we are doing here is parsing the string to find the operation, and saving that operation as a string. 
        private void operationClick(object sender, RoutedEventArgs e)
        {
            // Check to see if we have any numbers first. 
            if (numberLabel.Content == null || numberLabel.Content.ToString() == string.Empty)
            {
                MessageBox.Show("You need a number first"); 
            }
            else
            {
                char lastElement = numberLabel.Content.ToString()[numberLabel.Content.ToString().Length - 1];
                currentOperation = sender.ToString()[sender.ToString().Length - 1];
                // If the last element is already an operation element, simply replace it. 
                if (lastElement == ' ')
                {
                    numberLabel.Content = numberLabel.Content.ToString().Replace(lastOperation, currentOperation);
                }
                // Otherwise, add the last number to our list. 
                else
                {
                    // If we have more than one operator, replace it (we can only have one).
                    if (operationCount > 0)
                    {
                        numberLabel.Content = numberLabel.Content.ToString().Replace(lastOperation, currentOperation); 
                    }
                    else
                    {
                        try
                        {
                            Operands.Add(Decimal.Parse(numberLabel.Content.ToString()));
                            numberLabel.Content += " " + currentOperation + " ";
                        }
                        catch (Exception exc)
                        {
                            MessageBox.Show(exc.Message); 
                        }
                    }
                }
                lastOperation = currentOperation;
                operationCount++;
            }
        }
        // This is the easy part, take our current operands and operation and perform the calculation. 
        public string performCalculation(Decimal firstNumber, Decimal secondNumber, string operation)
        {
            // Initialize our answer variable. 
            Decimal answer = 0; 
            // Operation Switch
            switch (operation) {
                case "+":
                    answer = firstNumber + secondNumber;
                    break; 
                case "−":
                    answer = firstNumber - secondNumber;
                    break;
                case "×":
                    answer = firstNumber * secondNumber;
                    break;
                case "÷":
                    answer = firstNumber / secondNumber;
                    break;
            }
            // Add to our answer history (used for back button) 
            previousAnswers.Add(answer); 
            return answer.ToString();
        }
        // Function to flip the sign of the second operand. 
        public void flip2ndSign()
        {
            string currentString = numberLabel.Content.ToString(); // Easier on the eyes. 
            int lastSpace = currentString.LastIndexOf(" ");
            // if the last number is negative, make positive. 
            if (currentString[currentString.LastIndexOf(" ") + 1].ToString() == "-")
            {
                string newString = "";
                newString = currentString.Remove(currentString.LastIndexOf(" ") + 1, 1);
                numberLabel.Content = newString;
            }
            // if last number is positive, make it negative. 
            else
            {
                string newString = currentString.Insert(lastSpace, " -");
                newString = newString.Remove(newString.LastIndexOf(" "), 1);
                numberLabel.Content = newString;
            }
        }

        // Create brush (cosmetic only) 
        public LinearGradientBrush makeBrush(Color color1, Color color2, double offset1, double offset2)
        {
            LinearGradientBrush myBrush = new LinearGradientBrush();
            GradientStop stop1 = new GradientStop();
            GradientStop stop2 = new GradientStop();
            myBrush.StartPoint = new Point(0, 0); 
            myBrush.EndPoint = new Point(1, 1);
            stop1.Color = color1;
            stop2.Color = color2;
            stop1.Offset = offset1;
            stop2.Offset = offset2;
            myBrush.GradientStops.Add(stop1);
            myBrush.GradientStops.Add(stop2); 
            return myBrush; 
        }
        #endregion

        #region Numpad
        // Add whatever was clicked to our current expression (when applicable)
        private void NumPad_Click(object sender, RoutedEventArgs e)
        {
            numberLabel.Content += sender.ToString()[sender.ToString().Length - 1].ToString();
        }
        private void dot_Click(object sender, RoutedEventArgs e)
        {
            // Decimal Point Logic
            if (numberLabel.Content == null)
            {
                numberLabel.Content += ".";
            }
            else
            {
                string currentString = numberLabel.Content.ToString();
                if (Operands.Count == 1)
                {
                   if (Operands.ElementAt(0).ToString().Contains("."))
                    {
                        if (currentString.Count(x => x == '.') < 1)
                        {
                            numberLabel.Content += ".";
                        }
                    }
                   else if (currentString.Count(x => x == '.') < 1)
                    {
                        numberLabel.Content += ".";
                    }
                }
                else
                {
                    if (currentString.Count(x => x == '.') < 1)
                    {
                        numberLabel.Content += ".";
                    }
                }
            }

        }
        private void redo_Click(object sender, RoutedEventArgs e)
        {
            // Use this to return the latest answer. 
            if (previousAnswers.Count != 0)
            {
                numberLabel.Content = previousAnswers[previousAnswers.Count - 1]; // answer
            }
        }

        #endregion

        #region Extras
        private void darkMode_Click(object sender, RoutedEventArgs e)
        {
            // If dark, turn to light. Else turn to dark. 
            if (Properties.Settings.Default.ColorModes == "Dark")
            {
                Properties.Settings.Default.ColorModes = "Light";
                darkModeGrid.Background = (SolidColorBrush)new BrushConverter().ConvertFrom("#f7f7f7");
                BottomGrid.Background = (SolidColorBrush)new BrushConverter().ConvertFrom("#f9f9f9");
                
            }
            else
            {
                Properties.Settings.Default.ColorModes = "Dark";
                darkModeGrid.Background = (SolidColorBrush)new BrushConverter().ConvertFrom("#292d36");
                BottomGrid.Background = (SolidColorBrush)new BrushConverter().ConvertFrom("#292d36");
            }


        }
        // Allows window to be dragged / moved
        protected override void OnMouseLeftButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseLeftButtonDown(e);

            // Begin dragging the window
            this.DragMove();
        }
        // Exits the program
        private void exit_Click(object sender, RoutedEventArgs e)
        {
            Environment.Exit(0); 
        }
        #endregion
    }
}
