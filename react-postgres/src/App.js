import React, {useState, useEffect} from 'react';
function App() {
    const [sentences, setSentences] = useState(false);
    useEffect(() => {
        getSentence();
    }, []);
    function getSentence() {
        fetch('http://localhost:3001')
        .then(response => {
            return response.text();
        })
        .then(data => {
            setSentences(data);
        });
    }
    function createSentence() {
        let value = prompt('Enter sentence value');

        fetch('http://localhost:3001/sentences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({value}),
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getSentence();
        });
    }

    function deleteSentence() {
        let id = prompt('Enter sentence id');
        fetch(`http://localhost:3001/sentences/${id}`, {
        method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            alert(data);
            getSentence();
        });
    }
  return (
    <div>
      {sentences ? sentences : 'There is no merchant data available'}
      <br />
      <button onClick={createSentence}>Add sentence</button>
      <br />
      <button onClick={deleteSentence}>Delete sentence</button>
    </div>
  );
}
export default App;