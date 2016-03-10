namespace MVC.Models
{
	/// <summary>
	/// Order item model.
	/// </summary>
    public class OrderItemModel : ItemModel
    {
        public int quantity { get; set; }
    }

	/// <summary>
	/// Order item.
	/// </summary>
    public class OrderItem : OrderItemModel
    {
		/// <summary>
		/// Initializes a new instance of the <see cref="MVC.Models.OrderItem"/> class.
		/// </summary>
        public OrderItem()
        {
        }
    }
}