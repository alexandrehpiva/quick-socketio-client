import { io } from 'socket.io-client';

const sio = io('http://localhost:8000');

sio.on('connect', () => {
  console.log('connected');

  // After sum_to_sum_result calc event, the sum_result event will be called
  sio.emit('sum_to_sum_result', {
    numbers: [1, 2],
  });

  // Use the second parameter by passing a callback to manipulate the response
  sio.emit(
    'sum',
    {
      numbers: [1, 2],
    },
    (sumResponse: number) => {
      console.log(sumResponse);
    }
  );
});

sio.on('disconnect', () => {
  console.log('disconnected');
});

sio.on('sum_result', sumResultResponse => {
  console.log(sumResultResponse);
});

sio.on('numbers', (numbersResponse: { numbers?: number[] }, callback) => {
  console.log(numbersResponse);
  const [n1, n2] = numbersResponse.numbers ?? [];

  // Return some response to server
  callback(n1 * n2);
});

function App() {
  return <div className="App"></div>;
}

export default App;
