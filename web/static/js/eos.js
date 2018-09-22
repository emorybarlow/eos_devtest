async function fetchBlockAsync(blockId) {
  const data = await (
    await fetch('http://127.0.0.1:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `{ block(num: ${blockId}) { hash, actioncount } }` }),
    })
      .then(res => res.json())
      .catch((err) => { alert(`Something went wrong ${err}`); })
  );
  return data;
}

async function fetchLatestBlockAsync() {
  const data = await (
    await fetch('http://127.0.0.1:4000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ latestBlock { hash, actioncount } }' }),
    })
      .then(res => res.json())
      .catch((err) => { alert(`Something went wrong ${err}`); })
  );
  return data;
}

$(() => {
  $('#request-block-button').click(() => {
    const blockId = $('#block-id').val();
    if (typeof blockId === typeof undefined || !blockId) {
      alert('Please provide a valid block ID');
      return;
    }
    fetchBlockAsync(blockId).then((data) => {
      if (data.data.block) {
        const { hash, actioncount } = data.data.block;
        $('#hash-label').html(`Block Hash: ${hash}`);
        $('#action-label').html(`Block Actions: ${actioncount}`);
      } else {
        alert('Invalid response returned from the API. Is your block ID valid?');
      }
    });
  });

  $('#request-latest-block-button').click(() => {
    $('#block-id').val('');
    fetchLatestBlockAsync().then((data) => {
      if (data.data.latestBlock) {
        const { hash, actioncount } = data.data.latestBlock;
        $('#hash-label').html(`Block Hash: ${hash}`);
        $('#action-label').html(`Block Actions: ${actioncount}`);
      } else {
        alert('Invalid response returned from the API. Is your block ID valid?');
      }
    });
  });
});
