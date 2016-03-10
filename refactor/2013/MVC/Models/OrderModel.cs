using System.Collections.Generic;

namespace MVC.Models
{
    public class OrderModel
    {
        public long id { get; set; }
        public IList<OrderItem> items { get; set; }
    }

    public class Order : OrderModel
    {
        public Order()
        {
            this.items = new List<OrderItem>();
        }
    }
}