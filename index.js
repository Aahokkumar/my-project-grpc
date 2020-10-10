const grpc = require('grpc')
const PROTO_PATH = 'notes.proto';
const protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const notes = [
    { id: 1, title: 'Note 1'},
    { id: 2, title: 'Note 2'},
	{ id: 1, title: 'Note 1'},
    { id: 2, title: 'Note 2'}
];
function checkFeature(point){
	console.log(point);
	console.log(notes);
	return notes;
}

const server = new grpc.Server()

// The protoDescriptor object has the full package hierarchy
// var routeguide = protoDescriptor.routeguide;
let port = process.env.PORT || 3000;
server.addService(protoDescriptor.NoteService.service, {
    ListValue: (_, callback) => {
       
        callback(null, {notes});
    },
 
})

server.bind(`localhost:${port}`, grpc.ServerCredentials.createInsecure())

console.log('Server running at http://localhost: 3000')

server.start()
