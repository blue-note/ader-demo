package models;

import javax.persistence.*;
import play.db.ebean.Model;

@Entity
public class User extends Model {

  public String email;
  public String password;

  public User(String email, String password) {
    this.email = email;
    this.password = password;
  }
}
