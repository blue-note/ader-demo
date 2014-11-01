# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table users (
  email                     varchar(255),
  password                  varchar(255))
;

create table user (
  id                        bigint not null,
  email                     varchar(255),
  password                  varchar(255),
  constraint pk_user primary key (id))
;

create sequence user_seq;




# --- !Downs

drop table if exists users cascade;

drop table if exists user cascade;

drop sequence if exists user_seq;

