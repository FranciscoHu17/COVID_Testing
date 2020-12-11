fetch('/labtech_home', {
    method: 'POST'
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch((error) => {
    console.log('Error', error)
});
