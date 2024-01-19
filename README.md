
# e-commerce-API



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [auth](#auth)
    1. [login](#1-login)
    1. [register](#2-register)
    1. [logout](#3-logout)
    1. [testCookie](#4-testcookie)
* [users](#users)
    1. [get all users](#1-get-all-users)
    1. [Get single user](#2-get-single-user)
    1. [show current user](#3-show-current-user)
    1. [update user](#4-update-user)
    1. [update user password](#5-update-user-password)
* [products](#products)
    1. [get all products](#1-get-all-products)
    1. [create product](#2-create-product)
    1. [upload image](#3-upload-image)
    1. [get single product](#4-get-single-product)
    1. [update product](#5-update-product)
    1. [delete product](#6-delete-product)
    1. [get single product reviews](#7-get-single-product-reviews)
* [orders](#orders)
    1. [get all orders](#1-get-all-orders)
    1. [create orders](#2-create-orders)
    1. [get single order](#3-get-single-order)
    1. [update order](#4-update-order)
    1. [get current user orders](#5-get-current-user-orders)
* [reviews](#reviews)
    1. [get all reviews](#1-get-all-reviews)
    1. [create review](#2-create-review)
    1. [get single review](#3-get-single-review)
    1. [update review](#4-update-review)
    1. [delete review](#5-delete-review)

--------



## auth



### 1. login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/auth/login
```



***Body:***

```js        
{
    "email": "zhikun@gmail.com",
    "password": "123456"
}
```



### 2. register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/auth/register
```



***Body:***

```js        
{
    "name": "bob",
    "email": "bob@gmail.com",
    "password": "123456"
}
```



### 3. logout



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/auth/logout
```



### 4. testCookie



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com
```



## users



### 1. get all users



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/users
```



### 2. Get single user



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/users/659f0a8f5a012e5534f80d5c
```



### 3. show current user



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/users/showMe
```



### 4. update user



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/users/updateUser
```



***Body:***

```js        
 {
    "name": "john",
    "email": "john11@gmail.com"
 }
```



### 5. update user password



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/users/updateUserPassword
```



***Body:***

```js        
 {
    "oldPassword": "123456",
    "newPassword": "123456"
 }
```



## products



### 1. get all products



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/products
```



### 2. create product



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/products
```



***Body:***

```js        
{
    "name": "No1",
    "price": 25999,
    "colors": ["#ff0000", "#00ff00", "#0000ff"],
    "company": "marcos",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "office"
  }
```



### 3. upload image



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: https://e-commerce-api-vf1x.onrender.com/products/uploadImage
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |



### 4. get single product



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/products/65a5b68ebc31548788820083
```



### 5. update product



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/products/65a5b632bc3154878882007f
```



***Body:***

```js        
{
    "name": "accent chair",
    "price": 25999,
    "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
    "colors": ["#ff0000", "#00ff00", "#0000ff"],
    "company": "marcos",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "office"
  }
```



### 6. delete product



***Endpoint:***

```bash
Method: DELETE
Type: FORMDATA
URL: https://e-commerce-api-vf1x.onrender.com/products/65a8441d1635c5498f36b814
```



### 7. get single product reviews



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/products/65a5b68ebc31548788820083/reviews
```



## orders



### 1. get all orders



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/orders
```



### 2. create orders



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/orders
```



***Body:***

```js        
{
    "name": "accent chair",
    "price": 25999,
    "colors": ["#ff0000", "#00ff00", "#0000ff"],
    "company": "marcos",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "office"
  }
```



### 3. get single order



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/orders/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



### 4. update order



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/orders/:id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| id |  |  |



***Body:***

```js        
{
    "name": "accent chair",
    "price": 25999,
    "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
    "colors": ["#ff0000", "#00ff00", "#0000ff"],
    "company": "marcos",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "office"
  }
```



### 5. get current user orders



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/orders/showAllMyOrders
```



## reviews



### 1. get all reviews



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/reviews
```



### 2. create review



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/reviews
```



***Body:***

```js        
{
    "product": "65a844d61635c5498f36b829",
    "rating": 1,
    "title": "s so",
    "comment": "so so"
}
```



### 3. get single review



***Endpoint:***

```bash
Method: GET
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/reviews/65a72e61d65309dd63006129
```



### 4. update review



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: https://e-commerce-api-vf1x.onrender.com/reviews/65a845001635c5498f36b832
```



***Body:***

```js        
{
    "rating": 3,
    "title": "update review",
    "comment": "great"
}
```



### 5. delete review



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: https://e-commerce-api-vf1x.onrender.com/reviews/65a8442e1635c5498f36b818
```



---
[Back to top](#e-commerce-api)

>Generated at 2024-01-18 18:50:36 by [docgen](https://github.com/thedevsaddam/docgen)
