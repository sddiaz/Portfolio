using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
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
using System.Windows.Threading;

public class Brushes
{
    #region nitty gritty
    public LinearGradientBrush blueBrush = new LinearGradientBrush();
	public LinearGradientBrush redBrush = new LinearGradientBrush();
	public GradientStop firstStop = new GradientStop();

    blueBrush.StartPoint = new System.Windows.Point(0,0);
    blueBrush.EndPoint = new System.Windows.Point(1, 1);
    blueBrush.GradientStops = new GradientStopCollection(2);
    firstStopBlue.Color = (Color) ColorConverter.ConvertFromString("#72F2EB");
    secondStopBlue.Color = (Color) ColorConverter.ConvertFromString("Black");
    firstStopBlue.Offset = 0.1; 
    secondStopBlue.Offset = 0.5; 
    blueBrush.GradientStops.Add(firstStopBlue);
    blueBrush.GradientStops.Add(secondStopBlue); 
	#endregion
	public Brushes(int blueBrushCode = 0)
	{
		blueBrush.StartPoint = new System.Windows.Point(0, 0);
		blueBrush.EndPoint = new System.Windows.Point(1, 1);
		blueBrush.GradientStops = new GradientStopCollection(2);
	} 
	public Brushes(int redBrushCode = 1)
    {

    }
	public string myString { get; set; }

}
