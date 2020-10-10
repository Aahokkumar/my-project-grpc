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

function main() {
    let client = new protoDescriptor.NoteService('http://localhost:3000',
    grpc.credentials.createInsecure());
    let user = 1;

    client.ListValue({id: user}, function(err, res){
        console.log("Greeting: ", res);
    });
}

main();
