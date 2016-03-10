using System.Collections.Generic;

namespace MVC.Models
{
	/// <summary>
	/// Order model.
	/// </summary>
    public class OrderModel
    {
        public long id { get; set; }
        public IList<OrderItem> items { get; set; }
    }

	/// <summary>
	/// Order.
	/// </summary>
    public class Order : OrderModel
    {
		/// <summary>
		/// Initializes a new instance of the <see cref="MVC.Models.Order"/> class.
		/// </summary>
        public Order()
        {
            this.items = new List<OrderItem>();
        }
    }
}