const server = require('http').createServer()
const io = require('socket.io')(server)

const orders = [
  {recipient: 'Joe Biden', address: '123 A St', status: 'delivered' },
  {recipient: 'Vladimir Putin', address: '456 B St', status: 'delivered' },
  {recipient: 'Donald Trump', address: '789 C St', status: 'pending' },
  {recipient: 'Boris Johnson', address: '321 D St', status: 'pending' },
  {recipient: 'Justin Trudo', address: '654 E St', status: 'pending' },
];

io.on('connection', function (client) {

  console.log('client connect...', client.id);
  
  client.emit('orders', orders);
  
  client.on('addOrder', (order) => {
    console.log(`Adding new order: ${JSON.stringify(order)}`);
    orders.push(order);
    io.emit('orderAdded', order);
  });

  client.on('connect', function () {
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('Listening on port %d', server_port);
});
