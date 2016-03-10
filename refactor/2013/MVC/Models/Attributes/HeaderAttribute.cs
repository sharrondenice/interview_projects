using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MVC.Models.Attributes
{
    abstract class HeaderAttribute : System.Attribute
    {
        public readonly string Title;
        public readonly int Order;

        public HeaderAttribute(string title, int order)
        {
            this.Title = title;
            this.Order = order;
        }
    }
}