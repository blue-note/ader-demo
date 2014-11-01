package controllers;

import play.*;
import play.mvc.*;
import models.*;
import views.html.*;

public class UsersController extends Controller {

  public static Result list() {
    return ok("Success");
  }

  public static Result getUser(Integer id) {
    return ok("Success" +  " " + id);
  }
}
