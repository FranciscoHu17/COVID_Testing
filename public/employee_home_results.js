fetch('/employee_home', {
    method: 'POST'
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    addResults(data);
})
.catch((error) => {
    console.log('Error', error)
});

addResults = (results) => {
    for(i = 0; i < results.length; i++){
        time = results[i].collectionTime.replace("T"," ").replace(".000Z","");
        result = results[i].result;
        $(".results").append("<tr>" +
                                "<td>"+time+"</td>" + 
                                "<td>"+result+"</td>" +
                             "</tr>");
    }
}