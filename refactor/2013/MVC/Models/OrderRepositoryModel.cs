using System.Collections.Generic;

namespace MVC.Models
{
	/// <summary>
	/// Order repository model.
	/// </summary>
    public class OrderRepositoryModel
    {
        public IList<Order> orders;
    }

	/// <summary>
	/// Order repository.
	/// </summary>
    public class OrderRepository : OrderRepositoryModel
    {
		/// <summary>
		/// Initializes a new instance of the <see cref="MVC.Models.OrderRepository"/> class.
		/// </summary>
        public OrderRepository()
        {
            this.orders = new List<Order>();                 
        }     

		/// <summary>
		/// Save the specified order.
		/// </summary>
		/// <param name="order">Order.</param>
        public void Save(Order order)
        {
            var order_count = orders.Count;
            order.id = order_count + 1;
            this.orders.Add(order);                 
        }

		/// <summary>
		/// Gets all.
		/// </summary>
		/// <returns>The all.</returns>
        public IList<Order> GetAll()
        {
            return this.orders;
        } 
    }
}