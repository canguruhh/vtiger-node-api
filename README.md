# Install
``` bash
npm install vtiger
```

# Usage examples
``` javascript
let CRM = require('vtiger')
let connection = new CRM.Connection('https://example.org', 'username', 'ACCESSKEY')
```
## Login
``` javascript
connection.login()
 .then(()=>{
     //login successful
 })
 .catch((error)=>{
     //catch error
     console.error(error.message)
 })
```
## Create
``` javascript
connection.login()
 .then(()=>connection.create('Product', {productname: 'Test'}))
 .then(product=>{
     //creation successful
     console.log(product)
 })
 .catch((error)=>{
     //catch error
     console.error(error.message)
 })
```
## Retrieve
To retrieve an element you need to specify its entity id.
``` javascript
connection.login()
 .then(()=>connection.retrieve('14x404'))
 .then(element=>{
     console.log(element)
 })
 .catch((error)=>{
     //catch error
     console.error(error.message)
 })
```
## Update
``` javascript
connection.login()
 .then(()=>connection.retrieve('14x404'))
 .then(element=>{
     element.unit_price=100
     return connection.update(element)
 })
 .then(element=>{
     console.log(element)
 })
 .catch((error)=>{
     //catch error
     console.error(error.message)
 })
```
## Delete
``` javascript
connection.login()
 .then(()=>connection.delete('14x404'))
 .then(()=>{
     //deleted
 })
 .catch((error)=>{
     //catch error
     console.error(error.message)
 })
```
## Query
``` javascript
connection.login()
 .then(()=>connection.query('SELECT * FROM Products WHERE unit_price >= 100;'))
 .then((products)=>{
     console.log(products)
 })
 .catch((error)=>{
     //catch error
     console.error(error.message)
 })
```
## Others
Some other available functions:
- listTypes
- describe
- retrieveRelated
- relatedTypes
- queryRelated
- deleteRelated
- addRelated

# License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Notice
All product names, trademarks and registered trademarks are property of their respective owners. All used company, product and service names used are for identification purposes only. Use of these names, trademarks and brands does not imply endorsement.