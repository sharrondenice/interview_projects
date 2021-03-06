﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using MVC.Models;

namespace MVC.Controllers
{
	/// <summary>
	/// Order controller.
	/// </summary>
    public class OrderController : Controller
    {
		/// <summary>
		/// Index this instance.
		/// </summary>
        public ActionResult Index()
        {
            var items = Item.LoadItems();

            ViewData["items"] = items;
            Session["order_items"] = new List<OrderItemModel>();

            return View();
        }

		/// <summary>
		/// Views the past orders.
		/// </summary>
		/// <returns>The past orders.</returns>
        public ActionResult ViewPastOrders()
        {
            return View("PastOrders");
        }

		/// <summary>
		/// Save the specified order_items.
		/// </summary>
		/// <param name="order_items">Order_items.</param>
        [HttpPost]
        public JsonResult Save(IList<OrderItemModel> order_items)
        {
            //Save Order
            var order_repository = (OrderRepository)System.Web.HttpContext.Current.Application["order_repository"];
            var order = new Order();

            foreach (var order_item in order_items)
            {
                var item = new OrderItem {id = order_item.id, quantity = order_item.quantity, price = order_item.price};
                order.items.Add(item);
            }

            order_repository.Save(order);

            //Send email
            MailMessage email = new MailMessage("peter@initech.com","ordering@initech.com");
            email.Subject = "Order submitted";

            SmtpClient client = new SmtpClient("localhost");

            try
            {
                client.Send(email);
            }
            catch(Exception exception)
            {
                //It is ok that it doesn't actually send the email for this project    
            }

            return Json(order, JsonRequestBehavior.AllowGet);
        }

		/// <summary>
		/// Gets the orders.
		/// </summary>
		/// <returns>The orders.</returns>
        [HttpGet]
        public JsonResult GetOrders()
        {
            var order_repository = (OrderRepository)System.Web.HttpContext.Current.Application["order_repository"];
            var orders = order_repository.GetAll();

            return Json(orders, JsonRequestBehavior.AllowGet);
        }

		/// <summary>
		/// Gets the products.
		/// </summary>
		/// <returns>The products.</returns>
        [HttpGet]
        public JsonResult GetProducts()
        {
            var items = Item.LoadItems();

            return Json(items, JsonRequestBehavior.AllowGet);
        }
    }
}
