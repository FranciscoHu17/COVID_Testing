var row = 0;

fetch('/test_collection', {
    method: 'POST',
    headers: {
        'Content-type':'application/json',
    },
    body: JSON.stringify({
        operation: {
            op: "get"
        }
    })
})
.then(response => response.json())
.then(data => {
    for(i = 0; i < data.length; i++){
        add_to_table1(data[i].employeeID, data[i].testBarcode);
    }
})
.catch((error) => {
    console.log('Error', error);
});

add_to_table1 = (test, id) => {
    $("#table").append("<tr>" +
                                        "<td><input type = checkbox id = check"+row+"></td>" +
                                        "<td>" + test + "</td>" +
                                        "<td>" + id + "</td>" +
                                    "</tr>");
    row++;
}

var i = 1;
var checkboxHolder = [];
function addtoTable() {
	var table = document.getElementById("table");
	var checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "check" + i;
	checkboxHolder.push(i);
	var row = document.createElement("tr");
	var cell1 = document.createElement("td");
	var cell2 = document.createElement("td");
	var cell3 = document.createElement("td");
	cell2.innerHTML = document.getElementById("input1").value;
	cell3.innerHTML = document.getElementById("input2").value;
	cell1.append(checkbox);
	row.appendChild(cell1);
	row.appendChild(cell2);
	row.appendChild(cell3);
	table.appendChild(row);
	i++;
	/*var row = table.insertRow(); //can also do table.rows.length
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = document.getElementById("input1").value;
				cell2.innerHTML = document.getElementById("input2").value;*/
				today = new Date();
				var datetime = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + (today.getDate());
				datetime += " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
				
				id = $("#input1").val();
				test = $("#input2").val();
				start = datetime;
				
				
			
				add_to_db1(test, id, start);
}

add_to_db1 = (test, id, start) => {
    fetch('/test_collection', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "add"
            },
            test_collect: {
                testBarcode: test,
                employeeID: id,
                collectionTime: start
            }
        })
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch((error) => {
        console.log('Error', error);
    });
}

function deleteF() {
	var table = document.getElementById("table");
	if (table.rows.length <= 1) {
		return;
	}
	var bruh = []; //position holder
	for (var k = 1; k <= checkboxHolder.length; k++) {
		bruh.push(k);
	}
	for (var b = 0; b < checkboxHolder.length; b++) {
		if (document.getElementById("check" + checkboxHolder[b]).checked) {
			//actual checkbox array itself
			console.log("hi")
			delete_from_db1(table.rows[b].cells.item(2).innerHTML);
			console.log("yo")
			table.deleteRow(bruh[b]);
			for (a = b; a < bruh.length; a++) {
				bruh[a]--;
			}
			bruh.splice(b, 1);
			//var j = checkboxHolder.indexOf(i);
			checkboxHolder.splice(b, 1);
			document.getElementById("bruhmanager").innerHTML = bruh;
			document.getElementById("cmanager").innerHTML = checkboxHolder;
			b--;
		}
	}
	
}

delete_from_db1 = (test) => {
    fetch('/test_collection', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            operation: {
                op: "del"
            },
            test_collect: {
                testBarcode: test
            }
        })
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch((error) => {
        console.log('Error', error);
    });
}