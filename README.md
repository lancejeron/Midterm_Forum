# Midterm Forum

## Members:
- San Pablo, Lance Jeron
- Samson, Jethro Jhay
- Isaac, Princes Joi
- Penaverde, Norme Ann Joyce

**Requirements:**

1. Create a database named *mid_forum*
    1. Create table *user*
        * *user_id* INT auto_increment primary key
        * *user_name* varchar(50)
        * *user_email* varchar(50)
        * *user_password* varchar(50)
        * *user_birthdate* date
     2. Create table *category*
        * *category_id* INT auto_increment primary key
        * *category_name* varchar(50)
        
     3. Create table *post*
        * *post_id* INT auto_increment primary key
        * *user_id* INT foreign key
        * *category_id* INT foreign key
        * *post_title* varchar(50)
        * *post_content* varchar(50)
        * *post_date* datetime
