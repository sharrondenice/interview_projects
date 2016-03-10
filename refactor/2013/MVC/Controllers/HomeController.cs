using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC.Controllers
{
    /// <summary>
    /// Home controller.
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// Index this instance.
        /// </summary>
        public ActionResult Index()
        {
            return View();
        }

    }
}
