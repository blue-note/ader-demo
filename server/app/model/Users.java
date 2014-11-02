package models;

import javax.persistence.*;
import play.db.ebean.Model;

@Entity
public class Users extends Model {

  public String email;
  public String password;

  public Users(String email, String password) {
    this.email = email;
    this.password = password;
  }
}
