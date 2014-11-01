package controllers;

import play.*;
import play.mvc.*;

import views.html.*;
import java.util.HashMap;

public class Application extends Controller {

  public static Result index() {
    String header = "Ader - Coming soon";
    return ok(index.render(header));
  }

  public static Result terms() {
    return ok(terms.render());
  }

  public static Result json() {
    HashMap<String, String> itWorks = new HashMap<String, String>();
    itWorks.put("message", "It works!.");
    return ok(play.libs.Json.toJson(itWorks));
  }
}
