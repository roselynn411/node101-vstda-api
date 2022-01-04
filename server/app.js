const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

// add your code here

const data = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

app.use(express.json());
app.use(morgan('dev'));

// fix this
app.get('/', (req, res) => {
	res.status(200).send({status: 200});
});

app.get('/api/TodoItems', (req, res) => {
	res.status(200).send(data);
});

// fix this
app.get('/api/TodoItems/:number', (req, res) => {
	const itemId = Number(req.params.number);
	// add code to search data arr to find obj with itemId
	// console.log('itemId: ', itemId);
	for(let i=0; i<data.length; i++){
    if(data[i].todoItemId === itemId){
      console.log('returned item: ', data[i])
      res.status(200).send(data[i])
    }
  }
});

app.post('/api/TodoItems/', (req, res) => {
  // find id of request obj
  const itemId = req.body.itemId;
  // if an obj with that id already exists in the data arr, return that obj. Otherwise, push that obj to data arr
  if (data[itemId]){
    data.splice(itemId, 1, req.body);
  } else {
    data.push(req.body);
  }
  // console.log('post req itemId: ', itemId);
  res.status(201).send(req.body);
});

app.delete('/api/TodoItems/:number', (req, res) => {
	const itemId = Number(req.params.number);
  if (data[itemId]){
    const newData = data.splice(itemId, 1);
    // respond with the obj that was deleted
    res.status(200).send(newData[0]);
  }
});

module.exports = app;
