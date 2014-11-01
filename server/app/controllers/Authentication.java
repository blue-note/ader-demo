package controllers;

import play.*;
import play.mvc.*;
import models.*;
import views.html.*;
import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;

public class Authentication extends Controller {

  public static Result authenticate() {
    return ok("Success");
  }

  public static Result register(String email, String password) {
    Users user = new Users(email, password);
    user.save();

    //ObjectNode result = Json.newObject();
    //result.put("status", "success");
    return ok("Success");
  }
}
