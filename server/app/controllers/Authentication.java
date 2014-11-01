package controllers;

import play.*;
import play.mvc.*;
import models.*;
import views.html.*;

public class Authentication extends Controller {

  public static Result authenticate() {
    User member = new User("kasif.gilbert@gmail.com", "password");
    member.save();
    return ok("Success");
  }
}
