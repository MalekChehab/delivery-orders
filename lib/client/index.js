const server = require('http').createServer()
const io = require('socket.io')(server)

const orders = [
  { id: 1, recipient: 'Joe Biden', address: '123 A St', status: 'delivered' },
  { id: 2, recipient: 'Vladimir Putin', address: '456 B St', status: 'delivered' },
  { id: 3, recipient: 'Donald Trump', address: '789 C St', status: 'pending' },
  { id: 4, recipient: 'Boris Johnson', address: '321 D St', status: 'pending' },
  { id: 5, recipient: 'Justin Trudo', address: '654 E St', status: 'pending' },
]; 

io.on('connection', function (client) {

  console.log('client connect...', client.id);
  
  client.emit('orders', orders);

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
