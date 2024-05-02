# Get All Function Structure Explanation

The `getAllUsers` function is designed to handle filtering, searching, and pagination in a single function. 
It structures the response JSON for a React table component.

Look at this code snippet:

```Javascript
async getAllUsers(req, res) {
    const page = parseInt(req.body.currentPageIndex) || 1;
    const filters = req.body.filters || {};

    const itemsPerPage = req.body.dataPerPage;
    const skip = (page - 1) * itemsPerPage;

    try {
      let query = {};

      if (filters) {
        query = { ...filters };

        if (filters.address === '' || !filters.address) {
          delete query.address;
        } else {
          query.address = { $regex: filters.address, $options: 'i' };
        }

        query.user_name = { $regex: filters.user_name || '', $options: 'i' };

        if ((req.body.search !== null || req.body.search !== '') && req.body.search) {
          query.user_name = { $regex: req.body.search || '', $options: 'i' };
        }
      }

      const users = await User.find(query)
        .skip(skip)
        .limit(itemsPerPage)
        .select('-created_at -updated_at -__v -password');

      const totalUsersCount = await User.countDocuments(query);

      let response = {}

      if (users.length === 0) {
        response = {
          data: users,
          dataCount: totalUsersCount,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: 'There are not matching records.'
        }
      } else {
        response = {
          data: users,
          dataCount: totalUsersCount,
          currentPaginationIndex: page,
          dataPerPage: itemsPerPage,
          message: 'Data returned'
        }
      }


      res.json(response)

    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
}
```

Lets break down this code.


## Code 1
``` typescript
    const page : number = parseInt(req.body.currentPageIndex) || 1;
    const filters : object<any> = req.body.filters || {};

    const itemsPerPage: number = req.body.dataPerPage;
    const skip : number = (page - 1) * itemsPerPage;
```

*page* - variable used to store current page index for pagination. Defaults to 1 if not provided.
*filters* - An object containing filter criteria. Defaults to an empty object if not provided.
*itemsPerPage* - The number of items to be returned per page.
*skip* - The number of records to skip while changing the page


## Code 2
``` typescript
let query: object<any> = {};

if (filters) {
    query = { ...filters };

    if (filters.address === '' || !filters.address) { // If address is didnt exist in the filter object or address is  empty
        delete query.address;  // then remove address from query
    } else {
        query.address = { $regex: filters.address, $options: 'i' }; // else add address to the query like a mongo query
    }

    query.user_name = { $regex: filters.user_name || '', $options: 'i' }; 

    if ((req.body.search !== null || req.body.search !== '') && req.body.search) { // if search is in filter and is not empty,
        query.user_name = { $regex: req.body.search || '', $options: 'i' }; // then add it to the query
    }
}
```

*query*: Variable initialized to define filtering logics as a MongoDB query. If filtering is empty, the query object must be empty. Within the *if* block, validate filter values to prevent issues with keys containing empty strings.

## Code 3
``` typescript
const users: User[] = await User.find(query)
        .skip(skip)
        .limit(itemsPerPage)
        .select('-created_at -updated_at -__v -password');

const totalUsersCount : number = await User.countDocuments(query);
```

This is how we use that information to get data from mongodb database. 
*find(query)* : Query data. If the query is empty, it returns all data from the database
*.skip(skip)* : is used for skip the records. 
*limit(itemsPerPage)* : is used to limit the returned data.
*select* : Specify or exclude items.

*countDocuments* : Count the data according to the query.

## Code 4
``` typescript
interface Response {
    data: any[];
    dataCount: number;
    currentPaginationIndex: number;
    dataPerPage: number;
    message: string
}

let response: Response = {}

if (users.length === 0) {
    response = {
        data: users,
        dataCount: totalUsersCount,
        currentPaginationIndex: page,
        dataPerPage: itemsPerPage,
        message: 'There are not matching records.'
    }
} else {
    response = {
        data: users,
        dataCount: totalUsersCount,
        currentPaginationIndex: page,
        dataPerPage: itemsPerPage,
        message: 'Data returned'
    }
}
```

This response structure is used for map data to table that created in react project. *data* object contains data
shown in the table. *dataCount* Shows the data count in the table footer. *currentPaginationIndex* is used to
highlight the current page in pagination. *dataPerPage* this value used to display the value in the table footer.
*message* Optional value, but it's good practice to use it.

This documentation provides insights into the structure and purpose of the `getAllUsers` function in the project.
