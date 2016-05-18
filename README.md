# FoodParent
_FoodParent_ is a web-based application as a part of Concrete Jungle’s _FoodParent_ project. The project helps to create virtual connection between trees and citizens who can provide status of fruits in Atlanta. The application provides a tool for creating a connection between trees and people by posting status notes via smart devices and tracking history of trees over years to help Concrete Jungle decide the proper time for foraging fruits and distribute to the needy.

## Installation
1. Download zip file or Git-clone https://github.com/PublicDesignWorkshop/FoodParent2.0.git.
2. Install [node.js](https://nodejs.org/en/) to use npm command in OSX and Windows.
3. Open terminal or command prompt and move to the app directory.
4. Run `npm install` to install all dependency libaries.
5. Run `npm run dev` or `npm run build` to generate compiled `foodparent.js` and `foodparent.map.js` file in [APP-ROOT]/dist directory.
6. Create a MySQL database, and admin user account and password for the database.
7. Copy `database.php` and `dbpass.php` files from [APP-ROOT]/serverconfig to [APP-ROOT]/server directory.
8. Open `database.php` file and put your database information.

      class database extends dbpass {
        public $host = "localhost";
        public $username = "cj";
        public $port = 3306;
        public $db_name = "tree_parent";
      }
