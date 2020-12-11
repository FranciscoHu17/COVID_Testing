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
        add_to_table(data[i].wellBarcode, data[i].poolBarcode, data[i].result);
    }
})
.catch((error) => {
    console.log('Error', error);
});


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
