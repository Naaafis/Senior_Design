# Senior_Design
Repository for storing code for our Senior Design Project:
Social media application that leverages information from dog-tag to make ”friend” recommendations

# Senior_Design
> cd node/server/

<br/>

> node ./index.js
Starts the backend server such that SQL requests may be made to it

<br/>

> /api
Checks if we may successfully connect to the node server on EC2 via a get request

<br/>

> /receive_classification
Selects username and prediction from data collected table, searched by an input username via a post request

<br/>

> /ins_pred
Inserts a prediction into the data collected table based on an input username via a post request

<br/>

> /rec_user
Inserts a recommended user given an input username into the data collected table via a post request

<br/>

> /rec_rec
Inserts a recommendation of hostile/friendly into the data collected table based on an input username and the associated recommended user via a post request

<br/>

> /get_recs
Selects all recommended users and their associated recommendations from the data collected table based on an input username and if the recommendation is deemed friendly via a post request

<br/>

> /check_match
Inserts a new row into the friends table and updated the friends list column if two users are mutally pending as friends via a get request

<br/>

> /friends
Inserts a new row into the friends table given an input username and a new pending friend request made by the user via a post request

<br/>

> /get_friends
Returns the friends list given an input username where the friends list must not be empty in the friends table via a post request

<br/>

> /delete_pending
Deletes any users which were mutually pending as friends from the friends table, this function is called after get_friends such that the table is not clogged with friends that are mutually pending via a get request because mutally pending friends are added to each other's friend lists 

<br/>

> /get_profile
Returns every field associated with an input username's profile to print the whole profile on the profile screen of the front end via a post request

<br/>

> /classification
Inserts every available input field into the data collected table via a post request

<br/>

> /check_if_user_exists
Returns true if the user exists in the users table given an input username via a post request

<br/>

> /update_gps
Updates the GPS column's coordinates for every instance of an input username to the data collected table via a post request

<br/>

> /get_gps
Returns the GPS to be sent to the front end of the application given an input username, splits the single column by "," into longitude and latitude via a post request

<br/>

> /profile
Inserts every available input field into the users table via a post request


