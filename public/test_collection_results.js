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
				
				test = $("input1").val();
				id = $("input2").val();
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
	for (var i = 0; i < checkboxHolder.length; i++) {
		if (document.getElementById("check" + checkboxHolder[i]).checked) {
			//actual checkbox array itself
			delete_from_db1(table.rows[i].cells.item(2).innerHTML, table.rows[i].cells.item(1).innerHTML);
			table.deleteRow(bruh[i]);
			for (a = i + 1; a < bruh.length; a++) {
				bruh[a]--;
			}
			bruh.splice(i, 1);
			//var j = checkboxHolder.indexOf(i);
			checkboxHolder.splice(i, 1);
		}
	}
	
}

delete_from_db1 = (test, id) => {
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
                testBarcode: test,
                employeeID: id
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